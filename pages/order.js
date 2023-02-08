import Head from "next/head";
import React from "react";

const Order = () => {
  return (
    <div>
      <Head>
        <title>Shoppy - Orders</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                SHOPPY.COM
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: #65453443543
              </h1>

              <p className="leading-relaxed mb-4">
                Your order has been succesfully placed
              </p>
              <div className="flex mb-4 text-center">
                <a className="flex-grow border-gray-300  border-b-2 py-2 text-lg px-1">
                  Item Description
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Item Total
                </a>
              </div>

              <div className="flex border-t border-gray-200 py-2 ">
                <span className="text-gray-500">Wear the Shoppy (L/Red)</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹499</span>
              </div>
              <div className="flex border-t border-gray-200 py-2 text-center">
                <span className="text-gray-500">Wear the Shoppy (L/Red)</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹499</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2 text-center">
                <span className="text-gray-500">Wear the Shoppy (L/Red)</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹499</span>
              </div>
              <div className="flex flex-col">
                <span className="title-font font-medium text-xl text-gray-900">
                  SubTotal: ₹1599
                </span>
                <div className="my-4">
                  <button className="flex text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
