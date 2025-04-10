/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
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

import TokenSlider from "./buy-token/TokenSlider";
import BuyButton from "./buy-token/BuyButton";
import CountdownTimer from "./utilities/CountdownTimer";

// Import IDL
import IDL from "../lib/idl.json";
import DepositToken from "./buy-token/DepositToken";

// Dynamically import WalletMultiButton with SSR disabled
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

// Set end time for the ICO
const endTime = new Date("2025-05-20T23:59:59").getTime();

// Environment variables
const ENV_PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID;
const ENV_ICO_MINT = process.env.NEXT_PUBLIC_ICO_MINT;

// Program constants
const PROGRAM_ID = new PublicKey(ENV_PROGRAM_ID || "");
const ICO_MINT = new PublicKey(ENV_ICO_MINT || "");
const TOKEN_DECIMALS = new BN(1_000_000_000);

const BuyTokens = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [icoData, setIcoData] = useState<>(null);
  const [tokenAmount, setTokenAmount] = useState<number>(100);
  const [depositAmount, setDepositAmount] = useState<number>(1000);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<string>("Private Sale");
  const [tokenPrice, setTokenPrice] = useState<number>(0.0005);
  const [userTokenBalance, setUserTokenBalance] = useState<string | null>(null);
  const [showDepositInput, setShowDepositInput] = useState<boolean>(false);

  // Calculate total price based on token amount and price
  const totalPrice = tokenAmount * tokenPrice;

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // Check wallet connection, admin status, and fetch data
  useEffect(() => {
    if (wallet.connected) {
      checkIfAdmin();
      fetchIcoData();
      fetchUserTokenBalance();
    }
  }, [wallet.connected]);

  // Phase simulation (could be replaced with actual phase logic from contract)
  useEffect(() => {
    const secondsInDay = 24 * 60 * 60;

    const phases = [
      { name: "Private Sale", price: 0.0005, duration: 40 * secondsInDay }, // 40 days in seconds
      { name: "Pre-Sale Phase 1", price: 0.0007, duration: 20 * secondsInDay }, // 20 days in seconds
      { name: "Pre-Sale Phase 2", price: 0.0009, duration: 20 * secondsInDay }, // 20 days in seconds
      { name: "Pre-Sale Phase 3", price: 0.0012, duration: 20 * secondsInDay }, // 20 days in seconds
    ];

    let currentTime = 0;
    let currentPhaseIndex = 0;

    const interval = setInterval(() => {
      currentTime += 1;
      if (currentTime >= phases[currentPhaseIndex].duration) {
        currentTime = 0;
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        setCurrentPhase(phases[currentPhaseIndex].name);
        setTokenPrice(phases[currentPhaseIndex].price);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Helper to get program instance
  const getProgram = () => {
    if (!wallet.connected) return null;
    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    return new Program(IDL, PROGRAM_ID, provider);
  };

  // Check if user is admin
  const checkIfAdmin = async () => {
    try {
      const program = getProgram();
      if (!program || !wallet.publicKey) return;

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

  // Fetch ICO data
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

  // Initialize ICO ATA
  const createIcoAta = async () => {
    try {
      if (!tokenAmount || tokenAmount <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      setLoading(true);
      const program = getProgram();
      if (!program || !wallet.publicKey) return;

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
        .createIcoAta(new BN(tokenAmount))
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
      alert("ICO Phase initialized successfully!");

      await fetchIcoData();
    } catch (error) {
      console.error("Error initializing ICO phase:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Constants
  const MAX_DEPOSIT_AMOUNT = 8000000;
  const MIN_DEPOSIT_AMOUNT = 100;

  // Assuming `depositAmount`, `connection`, `wallet`, and `ICO_MINT` are already defined

  const depositIco = async () => {
    try {
      // Validate deposit amount
      if (!depositAmount || depositAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      if (depositAmount < MIN_DEPOSIT_AMOUNT) {
        alert(
          `Please enter an amount greater than ${MIN_DEPOSIT_AMOUNT} and try again.`
        );
        return;
      }

      if (depositAmount > MAX_DEPOSIT_AMOUNT) {
        alert(`Deposit amount should not exceed ${MAX_DEPOSIT_AMOUNT} tokens.`);
        return;
      }

      setDepositLoading(true);

      // Assuming `getProgram` and `wallet.publicKey` are correctly initialized
      const program = getProgram();
      if (!program || !wallet.publicKey) return;

      // Define the ICO ATA PDA
      const [icoAtaPda] = await PublicKey.findProgramAddress(
        [ICO_MINT.toBuffer()],
        program.programId
      );

      // Define the Data PDA
      const [dataPda] = await PublicKey.findProgramAddress(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        program.programId
      );

      // Get the admin ICO ATA
      const adminIcoAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey
      );

      // Call the deposit method
      await program.methods
        .depositIcoInAta(new BN(depositAmount))
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
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setDepositLoading(false);
    }
  };

  // Buy tokens
  const buyTokens = async () => {
    try {
      if (!tokenAmount || tokenAmount <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      if (tokenAmount < 100) {
        alert("Please enter an amount greater than 100 and try again");
        return;
      }

      if (tokenAmount > 3000000) {
        alert(
          "Please enter a lower amount and try again\nAmount must not be greater than 3000000"
        );
        return;
      }

      setLoading(true);
      const program = getProgram();
      if (!program || !wallet.publicKey) return;

      // Calculate cost based on current token price
      const solCost = tokenAmount * tokenPrice;
      const balance = await connection.getBalance(wallet.publicKey);

      const [icoAtaPda, bump] = await PublicKey.findProgramAddress(
        [ICO_MINT.toBuffer()],
        program.programId
      );

      if (balance < solCost * 1e9 + 5000) {
        alert(`Insufficient balance. Need ${solCost.toFixed(3)} SOL plus fee`);
        return;
      }

      if (!icoData || !icoData.admin) {
        alert("ICO data not available. Please try again later.");
        setLoading(false);
        return;
      }

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
      } catch (e) {
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
        .buyTokens(bump, new BN(tokenAmount))
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

      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);

      alert(
        `Successfully purchased ${tokenAmount} tokens! 20% has been released`
      );
      await fetchIcoData();
      await fetchUserTokenBalance();
    } catch (error) {
      console.error("Error buying tokens:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user token balance
  const fetchUserTokenBalance = async () => {
    try {
      if (!wallet.connected || !wallet.publicKey) return;

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

  // Toggle deposit input visibility
  const toggleDepositInput = () => {
    setShowDepositInput(!showDepositInput);
  };

  return (
    <div className="justify-center text-center px-6 py-10 shadow-lg rounded-3xl sm:p-12 snake-border">
      {/* Header Section */}
      <div className="">
        <motion.h1
          className=" py-2 text-lg font-bold text-[#F4C542]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Buy SolarHashToken
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <WalletMultiButton
            style={{
              backgroundColor: "#d48a23",
              color: "white",
              padding: "10px, 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",

              transition: "background-color 0.5s ease",
            }}
            className=""
          />
        </motion.div>
      </div>

      {/* Show wallet info when connected */}
      {wallet.connected && wallet.publicKey && (
        <div className="text-sm text-gray-200 mb-4">
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

      {/* Countdown Timer */}
      <div className="py-4">
        <CountdownTimer targetDate={new Date("2025-05-20T23:59:59")} />
      </div>

      {wallet.connected ? (
        <div className="py-4">
          {/* ICO Status Display */}
          {icoData ? (
            <motion.div
              className="mb-4 p-4 rounded-lg border border-[#E58E26]/50 bg-[#094740] bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-[#F4C542]">
                ICO status (Phase: {currentPhase})
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                {[
                  {
                    label: "Total Supply",
                    value: icoData.totalTokens.toString(),
                  },
                  {
                    label: "Tokens Sold",
                    value: icoData.tokensSold.toString(),
                  },
                  {
                    label: "Token Price",
                    value: `${tokenPrice} SOL per`,
                  },
                  {
                    label: "Available",
                    value: (
                      icoData.totalTokens - icoData.tokensSold
                    ).toString(),
                  },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  >
                    <p className="text-gray-300">{label}</p>
                    <p className="font-medium text-white">{value} SHTP</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            isAdmin && (
              <div className="mb-8 p-4 bg-[#F4C542]/20 rounded-lg border border-[#F4C542]">
                <p className="text-[#E58E26]">
                  An ICO phase needs to be initialized
                </p>
              </div>
            )
          )}

          {/* Admin Deposit Section */}
          {isAdmin && icoData && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                className="px-5 py-2 mb-4 bg-[#E58E26] text-white font-medium rounded-lg hover:bg-[#d48a23] transition-all"
                onClick={toggleDepositInput}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {showDepositInput ? "Hide Deposit" : "Deposit Tokens to ICO"}
              </motion.button>

              {showDepositInput && (
                <motion.div
                  className="p-4 mb-4 bg-[#094740]/50 rounded-lg border border-[#E58E26]/50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-[#F4C542] font-medium mb-2">
                    Deposit Tokens
                  </h3>
                  <div className="mb-3">
                    <label className="block text-sm text-gray-300 mb-1">
                      Amount to Deposit
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full p-2 bg-[#0D1317] border border-[#E58E26]/50 rounded-md text-white"
                      min="100"
                    />
                  </div>
                  <DepositToken
                    onClick={depositIco}
                    loading={depositLoading}
                    text={depositLoading ? "Depositing..." : "Confirm Deposit"}
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TokenSlider Component */}
          <TokenSlider
            tokenAmount={tokenAmount}
            setTokenAmount={setTokenAmount}
          />

          {/* Cost Display for Users */}
          {tokenAmount > 0 && (
            <motion.div
              className="p-4 my-4 bg-[#E58E26]/20 rounded-lg border border-[#E58E26] space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between">
                <span>Token Amount:</span>
                <span className="font-medium">{tokenAmount} tokens</span>
              </div>
              <div className="flex justify-between">
                <span>Cost:</span>
                <span className="font-medium">
                  {(tokenAmount * tokenPrice).toFixed(4)} SOL
                </span>
              </div>
              <div className="flex justify-between">
                <span>Network Fee:</span>
                <span className="font-medium">~0.000005 SOL</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>
                  {(tokenAmount * tokenPrice + 0.000005).toFixed(6)} SOL
                </span>
              </div>
            </motion.div>
          )}

          {/* User Buy Button or Admin Initialize Button */}
          <BuyButton
            onClick={isAdmin && !icoData ? createIcoAta : buyTokens}
            loading={loading}
            text={
              loading
                ? "Processing..."
                : isAdmin && !icoData
                ? "Initialize ICO"
                : "Buy Tokens"
            }
          />

          {/* Transaction Status */}
          {(loading || depositLoading) && (
            <motion.div
              className="text-center text-gray-300 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Processing transaction...
            </motion.div>
          )}

          {/* Confirmation Message */}
          {showConfirmation && (
            <motion.div
              className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Transaction completed successfully!
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          className="text-lg font-medium text-gray-200 mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Please connect your wallet to continue
        </motion.div>
      )}
    </div>
  );
};

export default BuyTokens;
