"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Download,
  Wallet,
  HelpCircle,
  ArrowRightCircle,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";

const BuyGuide = () => {
  const handleDownloadWallet = () => {
    window.open("https://phantom.app/download", "_blank");
  };

  // const handleTransferNow = () => {
  //   // You can guide users to open Phantom or show a modal
  //   alert("Open your Phantom wallet and transfer SOL.");
  // };

  // Inside your component

  const router = useRouter();

  const handleBuyNow = () => {
    router.push("/buy");
  };

  const steps = [
    {
      title: "Install Wallet",
      description: "Install a trusted Solana wallet like Phantom or Solflare.",
      button: {
        label: "Download Wallet",
        icon: <Download className="mr-2 h-4 w-4" />,
        onClick: handleDownloadWallet, // You can define this to point to Phantom/Solfare site
      },
    },
    {
      title: "Fund Wallet",
      description:
        "Add enough SOL to your wallet to cover purchases and transaction fees.",
      button: {
        label: "Transfer SOL",
        icon: <ArrowRightCircle className="mr-2 h-4 w-4" />,
        // onClick: handleFundWallet, Optional handler
      },
    },
    {
      title: "Connect Wallet",
      description:
        "Connect your wallet to the dApp to get started with the presale.",
      button: {
        label: "Connect Wallet",
        icon: <Wallet className="mr-2 h-4 w-4" />,
        // onClick: handleConnectWallet,
      },
    },
    {
      title: "Buy SHTP",
      description:
        "Purchase SHTP tokens and confirm your transaction on the dApp.",
      button: {
        label: "Buy Now",
        icon: <ShoppingCart className="mr-2 h-4 w-4" />,
        onClick: handleBuyNow,
      },
    },
    {
      title: "Receive & Vest Tokens",
      description:
        "20% of your tokens will be sent immediately, with 80% vested.",
      button: {
        label: "View Vesting",
        icon: <CheckCircle2 className="mr-2 h-4 w-4" />,
        // onClick: handleViewVesting,  Optional handler to show vesting details
      },
    },
  ];
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="pt-32 pb-12 min-h-screen bg-teal-800 px-4 text-white flex flex-col items-center justify-center space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4">How to Buy Presale</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Follow these easy steps to participate in the SHTP token presale and
          secure your tokens with Phantom Wallet.
        </p>
      </motion.div>

      <div
        className="grid md:grid-cols-2 gap-8 max-w-5xl w-full"
        data-aos="fade-up"
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 rounded-2xl p-6 shadow-md backdrop-blur-md hover:scale-[1.02] transition-transform flex flex-col justify-between space-y-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-sm">{step.description}</p>
            </div>
            <div>
              <Button
                variant="secondary"
                className="mt-4  text-teal-800 hover:bg-gray-100"
                onClick={step.button.onClick}
              >
                {step.button.icon}
                {step.button.label}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-8" data-aos="zoom-in-up">
        <Button variant="ghost" className="text-white hover:underline">
          <HelpCircle className="mr-2 h-4 w-4" /> Need Help?
        </Button>
        <Button variant="link" className="text-white underline">
          <BookOpen className="mr-2 h-4 w-4" /> Detailed Guide
        </Button>
      </div>
    </section>
  );
};

export default BuyGuide;
