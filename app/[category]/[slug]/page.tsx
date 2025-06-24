"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";

import data from "@/lib/db/data.json";
import { useCart } from "@/lib/hooks/use-cart";
import { showSuccessMessage } from "@/lib/utils";

import CTA from "@/modules/shared/cta";
import Footer from "@/modules/layout/footer";
import { Navbar } from "@/modules/layout/nav";
import { Button } from "@/modules/shared/button";
import CategoriesSection from "@/modules/shared/categories";

const ProductDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = data.find((p) => p.slug === slug);
  if (!product) {
    return (
      <main className="min-h-screen flex flex-col gap-8">
        <Navbar />
        <div className="w-5/6 mx-auto text-center py-32">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.image?.desktop?.replace("./assets", "/assets") ||
        "/headphone.svg",
      quantity,
    });

    showSuccessMessage(
      "",
      `${product.name} has been added to your cart.`
    );
  };

  return (
    <main className="min-h-screen flex flex-col gap-8">
      <div className="bg-black mb-8">
        <Navbar />
      </div>

      <div className="w-5/6 mx-auto flex flex-col gap-24">
        <Button variant="ghost" className="capitalize w-fit text-black hover:text-primary-100">
          Go Back
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div className="relative h-[580px] w-full rounded-lg bg-secondary-100 flex justify-center items-center">
            <div className="relative h-[300px] w-[200px]">
              <Image
                src={
                  product.image?.desktop?.replace("./assets", "/assets") ||
                  "/headphone.svg"
                }
                alt={product.name}
                className="object-contain"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start h-full rounded-lg p-8">
            <div className="flex flex-col gap-8 w-4/5">
              {product.new && (
                <span className="text-primary-100 tracking-widest uppercase text-xs mb-2">
                  New Product
                </span>
              )}
              <h1 className="text-4xl md:text-[40px] font-bold uppercase">
                {product.name}
              </h1>
              <p className="text-[15px] text-gray-400">{product.description}</p>
              <p className="font-bold text-lg">
                $ {product.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-secondary-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="hover:bg-secondary-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="hover:bg-secondary-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleAddToCart} className="uppercase">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="font-bold text-3xl uppercase">Features</h1>
          <p
            className="text-[15px] text-gray-400"
            style={{ whiteSpace: "pre-line" }}
          >
            {product.features}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <h1 className="font-bold text-3xl uppercase">In The Box</h1>
          <ul className="pl-5 flex flex-col gap-2 text-gray-400">
            {product.includes?.map((inc, i) => (
              <li key={i}>
                <span className="font-bold text-primary-100 mr-2">
                  {inc.quantity}x
                </span>
                {inc.item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <div className="relative h-[calc(50%)] rounded-lg bg-secondary-100">
              <Image
                src={
                  product.gallery?.first?.desktop?.replace(
                    "./assets",
                    "/assets"
                  ) || "/headphone.svg"
                }
                alt={product.name}
                className="object-contain"
                fill
              />
            </div>
            <div className="relative h-[calc(50%)] rounded-lg bg-secondary-100">
              <Image
                src={
                  product.gallery?.second?.desktop?.replace(
                    "./assets",
                    "/assets"
                  ) || "/headphone.svg"
                }
                alt={product.name}
                className="object-contain"
                fill
              />
            </div>
          </div>
          <div className="relative h-[460px] w-full rounded-lg bg-secondary-100">
            <Image
              src={
                product.gallery?.third?.desktop?.replace(
                  "./assets",
                  "/assets"
                ) || "/headphone.svg"
              }
              alt={product.name}
              className="object-contain"
              fill
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {product.others?.map((other, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center gap-10 w-full"
            >
              <div className="relative h-[350px] flex justify-center items-center w-full rounded-lg bg-secondary-100">
                <div className="relative h-[380px] w-[200px]">
                  <Image
                    src={
                      other.image?.desktop?.replace("./assets", "/assets") ||
                      "/headphone.svg"
                    }
                    alt={other.name}
                    className="object-contain"
                    fill
                  />
                </div>
              </div>
              <p className="font-bold text-2xl">{other.name}</p>
              <Button className="uppercase w-fit">See Product</Button>
            </div>
          ))}
        </div>
      </div>
      <CategoriesSection />
      <CTA />
      <Footer />
    </main>
  );
};

export default ProductDetailPage;
