"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "@/lib/hooks/use-cart";

import { CartDrawer } from "@/modules/cart/cart-drawer";

export function Navbar() {
  const { itemCount, openCart, isCartOpen, closeCart } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMobileMenu (){
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <header
      className={`z-50 w-full transition-all duration-300 border-b-[1px] border-white bg-transparent`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
         <div className="flex items-center gap-6">
           <button
            className="p-2 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 shrink-0"
            aria-label="Azubit Store"
          >
            <img
              src="/favicon.svg"
              alt="Azubit Store Logo"
              className="h-6 w-auto"
            />
          </Link>
         </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center text-white space-x-8">
            <Link
              href="/"
              className="font-medium uppercase hover:text-primary-100"
            >
              Home
            </Link>
            <Link
              href="/headphones"
              className="font-medium uppercase hover:text-primary-100"
            >
              Headphones
            </Link>
            <Link
              href="/speakers"
              className="font-medium uppercase hover:text-primary-100"
            >
              Speakers
            </Link>
            <Link
              href="/earphones"
              className="font-medium uppercase hover:text-primary-100"
            >
              Earphones
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => openCart()}
              className="p-2 text-white hover:text-primary-200 relative cursor-pointer"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-200 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white"
          >
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link
                href="/"
                className="font-medium uppercase py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/headphones"
                className="font-medium uppercase py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Headphones
              </Link>
              <Link
                href="/speakers"
                className="font-medium uppercase py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Speakers
              </Link>
              <Link
                href="/earphones"
                className="font-medium uppercase py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Earphones
              </Link>
            </nav>
          </motion.div>
        ): null}
      </AnimatePresence>


      {isCartOpen ? (
        <CartDrawer isOpen={isCartOpen} onClose={() => closeCart()} />
      ) : null}
    </header>
  );
}
