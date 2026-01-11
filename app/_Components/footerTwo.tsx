"use client";

import { motion } from "framer-motion";
import { CgShoppingCart } from "react-icons/cg";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            BiteBlitz is loved for its fast delivery, fresh ingredients, and
            unforgettable flavors. Here is why people keep coming back!
          </p>
        </motion.div>

        {/* Testimonials + Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <p className="text-gray-700 text-sm mb-4">
                “Best pizza delivery I’ve ever experienced! Hot, fast, and
                insanely delicious!”
              </p>
              <p className="text-gray-900 font-semibold">— Sarah J.</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-yellow-400">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>
          </motion.div>

          {/* Step Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-yellow-50 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              How It Works
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>1. Choose Your Pizza</li>
              <li>2. Customize Your Order</li>
              <li>3. Fast Cooking & Delivery</li>
              <li>4. Enjoy Your Meal!</li>
            </ul>
          </motion.div>

          {/* Partners Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Our Partners
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>Coca-Cola</li>
              <li>Domino Farms</li>
              <li>FreshDough Co.</li>
              <li>EcoDelivery NG</li>
            </ul>
          </motion.div>

          {/* Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Get Support
            </h3>
            <div className="space-y-1 text-gray-700 text-sm">
              <p>Email: help@biteblitz.com</p>
              <p>Phone: +234 900 123 4567</p>
              <p>Lagos, Nigeria</p>
            </div>
            <div className="mt-4 flex gap-3 text-gray-900">
              <CgShoppingCart size={22} className="text-yellow-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
