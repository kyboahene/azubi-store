import Image from 'next/image';
import React from 'react';
import { Button } from '../button';

const CategoriesSection = () => {
    return (
        <section className="w-5/6 mx-auto mt-42 grid grid-cols-3 gap-4 md:gap-7">
        <div className="relative bg-secondary-100 bg-center h-[240px] rounded-lg flex items-end p-6">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-36">
            <Image
              src="/headphone.svg"
              alt="headphone"
              className="object-contain"
              fill
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold uppercase">Headphones</h2>
            <Button variant="ghost" className="mt-4 uppercase w-fit">
              Shop
            </Button>
          </div>
        </div>
        <div className="relative bg-secondary-100 bg-center h-[240px] rounded-lg flex items-end p-6">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-36">
            <Image
              src="/speaker.png"
              alt="speaker"
              className="object-contain"
              fill
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold uppercase">Speakers</h2>
            <Button variant="ghost" className="mt-4 uppercase w-fit">
              Shop
            </Button>
          </div>
        </div>
        <div className="relative bg-secondary-100 bg-center h-[240px] rounded-lg flex items-end p-6">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-36">
            <Image
              src="/earphone.svg"
              alt="earphone"
              className="object-contain"
              fill
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold uppercase">Earphones</h2>
            <Button variant="ghost" className="mt-4 uppercase w-fit">
              Shop
            </Button>
          </div>
        </div>
      </section>
    );
};

export default CategoriesSection;