import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = () => {
  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-start py-1  shadow-md">
        <div className="logo mx-5">
          <Link href="/">
            <a>
              <Image src="/frontlogo.png" alt="" width={180} height={40} />
            </a>
          </Link>
        </div>

        <nav className="nav">
          <ul className="flex items-center space-x-4 font-bold md:text-md">
            <li>
              <Link href="/shirts">Shirts</Link>
            </li>
            <li>
              <Link href="/hoodies">Hoodies</Link>
            </li>
            <li>
              <Link href="/mugs">Mugs</Link>
            </li>
            <li>
              <Link href="/stickers">Stickers</Link>
            </li>
          </ul>
        </nav>

        <div onClick={toggleCart} className="cart absolute right-0 mx-5 top-4">
          <button>
            <AiOutlineShoppingCart className="text-xl md:text-2xl " />
          </button>
        </div>
      </div>

      {/* CART SIDEBAR */}
      <div
        ref={ref}
        className="w-72 h-[100vh] sideCart  absolute top-0 right-0 bg-pink-100 py-10 px-8 transform transition-transform translate-x-full "
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="items flex my-5">
              <div className="w-2/3 font-semibold">Shirt- shop as you want</div>
              <div className="flex items-center justify-center w-1/3 font-semibold">
                <AiFillMinusCircle className="mx-2 cursor-pointer text-pink-500" />
                1
                <AiFillPlusCircle className="mx-2 cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex my-5">
              <div className="w-2/3 font-semibold">Shirt- shop as you want</div>
              <div className="flex items-center justify-center w-1/3 font-semibold">
                <AiFillMinusCircle className="mx-2 cursor-pointer text-pink-500" />
                1
                <AiFillPlusCircle className="mx-2 cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex my-5">
              <div className="w-2/3 font-semibold">Shirt- shop as you want</div>
              <div className="flex items-center justify-center w-1/3 font-semibold">
                <AiFillMinusCircle className="mx-2 cursor-pointer text-pink-500" />
                1
                <AiFillPlusCircle className="mx-2 cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="items flex my-5">
              <div className="w-2/3 font-semibold">Shirt- shop as you want</div>
              <div className="flex items-center justify-center w-1/3 font-semibold">
                <AiFillMinusCircle className="mx-2 cursor-pointer text-pink-500" />
                1
                <AiFillPlusCircle className="mx-2 cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
        </ol>
        <div className="flex">
          <button className="flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            <BsFillBagCheckFill className="m-1" />
            Checkout
          </button>
          <button className="flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            Clear Cart
          </button>
        </div>
        </div>
    </div>
  );
};

export default Navbar;
