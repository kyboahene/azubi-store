import React from "react";
import Image from "next/image";

const CTA = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row gap-32 w-5/6 my-42 mx-auto items-center">
      <div className="flex-1 flex flex-col justify-center items-start h-full rounded-lg p-8">
        <div className="flex flex-col gap-8 w-4/5">
          <h1 className="text-center md:text-left text-[28px] md:text-[40px] font-bold uppercase leading-12">
            Bringing you the <span className="text-primary-100">best</span>{" "}
            audio gear
          </h1>
          <p className="text-[15px] text-gray-400">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
      <div className="flex-1 relative h-[580px] w-full overflow-hidden">
        <Image
          src="/human.svg"
          alt="human"
          className="object-cover rounded-lg"
          fill
        />
      </div>
    </section>
  );
};

export default CTA;
