import Head from "next/head";
import Link from "next/link";
import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  return (
    <div>
      <Head>
        <title>Shoppy - Checkout</title>
      </Head>

      {/* USER INFORMATION */}

      <div className="container px-2 m-auto">
        <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
        <h2 className="font-semibold text-xl">1. Delievery Details</h2>
        <div className="mx-auto flex my-2">
          {/*NAME*/}

          <div className="px-2 w-1/2">
            <div className="mb-2">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          {/*EMAIL*/}

          <div className="px-2 w-1/2">
            <div className="relative mb-2">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        {/*TEXTAREA*/}

        <div className="px-2 w-full">
          <div className="relative mb-2">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>

            <textarea
              id="address"
              name="address"
              cols="30"
              rows="2"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="mx-auto flex my-2">
          {/*PHONE*/}

          <div className="px-2 w-1/2">
            <div className="relative mb-2">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          {/*CITY*/}
          <div className="px-2 w-1/2">
            <div className="relative mb-2">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto flex my-2">
          {/*STATE*/}
          <div className="px-2 w-1/2">
            <div className="relative mb-2">
              <label
                htmlFor="state"
                className="leading-7 text-sm text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          {/*PINCODE*/}
          <div className="px-2 w-1/2">
            <div className="relative mb-2">
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CART DATA */}

      <div className="container m-auto px-5 ">
        <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
        <div className=" sideCart bg-pink-100 m-2 py-6 px-8 ">
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="mt-4 text-center text-base font-semibold">
                Your cart is Empty!
              </div>
            )}
            {Object.keys(cart).map((item) => {
              return (
                <li key={item}>
                  <div className="items flex my-5">
                    <div className=" font-semibold">{cart[item].name}</div>
                    <div className="flex items-center justify-center w-1/3 font-semibold">
                      <AiFillMinusCircle
                        onClick={() =>
                          removeFromCart(
                            item,
                            1,
                            cart[item].price,
                            cart[item].name,
                            cart[item].size,
                            cart[item].variant
                          )
                        }
                        className="mx-2 cursor-pointer text-pink-500"
                      />
                      {cart[item].qty}
                      <AiFillPlusCircle
                        onClick={() =>
                          addToCart(
                            item,
                            1,
                            cart[item].price,
                            cart[item].name,
                            cart[item].size,
                            cart[item].variant
                          )
                        }
                        className="mx-2 cursor-pointer text-pink-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span className="font-bold">Subtotal : ₹{subTotal}</span>
        </div>
        <div className="mx-4">
          <Link href={"/order"}>
            <button className="flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              Pay ₹{subTotal}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
