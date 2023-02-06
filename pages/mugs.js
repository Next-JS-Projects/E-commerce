import Head from "next/head";
import Link from "next/link";
import React from "react";

const Mugs = () => {
  return (
    <div>
      <Head>
        <title>Shoppy - Mugs</title>
        <meta
          name="description"
          content="Shoppy is an ecommerce application, which allows users / customers to sell and purchase the products "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="shoppy, shoppy.com, shop, ecomm, ecommerce"
        />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-10 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Link href="/product/wear-the-tshirt">
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg m-5">
                <a className="block relative  rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object object-cover object-center m-auto h-[30vh] md:h-[26vh] block"
                    src="/Mug1.webp"
                  />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Shirts
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Wear the Ethnic Shirt
                  </h2>
                  <p className="mt-1">₹499</p>
                  <p className="mt-1">S, M, L, XL, XXL</p>
                </div>
              </div>
            </Link>
            <Link href="/product/wear-the-tshirt">
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg m-5">
                <a className="block relative  rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object object-cover object-center m-auto h-[30vh] md:h-[26vh] block"
                    src="/Mug2.webp"
                  />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Shirts
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Wear the Ethnic Shirt
                  </h2>
                  <p className="mt-1">₹499</p>
                  <p className="mt-1">S, M, L, XL, XXL</p>
                </div>
              </div>
            </Link>
            <Link href="/product/wear-the-tshirt">
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg m-5">
                <a className="block relative  rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object object-cover object-center m-auto h-[30vh] md:h-[26vh] block"
                    src="/Mug1.webp"
                  />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Shirts
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    New Cotton Blend Shirt
                  </h2>
                  <p className="mt-1">₹599</p>
                  <p className="mt-1">S, M, L, XL, XXL</p>
                </div>
              </div>
            </Link>
            <Link href="/product/wear-the-tshirt">
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg m-5">
                <a className="block relative  rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object object-cover object-center m-auto h-[30vh] md:h-[26vh] block"
                    src="/Mug2.webp"
                  />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Shirts
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Wear the Ethnic Shirt
                  </h2>
                  <p className="mt-1">₹499</p>
                  <p className="mt-1">S, M, L, XL, XXL</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mugs;
