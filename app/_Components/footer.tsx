"use client";

import { motion } from "framer-motion";
import { CgFacebook, CgInstagram, CgTwitter } from "react-icons/cg";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full bg-white text-black py-16 mt-20 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LOGO + TAGLINE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl font-extrabold tracking-tight">BiteBlitz</h1>
          <p className="text-sm mt-3 text-gray-500 max-w-xs">
            Delivering happiness one slice at a time — Fast, fresh, and full of
            flavor.
          </p>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Order Now
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        {/* SOCIALS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center md:text-right"
        >
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex md:justify-end justify-center gap-4 text-2xl">
            <CgFacebook className="cursor-pointer hover:text-yellow-500 transition" />
            <CgInstagram className="cursor-pointer hover:text-yellow-500 transition" />
            <CgTwitter className="cursor-pointer hover:text-yellow-500 transition" />
          </div>
        </motion.div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-14 text-center text-sm text-gray-500"
      >
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">BiteBlitz</span>. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
