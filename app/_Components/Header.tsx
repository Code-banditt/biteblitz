"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { Baloo_2 } from "next/font/google";
import { PiPizza } from "react-icons/pi";
import { CgShoppingCart } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";

import CartDrawer from "./cartComponent";
import { useCartDrawer } from "../helper/context/cartcontex";
import PizzaBounceLoader from "../loader";
import { useGetCart } from "../Queries/createCartQuery";

const baloo = Baloo_2({
  weight: "800",
  subsets: ["latin"],
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { data: session, status } = useSession();
  const { isOpen, setIsOpen } = useCartDrawer();
  const { data: cart } = useGetCart();

  if (status === "loading") {
    return (
      <div className="flex justify-center py-4">
        <PizzaBounceLoader />
      </div>
    );
  }

  const cartCount = cart?.items?.length || 0;

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`w-full flex justify-between items-center px-4 py-4 text-white ${baloo.className}`}
      >
        {/* LOGO */}
        <Link href="/">
          <h1 className="text-4xl hidden lg:flex font-extrabold text-amber-300 items-center gap-2 cursor-pointer">
            BiteBlitz <PiPizza />
          </h1>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex space-x-8 text-xl font-bold">
          {[
            { label: "MENU", href: "/Pages/Menu" },
            { label: "About", href: "/Pages/About" },
            { label: "Contact", href: "/Pages/Contact" },
            { label: "Orders", href: "/Pages/Orders" },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <p className="cursor-pointer hover:text-amber-300 transition">
                {item.label}
              </p>
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        {!session ? (
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-yellow-300 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-400"
            >
              Log In
            </button>

            <button
              onClick={() => setShowSignup(true)}
              className="border-2 border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-black"
            >
              Sign Up
            </button>

            <div className="opacity-50">
              <CgShoppingCart size={32} color="#facc15" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Profile */}
            <div className="relative group">
              <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center text-black font-bold">
                {session.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="absolute right-0 mt-1 w-40 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Settings
                </button>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <CgShoppingCart size={32} color="#facc15" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        )}

        {/* MOBILE MENU ICON */}
        <div
          className="md:hidden text-amber-300 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <PiPizza size={40} />
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 text-white text-center py-6 space-y-4"
          >
            {[
              { label: "Home", href: "/" },
              { label: "Menu", href: "/Pages/Menu" },
              { label: "About", href: "/Pages/About" },
              { label: "Contact", href: "/Pages/Contact" },
              { label: "Orders", href: "/Pages/Orders" },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <p className="hover:text-amber-300">{item.label}</p>
              </Link>
            ))}

            {!session ? (
              <>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                  className="bg-yellow-300 text-black font-bold py-2 px-6 rounded-full"
                >
                  Log In
                </button>

                <button
                  onClick={() => {
                    setShowSignup(true);
                    setMenuOpen(false);
                  }}
                  className="bg-white text-black font-bold py-2 px-6 rounded-full"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="bg-white text-black font-bold py-2 px-6 rounded-full"
              >
                Log Out
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {showLogin && (
          <Modal title="Log In" onClose={() => setShowLogin(false)}>
            <AuthForm
              type="login"
              setShowLogin={setShowLogin}
              setShowSignup={setShowSignup}
              close={() => setShowLogin(false)}
            />
          </Modal>
        )}
      </AnimatePresence>

      {/* SIGNUP MODAL */}
      <AnimatePresence>
        {showSignup && (
          <Modal title="Sign Up" onClose={() => setShowSignup(false)}>
            <AuthForm
              type="signup"
              setShowLogin={setShowLogin}
              setShowSignup={setShowSignup}
              close={() => setShowSignup(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------ MODAL COMPONENT ------------------ */
function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.7 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
        {children}

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-lg bg-red-500 text-gray-800 font-bold hover:bg-red-600"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ------------------ AUTH FORM ------------------ */
// (Your existing AuthForm can remain unchanged)

/* ------------------ FORM COMPONENT ------------------ */
function AuthForm({
  type,
  close,
  setShowLogin,
  setShowSignup,
}: {
  type: "login" | "signup";
  close: () => void;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordValid = password.length >= 8;
  const { data: session, status } = useSession();
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isEmailValid = validateEmail(email);

  //register user
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/Routes/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      toast.error("Registration failed: " + data.error);
      return;
    }

    toast.success("Registration successful!");
    setShowSignup(false);
    setShowLogin(true);
  }

  //LOGIN USER
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      toast.error("Google sign-in error: " + error);
    }
  };

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setShowLogin(false);
    toast.success(`welcome back!`, { duration: 4000 });
    return result;
  };

  return (
    <div>
      {/* GOOGLE BUTTON */}
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 bg-gray-100 w-full py-2 font
        rounded-lg mb-4 hover:bg-gray-200 text-black"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <form
        className="space-y-4"
        onSubmit={
          type === "signup"
            ? handleSubmit
            : (e) => {
                e.preventDefault();
                handleLogin();
              }
        }
      >
        {type === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
        )}
        <input
          disabled={type === "login" && status === "loading" && !isEmailValid}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
        />
        {email && !isEmailValid && (
          <p className="text-red-500 text-sm">Enter a valid email address.</p>
        )}

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />

          {/* Toggle Button */}
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        {password && !isPasswordValid && (
          <p className="text-red-500 text-sm">
            Password must be at least 8 characters.
          </p>
        )}

        <button
          disabled={
            status === "loading" || (type === "signup" && !isPasswordValid)
          }
          type="submit"
          className={`w-full py-2 rounded-lg font-bold 
    ${isPasswordValid ? "bg-yellow-400" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {status === "loading" ? (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : type === "login" ? (
            "Log In"
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}
