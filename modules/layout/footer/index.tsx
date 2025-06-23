import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#101010] text-white py-20">
      <div className="w-5/6 mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 shrink-0"
            aria-label="Azubit Store"
          >
            <img
              src="/favicon.svg"
              alt="Azubit Store Logo"
              className="h-8 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
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
        </div>
        <p className="text-sm text-gray-400 md:w-2/5">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we&apos;re open 7 days a week.
        </p>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-sm text-gray-400">
            {" "}
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>

          <div className="flex space-x-4">
            <Link
              href="#"
            >
              <div className="h-5 w-5 relative text-sm text-white hover:text-primary-100">
                <Image
                  layout="fill"
                  src="/facebook.svg"
                  objectFit="cover"
                  alt="code and cocktails"
                  className=""
                />
              </div>
            </Link>
            <Link
              href="#"
              className="text-sm text-white hover:text-primary-100"
            >
              <div className="h-5 w-5 relative">
                <Image
                  layout="fill"
                  src="/twitter.svg"
                  objectFit="cover"
                  alt="code and cocktails"
                />
              </div>
            </Link>
            <Link
              href="#"
              className="text-sm text-white hover:text-primary-100"
            >
              <div className="h-5 w-5 relative">
                <Image
                  layout="fill"
                  src="/instagram.svg"
                  objectFit="cover"
                  alt="code and cocktails"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
