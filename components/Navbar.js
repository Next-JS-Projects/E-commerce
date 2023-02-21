import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  user,
  logout,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const router = useRouter();

  const toggleCart = () => {
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (ref.current.classList.contains("translate-x-0")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
    setSidebar(!sidebar);
  };

  useEffect(() => {
    Object.keys(cart).length === 0 && setSidebar(true);
    let exempted = ["/checkout", "/orders", "/order", "myaccount"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  return (
    <div className="sticky top-0 bg-white z-10">
      {/*<ToastContainer
        position="bottom-left"
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
      toast.success("Your account created successfully", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); */}
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-start py-1  shadow-md">
        <div className="logo mr-auto md:mx-5">
          <Link href="/">
            <a>
              <Image src="/frontlogo.png" alt="" width={180} height={40} />
            </a>
          </Link>
        </div>
        <nav className="nav">
          <ul className="flex items-center space-x-4 font-bold md:text-md">
            <li className="hover:text-pink-600">
              <Link href="/shirts">
                <a>Shirts</a>
              </Link>
            </li>

            <li className="hover:text-pink-600">
              <Link href="/hoodies">
                <a>Hoodies</a>
              </Link>
            </li>
            <li className="hover:text-pink-600">
              <Link href="/mugs">
                <a>Mugs</a>
              </Link>
            </li>
            <li className="hover:text-pink-600">
              <Link href="/stickers">
                <a>Stickers</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="cursor-pointer items-center cart absolute right-0 mx-5 top-4 flex">
          <a
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            {user.value && (
              <MdAccountCircle className="text-xl md:text-2xl mx-2" />
            )}
            {dropdown && (
              <div
                onMouseOver={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                className="absolute right-8 bg-white shadow-lg border top-6 rounded-md px-5 w-32 py-4 text-sm"
              >
                <ul>
                  <Link href="/myaccount">
                    <li className="hover:text-pink-700 text-sm font-semibold">
                      My Account
                    </li>
                  </Link>

                  <Link href="/orders">
                    <li className="hover:text-pink-700 text-sm font-semibold">
                      Orders{" "}
                    </li>
                  </Link>

                  <li
                    onClick={logout}
                    className="hover:text-pink-700 text-sm font-semibold"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </a>

          {!user.value && (
            <Link href={"/login"}>
              <a>
                <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">
                  Login
                </button>
              </a>
            </Link>
          )}
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-2xl "
          />
        </div>
      </div>

      {/* CART SIDEBAR */}
      <div
        ref={ref}
        className={`w-72 min-h-screen sideCart overflow-hidden  hover:overflow-y-scroll absolute top-0 right-0 bg-pink-100 py-10 px-8 transform transition-transform ${
          sidebar ? "right-0" : "-right-96"
        } `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="mt-4 text-center text-base font-semibold">
              Your cart is Empty!
            </div>
          )}
          {Object.keys(cart).map((item) => {
            return (
              <li key={item} className="my-5">
                <div className="items flex ">
                  <div className="w-2/3 font-semibold">
                    {cart[item].name} ({cart[item].size}/{cart[item].variant})
                    &nbsp;&nbsp;
                    <p className="text-sm text-slate-700">
                      ₹{cart[item].price}
                    </p>
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
              </li>
            );
          })}
        </ol>
        <span className="font-bold">Subtotal : ₹{subTotal}</span>
        <div className="flex">
          <Link href={"/checkout"}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="disabled:bg-pink-400  flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            disabled={Object.keys(cart).length === 0}
            className="disabled:bg-pink-400  flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
