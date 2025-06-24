"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import { useForm } from "react-hook-form";

import { Navbar } from "@/modules/layout/nav";
import { Button } from "@/modules/shared/button";
import { Input } from "@/modules/shared/input";
import { useCart } from "@/lib/hooks/use-cart";
import Image from "next/image";
import Footer from "@/modules/layout/footer";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart: orderItems, subtotal } = useCart();
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const total = subtotal + shipping + vat;
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      eMoneyNumber: "",
      eMoneyPin: "",
    },
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = (data: any) => {
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    const firstItem = orderItems[0];
    const otherCount = orderItems.length - 1;
    const otherTotal = orderItems
      .slice(1)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black mb-8">
          <Navbar />
        </div>
        {/* Confirmation Modal Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                THANK YOU FOR YOUR ORDER
              </h2>
              <p className="text-gray-600">
                You will receive an email confirmation shortly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              {firstItem && (
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={firstItem.image}
                      alt={firstItem.name}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{firstItem.name}</p>
                      <p className="text-gray-600 text-sm">
                        $ {firstItem.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-600">x{firstItem.quantity}</span>
                </div>
              )}
              {otherCount > 0 && (
                <p className="text-gray-600 text-sm text-center">
                  and {otherCount} other item(s)
                </p>
              )}
              {otherCount > 0 && (
                <div className="mt-3 space-y-2">
                  {orderItems.slice(1).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded"
                        />
                        <span className="text-xs">{item.name}</span>
                      </div>
                      <span className="text-gray-600 text-xs">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">GRAND TOTAL</span>
                <span className="font-bold text-lg">
                  $ {total.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-primary-100 hover:bg-orange-600 text-white py-3 px-6 uppercase text-sm font-medium tracking-wider transition-colors duration-200"
            >
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white">
        <Navbar />
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="capitalize w-fit text-black hover:text-primary-100 hover:bg-white"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 mb-24">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white rounded-lg p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  CHECKOUT
                </h1>
                <div className="space-y-12">
                  {/* Billing Details */}
                  <div>
                    <h2 className="text-primary-100 uppercase text-sm font-medium tracking-wider mb-4">
                      Billing Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Name
                        </label>
                        <Input
                          type="text"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          placeholder="Alexei Ward"
                          className={`w-full${
                            errors.name
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        {errors.name && (
                          <span className="text-red-500 text-xs">
                            {errors.name.message as string}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          placeholder="alexei@mail.com"
                          className={`w-full${
                            errors.email
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        {errors.email && (
                          <span className="text-red-500 text-xs">
                            {errors.email.message as string}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          {...register("phone", {
                            required: "Phone number is required",
                          })}
                          placeholder="+1 202-555-0136"
                          className={`w-full${
                            errors.phone
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-red-500 text-xs">
                            {errors.phone.message as string}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h2 className="text-primary-100 uppercase text-sm font-medium tracking-wider mb-4">
                      Shipping Info
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Address
                        </label>
                        <Input
                          type="text"
                          {...register("address", {
                            required: "Address is required",
                          })}
                          placeholder="1137 Williams Avenue"
                          className={`w-full${
                            errors.address
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        {errors.address && (
                          <span className="text-red-500 text-xs">
                            {errors.address.message as string}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          ZIP Code
                        </label>
                        <Input
                          type="text"
                          {...register("zipCode", {
                            required: "ZIP code is required",
                          })}
                          placeholder="10001"
                          className={`w-full${
                            errors.zipCode
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        {errors.zipCode && (
                          <span className="text-red-500 text-xs">
                            {errors.zipCode.message as string}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          City
                        </label>
                        <Input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          placeholder="New York"
                          className={`w-full${
                            errors.city
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        {errors.city && (
                          <span className="text-red-500 text-xs">
                            {errors.city.message as string}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Country
                        </label>
                        <Input
                          type="text"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          placeholder="United States"
                          className={`w-full${
                            errors.country
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        {errors.country && (
                          <span className="text-red-500 text-xs">
                            {errors.country.message as string}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h2 className="text-primary-100 uppercase text-sm font-medium tracking-wider mb-4">
                      Payment Details
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Payment Method
                        </label>
                        <div className="space-y-3">
                          <label
                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                              paymentMethod === "emoney"
                                ? "border-primary-100"
                                : "border-gray-400 hover:border-primary-100"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="emoney"
                              checked={paymentMethod === "emoney"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-primary-100 focus:ring-primary-100 accent-primary-100"
                            />
                            <Smartphone className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                            <span className="text-sm font-medium">e-Money</span>
                          </label>
                          <label
                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                              paymentMethod === "cash"
                                ? "border-primary-100"
                                : "border-gray-400 hover:border-primary-100"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cash"
                              checked={paymentMethod === "cash"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-primary-100 focus:ring-primary-100 accent-primary-100"
                            />
                            <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                            <span className="text-sm font-medium">
                              Cash on Delivery
                            </span>
                          </label>
                        </div>
                      </div>

                      {paymentMethod === "cash" && (
                        <div className="flex items-center gap-4">
                          <div className="relative h-32 w-16">
                            <Image
                              src="/cash-on-delivery.svg"
                              alt="Cash on Delivery"
                              className="object-contain"
                              fill
                            />
                          </div>
                          <p className="font-medium text-[15px] text-gray-400">
                            The (Cash on Delivery) option enables you to pay in
                            cash when our delivery courier arrives at your
                            residence. Just make sure your address is correct so
                            that your order will not be cancelled.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "emoney" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              e-Money Number
                            </label>
                            <Input
                              type="text"
                              {...register("eMoneyNumber", {
                                required: "e-Money number is required",
                              })}
                              placeholder="238521993"
                              className={`w-full${
                                errors.eMoneyNumber
                                  ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : ""
                              }`}
                            />
                            {errors.eMoneyNumber && (
                              <span className="text-red-500 text-xs">
                                {errors.eMoneyNumber.message as string}
                              </span>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              e-Money PIN
                            </label>
                            <Input
                              type="text"
                              {...register("eMoneyPin", {
                                required: "e-Money PIN is required",
                              })}
                              placeholder="6891"
                              className={`w-full${
                                errors.eMoneyPin
                                  ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : ""
                              }`}
                            />
                            {errors.eMoneyPin && (
                              <span className="text-red-500 text-xs">
                                {errors.eMoneyPin.message as string}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 md:p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">SUMMARY</h2>
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">
                          $ {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-gray-600">x{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">TOTAL</span>
                  <span className="font-medium">
                    $ {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SHIPPING</span>
                  <span className="font-medium">$ {shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (INCLUDED)</span>
                  <span className="font-medium">$ {vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <span className="text-gray-900 font-medium">GRAND TOTAL</span>
                  <span className="font-bold text-primary-100 text-lg">
                    $ {total.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button
                className="uppercase w-full mt-4"
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
              >
                Continue & Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CheckoutPage;
