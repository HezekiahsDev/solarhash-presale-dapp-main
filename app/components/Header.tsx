"use client";
import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReddit,
  faXTwitter,
  faTelegram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const SOCIAL_LINKS = [
  { href: "https://www.reddit.com", icon: faReddit },
  { href: "https://x.com/solarhashtoken?s=21", icon: faXTwitter },
  { href: "https://t.me/solarhashtokendiscussions", icon: faTelegram },
  { href: "https://discord.com", icon: faDiscord },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#lite-paper", label: "Litepaper" },
  { href: "#project", label: "Projects" },
  { href: "/guide", label: "Buying Guide" },
  { href: "/airdrop", label: "Airdrop" },
  { href: "#donate", label: "DONATE" },
];

const Header = () => {
  const { connected } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <header className="bg-yellow-400/10 shadow-lg fixed w-full z-50 border-yellow-600 border-[.5px]">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" data-aos="fade-right">
          <Image
            src="/Solarhash_assets/icon.png"
            width={50}
            height={50}
            alt="Solarhash Logo"
            priority
          />
        </Link>

        <nav className="hidden md:flex space-x-8 items-center">
          {NAV_LINKS.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              className="text-amber-500 font-bold text-xl hover:text-amber-300 hover:underline transition-colors"
              data-aos="fade-down"
              data-aos-delay={index * 100}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex space-x-4" data-aos="fade-left">
          {SOCIAL_LINKS.map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={icon} className="text-black text-xl" />
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2" data-aos="fade-left">
          {connected && <span />}
          <div className="ml-24">
            <WalletMultiButton
              style={{
                backgroundColor: "#d48a23",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            />
          </div>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-yellow-900/90 p-4 text-center">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block py-2 px-4 text-amber-500 hover:bg-amber-700"
            >
              {label}
            </a>
          ))}
          <div className="py-2 px-4">
            {/* <WalletMultiButton
              style={{
                backgroundColor: "#d48a23",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                border: "none",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
            /> */}
          </div>
          <div className="flex justify-center space-x-4 py-2">
            {SOCIAL_LINKS.map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={icon} className="text-black text-xl" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
