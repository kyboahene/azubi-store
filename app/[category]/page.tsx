"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import data from "@/lib/db/data.json";

import CTA from "@/modules/shared/cta";
import Footer from "@/modules/layout/footer";
import { Navbar } from "@/modules/layout/nav";
import { Button } from "@/modules/shared/button";
import CategoriesSection from "@/modules/shared/categories";

const CategoryPage = () => {
  const params = useParams();
  const category = params?.category as string;

  const products = data.filter((product) => product.category === category);

  const sortedProducts = [
    ...products.filter((p) => p.new),
    ...products.filter((p) => !p.new),
  ];

  return (
    <main className="min-h-screen flex flex-col gap-8">
      <div className="bg-black h-[30vh] text-white rounded overflow-hidden">
        <div className="w-5/6 mx-auto h-full">
          <Navbar />
          <div className="h-full flex justify-center items-center">
            <h1 className="text-[40px] font-bold uppercase">{category}</h1>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-32 w-5/6 mx-auto mt-52">
        {sortedProducts.length === 0 && (
          <div className="text-center text-gray-400">
            No products found in this category.
          </div>
        )}
        {sortedProducts.map((product, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={product.id}
              className={`flex gap-16 items-center ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative h-[380px] w-full overflow-hidden bg-secondary-100 rounded-lg">
                <Image
                  src={
                    product.categoryImage?.desktop?.replace(
                      "./assets",
                      "/assets"
                    ) || "/headphone-1.svg"
                  }
                  alt={product.name}
                  className="object-cover rounded-lg"
                  fill
                />
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
                  <p className="text-[15px] text-gray-400">
                    {product.description}
                  </p>
                  <Link href={`/${category}/${product.slug}`}>
                    <Button className="uppercase w-fit">See product</Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <CategoriesSection />
      <CTA />
      <Footer />
    </main>
  );
};

export default CategoryPage;
