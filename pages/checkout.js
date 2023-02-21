import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [user, setUser] = useState({ value: null });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("myuser"));

    if (user.token) {
      setUser(user);
      setEmail(user.email);
    }
  }, []);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const pinJson = await pins.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          setState(pinJson[e.target.value][1]);
          setCity(pinJson[e.target.value][0]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    }

    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());

    // GET A TRANSACTION TOKEN

    const data = { cart, subTotal, oid, email, name, address, pincode, phone };

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let txnResponse = await response.json();

    if (txnResponse.success) {
      let txnToken = txnResponse.txnToken;

      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: oid /* update order id */,
          token: txnToken /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: subTotal /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      clearCart();
      toast.error(txnResponse.error, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <title>Shoppy - Checkout</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      ></Script>

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
                value={name}
                onChange={handleChange}
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
              {user && user.token ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  readOnly={true}
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              ) : (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  // readOnly={true}
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              )}
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
              value={address}
              onChange={handleChange}
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
                Phone (10 digit phone number)
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          {/*CITY*/}
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
                value={pincode}
                onChange={handleChange}
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
                value={state}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          {/*PINCODE*/}
          <div className="px-2 w-1/2">
            <div className="relative mb-2">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                District
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleChange}
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
                  <div className="items flex mt-5">
                    <div className=" font-semibold">
                      {cart[item].name} ({cart[item].size}/{cart[item].variant})
                    </div>

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
                  <p className="text-sm mb-5 text-slate-700">
                    ₹{cart[item].price}
                  </p>
                </li>
              );
            })}
          </ol>
          <span className="font-bold">Subtotal : ₹{subTotal}</span>
        </div>
        <div className="mx-4">
          <Link href={"/checkout"}>
            <button
              onClick={initiatePayment}
              disabled={disabled}
              className="disabled:bg-pink-400 flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
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
