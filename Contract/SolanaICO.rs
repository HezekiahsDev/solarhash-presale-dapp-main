use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("5C4sm7Q8Mzywm6RWW1SX2hrPGhgUJz5fMDFmUEaFxcho");

#[error_code]
pub enum ErrorCode {
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Invalid admin")]
    InvalidAdmin,
}

#[program]
pub mod ico {
    pub const ICO_MINT_ADDRESS: &str = "C48WMWw5T2LHvisD37Zr6aACPcVodybALPiYxgraXgjU";
    pub const LAMPORTS_PER_TOKEN: u64 = 488_298; // 0.05USDC worth of lamports
    pub const TOKEN_DECIMALS: u64 = 1_000_000_000; // 10^9 for SPL token decimals
    use super::*;

    pub fn create_ico_ata(ctx: Context<CreateIcoATA>, ico_amount: u64) -> Result<()> {
        msg!("Creating program ATA to hold presale tokens");
        // Convert amount to token decimals
        let raw_amount = ico_amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.ico_ata_for_admin.to_account_info(),
                to: ctx.accounts.ico_ata_for_ico_program.to_account_info(),
                authority: ctx.accounts.admin.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, raw_amount)?;
        msg!("Transferred {} presale tokens to program ATA", ico_amount);

        let data = &mut ctx.accounts.data;
        data.admin = *ctx.accounts.admin.key;
        data.total_tokens = ico_amount;
        data.tokens_sold = 0;
        msg!("Initialized presale data");
        Ok(())
    }

    pub fn deposit_ico_in_ata(ctx: Context<DepositIcoInATA>, ico_amount: u64) -> Result<()> {
        if ctx.accounts.data.admin != *ctx.accounts.admin.key {
            return Err(error!(ErrorCode::InvalidAdmin));
        }

        // Convert amount to token decimals
        let raw_amount = ico_amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.ico_ata_for_admin.to_account_info(),
                to: ctx.accounts.ico_ata_for_ico_program.to_account_info(),
                authority: ctx.accounts.admin.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, raw_amount)?;

        let data = &mut ctx.accounts.data;
        data.total_tokens += ico_amount;

        msg!("Deposited {} additional presale tokens", ico_amount);
        Ok(())
    }

    pub fn buy_tokens(
        ctx: Context<BuyTokens>,
        _ico_ata_for_ico_program_bump: u8,
        token_amount: u64,
    ) -> Result<()> {
        let is_admin = ctx.accounts.user.key() == ctx.accounts.data.admin;

        // Convert token amount to include decimals for SPL transfer
        let raw_token_amount = token_amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;

        let amount_to_transfer = if is_admin {
            raw_token_amount // 100%
        } else {
            raw_token_amount
                .checked_div(5) // 20%
                .ok_or(ErrorCode::Overflow)?
        };

        if !is_admin {
            // Calculate SOL cost (0.0005 SOL per token)
            let sol_amount = token_amount
                .checked_mul(LAMPORTS_PER_TOKEN)
                .ok_or(ErrorCode::Overflow)?;

            // Transfer SOL from user to admin
            let ix = anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.user.key(),
                &ctx.accounts.admin.key(),
                sol_amount,
            );
            anchor_lang::solana_program::program::invoke(
                &ix,
                &[
                    ctx.accounts.user.to_account_info(),
                    ctx.accounts.admin.to_account_info(),
                ],
            )?;
            msg!("Transferred {} lamports to admin", sol_amount);
        } else {
            msg!("Admin purchase detected: skipping SOL transfer and token_sold update");
        }

        // Transfer tokens from program ATA to user/admin
        let ico_mint_address = ctx.accounts.ico_mint.key();
        let seeds = &[ico_mint_address.as_ref(), &[_ico_ata_for_ico_program_bump]];
        let signer = [&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.ico_ata_for_ico_program.to_account_info(),
                to: ctx.accounts.ico_ata_for_user.to_account_info(),
                authority: ctx.accounts.ico_ata_for_ico_program.to_account_info(),
            },
            &signer,
        );
        token::transfer(cpi_ctx, amount_to_transfer)?;

        // Update tokens sold for non-admin users
        if !is_admin {
            let data = &mut ctx.accounts.data;
            data.tokens_sold = data
                .tokens_sold
                .checked_add(token_amount)
                .ok_or(ErrorCode::Overflow)?;
        }

        msg!(
            "{} purchased {} tokens. Sent {} tokens.",
            if is_admin { "Admin" } else { "User" },
            token_amount,
            amount_to_transfer / TOKEN_DECIMALS
        );

        Ok(())
    }

    /* 
    -----------------------------------------------------------
        CreateIcoATA struct for create_ico_ata function
    -----------------------------------------------------------
*/
    #[derive(Accounts)]
    pub struct CreateIcoATA<'info> {
        #[account(
            init,
            payer = admin,
            seeds = [ ICO_MINT_ADDRESS.parse::<Pubkey>().unwrap().as_ref() ],
            bump,
            token::mint = ico_mint,
            token::authority = ico_ata_for_ico_program,
        )]
        pub ico_ata_for_ico_program: Account<'info, TokenAccount>,

        #[account(init, payer=admin, space=9000, seeds=[b"data", admin.key().as_ref()], bump)]
        pub data: Account<'info, Data>,

        #[account(
            address = ICO_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
        )]
        pub ico_mint: Account<'info, Mint>,

        #[account(mut)]
        pub ico_ata_for_admin: Account<'info, TokenAccount>,

        #[account(mut)]
        pub admin: Signer<'info>,

        pub system_program: Program<'info, System>,
        pub token_program: Program<'info, Token>,
        pub rent: Sysvar<'info, Rent>,
    }

    /* 
    -----------------------------------------------------------
        DepositIcoInATA struct for deposit_ico_in_ata function
    -----------------------------------------------------------
*/
    #[derive(Accounts)]
    pub struct DepositIcoInATA<'info> {
        #[account(mut)]
        pub ico_ata_for_ico_program: Account<'info, TokenAccount>,

        #[account(mut)]
        pub data: Account<'info, Data>,

        #[account(
            address = ICO_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
        )]
        pub ico_mint: Account<'info, Mint>,

        #[account(mut)]
        pub ico_ata_for_admin: Account<'info, TokenAccount>,

        #[account(mut)]
        pub admin: Signer<'info>,
        pub token_program: Program<'info, Token>,
    }

    /* 
    -----------------------------------------------------------
        BuyTokens struct for buy_tokens function
    -----------------------------------------------------------
*/
    #[derive(Accounts)]
    #[instruction(_ico_ata_for_ico_program_bump: u8)]
    pub struct BuyTokens<'info> {
        #[account(
            mut,
            seeds = [ ico_mint.key().as_ref() ],
            bump = _ico_ata_for_ico_program_bump,
        )]
        pub ico_ata_for_ico_program: Account<'info, TokenAccount>,

        #[account(mut)]
        pub data: Account<'info, Data>,

        #[account(
            address = ICO_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
        )]
        pub ico_mint: Account<'info, Mint>,

        #[account(mut)]
        pub ico_ata_for_user: Account<'info, TokenAccount>,

        #[account(mut)]
        pub user: Signer<'info>,

        /// CHECK:
        #[account(mut)]
        pub admin: AccountInfo<'info>,

        pub token_program: Program<'info, Token>,
        pub system_program: Program<'info, System>,
    }

    /* 
    -----------------------------------------------------------
        Data struct for PDA Account
    -----------------------------------------------------------
*/
    #[account]
    pub struct Data {
        pub admin: Pubkey,
        pub total_tokens: u64,
        pub tokens_sold: u64,
    }
}
