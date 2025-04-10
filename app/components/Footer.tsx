"use client";
import Link from "next/link";
import {
  FaTwitter,
  FaTelegram,
  FaGithub,
  FaDiscord,
  FaReddit,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  // Initialize AOS (Animate on Scroll)
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white py-12">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full text-center md:text-left"
        >
          {/* About Section */}
          <div data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-2">Solar Hash</h3>
            <p className="text-gray-300"></p>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "Buy Tokens", href: "BuyTokens" },
                { label: "Vesting", href: "#vesting" },
                { label: "FAQ", href: "#faq" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-amber-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              {[
                { icon: FaTwitter, link: "https://x.com/solarhashtoken?s=21" },
                {
                  icon: FaTelegram,
                  link: "https://t.me/solarhashtokendiscussions",
                },
                { icon: FaReddit, link: "https://reddit.com/SolarHashToken" },
                { icon: FaDiscord, link: "https://discord.gg/" },
                { icon: FaGithub, link: "https://github.com/HezekiahsDev" },
              ].map(({ icon: Icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-gray-300 hover:text-amber-300 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-2xl font-bold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news.
            </p>
            <motion.form className="flex" whileHover={{ scale: 1.02 }}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="py-8 text-center"
          data-aos="fade-up"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Solar Hash. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
