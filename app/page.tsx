import Image from "next/image";

import CTA from "@/modules/shared/cta";
import Footer from "@/modules/layout/footer";
import { Navbar } from "@/modules/layout/nav";
import { Button } from "@/modules/shared/button";
import CategoriesSection from "@/modules/shared/categories";

export default function Home() {
  return (
    <main>
      <div className="bg-[url('/image-hero.jpg')] bg-cover bg-center h-[90vh] text-white rounded overflow-hidden">
        <div className="w-5/6 mx-auto h-full">
          <Navbar />
          <div className="h-full flex justify-start items-center">
            <div className="flex flex-col gap-8 w-2/5">
              <p className="text-sm uppercase tracking-[10px] text-gray-400">
                New Product
              </p>
              <h1 className="text-4xl md:text-[56px] font-bold uppercase">
                XX99 Mark II Headphones
              </h1>
              <p className="text-[15px] text-gray-200">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Button className="uppercase w-fit">See Product</Button>
            </div>
          </div>
        </div>
      </div>
      <CategoriesSection />
      <section className="bg-primary-100 grid grid-cols-1 md:grid-cols-2 w-5/6 mx-auto mt-42 gap-7 rounded-lg py-12 lg:py-0 lg:pt-24">
        <div className="flex justify-center lg:justify-end">
          <div className="relative h-[200px] lg:h-[360px] w-96">
            <Image
              src="/speaker.png"
              alt="speaker"
              className="object-contain"
              fill
            />
          </div>
        </div>
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center lg:items-start gap-8 w-3/5 text-white">
            <h1 className="text-4xl md:text-[56px] font-bold uppercase">
              ZX9 SPEAKER
            </h1>
            <p className="text-[15px] text-center lg:text-left">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Button className="uppercase w-fit bg-black hover:bg-secondary-300">
              See Product
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-[url('/speaker-portrait.jpg')] bg-cover bg-center h-[360px] w-5/6 mx-auto mt-16 rounded-lg">
        <div className="h-full flex justify-start items-center">
          <div className="flex flex-col gap-8 w-2/5 ml-24">
            <h1 className="text-4xl md:text-[28px] font-bold uppercase">
              ZX7 SPEAKER
            </h1>
            <Button className="uppercase w-fit bg-black hover:bg-black">
              See Product
            </Button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 w-5/6 mx-auto gap-16 mt-16 h-[360px]">
        <div className="bg-[url('/earphones-with-case.svg')] bg-center bg-cover rounded-lg"></div>
        <div className="bg-secondary-100 h-full flex justify-start items-center rounded-lg">
          <div className="flex flex-col gap-8 w-2/5 ml-24">
            <h1 className="text-4xl md:text-[28px] font-bold uppercase">
              YX1 EARPHONES
            </h1>
            <Button className="uppercase w-fit bg-black hover:bg-black">
              See Product
            </Button>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
