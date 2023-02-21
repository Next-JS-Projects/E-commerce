import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Order from "@/models/Order";
import mongoose from "mongoose";

const MyOrder = ({ order, clearCart }) => {
  // let products = order.products;
  const router = useRouter();

  useEffect(() => {
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  let products = [
    {
      name: "cbvhacjca sdhjcvc kjbcjhghgh jgjjgv jg jf qjk ",
      price: 5555,
      variant: "red",
      qty: 5,
      size: "M",
    },
  ];
  order = { orderId: 654553, status: "Paid", amount: 5555 };

  return (
    <div>
      <Head>
        <title>Shoppy - Orders</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="ordersuccess.jpg"
            />
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                SHOPPY.COM
              </h2>
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">
                Order Id: #{order.orderId}
              </h1>
              <div className="leading-relaxed mb-4">
                Yayy! Your order has been succesfully placed.
                <p>
                  Your Payment Status is{" "}
                  <span className="font-semibold text-green-400">
                    {order.status}
                  </span>
                </p>
              </div>
              <div className="flex mb-4 text-center justify-evenly">
                <a className="flex-grow border-gray-300  border-b-2 py-2 text-lg px-1">
                  Item Description
                </a>
                <a className="flex-grow border-gray-300  border-b-2 py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow border-gray-300  border-b-2 py-2 text-lg px-1">
                  Price
                </a>
              </div>
              {Object.keys(products).map((item) => {
                return (
                  <div key={item} className="flex py-2 text-start ">
                    <div className="text-gray-500 w-2/4 ">
                      {products[item].name}({products[item].size}/
                      {products[item].variant})
                    </div>
                    <span className="m-auto  text-gray-900">
                      {products[item].qty}
                    </span>
                    <span className="m-auto text-gray-900">
                      ₹{products[item].price}
                    </span>
                  </div>
                );
              })}
              <div className="flex flex-col">
                <span className="title-font my-3 font-medium text-xl text-gray-900">
                  SubTotal: ₹{order.amount}
                </span>
                <div>
                  <button className="flex text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connection[0]) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
