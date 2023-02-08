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
            {products.map((item) => {
              return (
                <Link key={item._id} href={`/product/${item.slug}`}>
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg m-5">
                    <a className="block relative  rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object object-fit object-center m-auto h-[32vh] md:h-[32vh] block"
                        src={item.image}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {item.category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {item.title}
                      </h2>
                      <p className="mt-1">₹{item.price}</p>
                      <p className="mt-1">{item.size}</p>
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
  if (!mongoose.connection[0]) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "Shirt" });

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Shirts;
