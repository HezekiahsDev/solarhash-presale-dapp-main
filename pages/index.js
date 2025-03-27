// pages/index.js
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
} from "@solana/spl-token";

import IDL from "../lib/idl.json";

// Dynamically import WalletMultiButton with SSR disabled
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const ENV_PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID;
const ENV_ICO_MINT = process.env.NEXT_PUBLIC_ICO_MINT;

// Program constants
const PROGRAM_ID = new PublicKey(ENV_PROGRAM_ID);
const ICO_MINT = new PublicKey(ENV_ICO_MINT);
const TOKEN_DECIMALS = new BN(1_000_000_000);

export default function Home() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [icoData, setIcoData] = useState(null);
  const [amount, setAmount] = useState("");
  const [userTokenBalance, setUserTokenBalance] = useState(null);

  useEffect(() => {
    if (wallet.connected) {
      checkIfAdmin();
      fetchIcoData();
      fetchUserTokenBalance();
    }
  }, [wallet.connected]);

  const getProgram = () => {
    if (!wallet.connected) return null;
    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    return new Program(IDL, PROGRAM_ID, provider);
  };

  const checkIfAdmin = async () => {
    try {
      const program = getProgram();
      if (!program) return;

      console.log("Checking admin status for:", wallet.publicKey.toString());

      const [dataPda] = await PublicKey.findProgramAddress(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        program.programId
      );

      try {
        const data = await program.account.data.fetch(dataPda);
        setIsAdmin(data.admin.equals(wallet.publicKey));
      } catch (e) {
        const accounts = await program.account.data.all();
        if (accounts.length === 0) {
          setIsAdmin(true); // First user becomes admin
        } else {
          setIsAdmin(false);
          setIcoData(accounts[0].account);
        }
      }
    } catch (error) {
      console.error("Error checking admin:", error);
      setIsAdmin(false);
    }
  };

  const fetchIcoData = async () => {
    try {
      const program = getProgram();
      if (!program) return;

      const accounts = await program.account.data.all();
      if (accounts.length > 0) {
        setIcoData(accounts[0].account);
      }
    } catch (error) {
      console.error("Error fetching ICO data:", error);
    }
  };

  const createIcoAta = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      setLoading(true);
      const program = getProgram();
      if (!program) return;

      const [icoAtaPda] = await PublicKey.findProgramAddress(
        [ICO_MINT.toBuffer()],
        program.programId
      );

      const [dataPda] = await PublicKey.findProgramAddress(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        program.programId
      );

      const adminIcoAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey
      );

      await program.methods
        .createIcoAta(new BN(amount))
        .accounts({
          icoAtaForIcoProgram: icoAtaPda,
          data: dataPda,
          icoMint: ICO_MINT,
          icoAtaForAdmin: adminIcoAta,
          admin: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      alert("presale Phase initialized successfully!");
      await fetchIcoData();
    } catch (error) {
      console.error("Error initializing presale phase:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const depositIco = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      setLoading(true);
      const program = getProgram();
      if (!program) return;

      const [icoAtaPda] = await PublicKey.findProgramAddress(
        [ICO_MINT.toBuffer()],
        program.programId
      );

      const [dataPda] = await PublicKey.findProgramAddress(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        program.programId
      );

      const adminIcoAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey
      );

      await program.methods
        .depositIcoInAta(new BN(amount))
        .accounts({
          icoAtaForIcoProgram: icoAtaPda,
          data: dataPda,
          icoMint: ICO_MINT,
          icoAtaForAdmin: adminIcoAta,
          admin: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      alert("Tokens deposited successfully!");
      await fetchIcoData();
    } catch (error) {
      console.error("Error depositing:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const buyTokens = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      setLoading(true);
      const program = getProgram();
      if (!program) return;

      // Calculate cost (0.05 SOL per token)
      const solCost = parseInt(amount) * 0.0005;
      const balance = await connection.getBalance(wallet.publicKey);

      if (balance < solCost * 1e9 + 5000) {
        alert(`Insufficient balance. Need ${solCost.toFixed(3)} SOL plus fee`);
        return;
      }

      const [icoAtaPda, bump] = await PublicKey.findProgramAddress(
        [ICO_MINT.toBuffer()],
        program.programId
      );

      const [dataPda] = await PublicKey.findProgramAddress(
        [Buffer.from("data"), icoData.admin.toBuffer()],
        program.programId
      );

      const userIcoAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey
      );

      // Create ATA if needed
      try {
        await getAccount(connection, userIcoAta);
      } catch (error) {
        const createAtaIx = createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          userIcoAta,
          wallet.publicKey,
          ICO_MINT
        );
        const transaction = new Transaction().add(createAtaIx);
        await wallet.sendTransaction(transaction, connection);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      await program.methods
        .buyTokens(bump, new BN(amount))
        .accounts({
          icoAtaForIcoProgram: icoAtaPda,
          data: dataPda,
          icoMint: ICO_MINT,
          icoAtaForUser: userIcoAta,
          user: wallet.publicKey,
          admin: icoData.admin,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      alert(`Successfully purchased ${amount} tokens!`);
      await fetchIcoData();
      await fetchUserTokenBalance();
    } catch (error) {
      console.error("Error buying tokens:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTokenBalance = async () => {
    try {
      if (!wallet.connected) return;

      const userAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey
      );

      try {
        const tokenAccount = await getAccount(connection, userAta);
        setUserTokenBalance(tokenAccount.amount.toString());
      } catch (e) {
        // If ATA doesn't exist, balance is 0
        setUserTokenBalance("0");
      }
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setUserTokenBalance("0");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09463F] via-[#0A4942] to-[#F4C542] text-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative max-w-xl mx-auto">
        <div className="relative px-6 py-10 bg-[#0A4942] shadow-lg rounded-3xl sm:p-12 border border-[#F4C542]/50">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-[#094740]">
              {/* Header Section */}
              <div className="pb-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#F4C542]">
                    SolarHashToken Private Sale
                  </h1>
                  <WalletMultiButton />
                </div>
                {wallet.connected && (
                  <div className="mt-4 text-sm text-gray-200">
                    <p>
                      Wallet: {wallet.publicKey.toString().slice(0, 8)}...
                      {wallet.publicKey.toString().slice(-8)}
                    </p>
                    <p className="mt-1">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          isAdmin ? "text-[#E58E26]" : "text-blue-400"
                        }`}
                      >
                        {isAdmin ? "Admin" : "User"}
                      </span>
                    </p>
                    <p className="mt-2">
                      <span className="text-gray-300">Your Token Balance:</span>{" "}
                      <span className="font-semibold text-white">
                        {userTokenBalance
                          ? (Number(userTokenBalance) / 1e9).toFixed(2)
                          : "0"}{" "}
                        tokens
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Main Content */}
              {wallet.connected ? (
                <div className="py-8">
                  {/* ICO Status Display */}
                  {icoData ? (
                    <div className="mb-8 p-4 rounded-lg border border-[#E58E26]/50 bg-[#094740]/30">
                      <h2 className="text-lg font-semibold mb-3 text-[#F4C542]">
                        ICO Status
                      </h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {[
                          {
                            label: "Total Supply",
                            value: icoData.totalTokens.toString(),
                          },
                          {
                            label: "Tokens Sold",
                            value: icoData.tokensSold.toString(),
                          },
                          { label: "Token Price", value: "0.0005 SOL" },
                          {
                            label: "Available",
                            value: (
                              icoData.totalTokens - icoData.tokensSold
                            ).toString(),
                          },
                          {
                            label: "Your Balance",
                            value: userTokenBalance
                              ? (Number(userTokenBalance) / 1e9).toFixed(2)
                              : "0",
                          },
                        ].map(({ label, value }, i) => (
                          <div key={i}>
                            <p className="text-gray-300">{label}</p>
                            <p className="font-medium text-white">
                              {value} tokens
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    isAdmin && (
                      <div className="mb-8 p-4 bg-[#F4C542]/20 rounded-lg border border-[#F4C542]">
                        <p className="text-[#E58E26]">
                          A presale phase needs to be initialized
                        </p>
                      </div>
                    )
                  )}

                  {/* Action Section */}
                  <div className="space-y-4">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={
                        isAdmin
                          ? icoData
                            ? "Amount of tokens to deposit"
                            : "Amount of tokens to initialize"
                          : "Amount of tokens to buy"
                      }
                      className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-[#F4C542] focus:border-[#F4C542]"
                      min="1"
                      step="1"
                    />

                    {/* Cost Display for Users */}
                    {amount && !isAdmin && (
                      <div className="p-4 bg-[#E58E26]/20 rounded-lg border border-[#E58E26] space-y-2">
                        <div className="flex justify-between">
                          <span>Token Amount:</span>
                          <span className="font-medium">{amount} tokens</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost:</span>
                          <span className="font-medium">
                            {(parseInt(amount) * 0.0005).toFixed(3)} SOL
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Network Fee:</span>
                          <span className="font-medium">~0.000005 SOL</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>
                            {(parseInt(amount) * 0.0005 + 0.000005).toFixed(6)}{" "}
                            SOL
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {isAdmin ? (
                        <>
                          {!icoData && (
                            <button
                              onClick={createIcoAta}
                              disabled={loading}
                              className="w-full p-3 bg-[#F4C542] text-black font-semibold rounded-lg hover:bg-[#E58E26] disabled:bg-gray-500 transition"
                            >
                              {loading
                                ? "Initializing..."
                                : "Initialize Presale"}
                            </button>
                          )}
                          {icoData && (
                            <>
                              <button
                                onClick={depositIco}
                                disabled={loading}
                                className="w-full p-3 bg-[#F4C542] text-black font-semibold rounded-lg hover:bg-[#E58E26] disabled:bg-gray-500 transition"
                              >
                                {loading ? "Depositing..." : "Deposit Tokens"}
                              </button>
                              <button
                                onClick={buyTokens}
                                disabled={loading || !icoData}
                                className="w-full p-3 bg-[#E58E26] text-white font-semibold rounded-lg hover:bg-[#F4C542] disabled:bg-gray-500 transition"
                              >
                                {loading ? "Processing..." : "Buy Tokens"}
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={buyTokens}
                          disabled={loading || !icoData}
                          className="w-full p-3 bg-[#E58E26] text-white font-semibold rounded-lg hover:bg-[#F4C542] disabled:bg-gray-500 transition"
                        >
                          {loading ? "Processing..." : "Buy Tokens"}
                        </button>
                      )}
                    </div>

                    {/* Transaction Status */}
                    {loading && (
                      <div className="text-center animate-pulse text-gray-300">
                        Processing transaction...
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-lg font-medium text-gray-200">
                  Please connect your wallet to continue
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
