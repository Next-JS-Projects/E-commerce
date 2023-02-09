import React from "react";
import Link from "next/link";
import Head from "next/head";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Shirts = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Shoppy - Shirts</title>
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
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-10 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).map((item) => {
              console.log(products[item]);
              return (
                <Link
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg m-5">
                    <a className="block relative  rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object object-fit object-center m-auto h-[32vh] md:h-[32vh] block"
                        src={products[item].image}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes("S") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {products[item].color.includes("Red") && (
                          <button
                            className={`border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        )}
                        {products[item].color.includes("Green") && (
                          <button
                            className={`border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        )}
                        {products[item].color.includes("Yellow") && (
                          <button
                            className={`border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        )}
                        {products[item].color.includes("Purple") && (
                          <button
                            className={`border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        )}
                        {products[item].color.includes("Blue") && (
                          <button
                            className={`border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        )}
                        {products[item].color.includes("Pink") && (
                          <button
                            className={`border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        )}
                        {products[item].color.includes("Brown") && (
                          <button
                            className={`border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connection) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();
  let shirts = {};
  for (let item of products) {
    if (item.title in shirts) {
      if (
        !shirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        shirts[item.title].color.push(item.color);
      }
      if (
        !shirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        shirts[item.title].size.push(item.size);
      }
    } else {
      shirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        shirts[item.title].color = [item.color];
        shirts[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(shirts)) },
  };
}

export default Shirts;
