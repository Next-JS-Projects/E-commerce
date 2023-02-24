import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [user, setUser] = useState({ value: null });
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    let myuser = JSON.parse(localStorage.getItem("myuser"));

    if (!myuser) {
      router.push("/");
    }

    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser);
    }
  }, []);

  const fetchData = async (myuser) => {
    let data = { token: myuser.token };
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let res = await response.json();
    setName(res.name);
    setAddress(res.address);
    setPhone(res.phone);
    setPincode(res.pincode);
  };

  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode };
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let res = await response.json();

    if (res.success) {
      toast.success("Details Successfully Updated", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Error Updating Details", {
        position: "top-left",
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

  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = { token: user.token, password, cpassword, npassword };

      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      res = await response.json();
    } else {
      res = { success: false };
    }

    if (res.success) {
      toast.success("Password Successfully Updated ", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setPassword("")
      setCpassword("")
      setNpassword("")
    } else {
      toast.error("Error Updating Password", {
        position: "top-left",
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

  useEffect(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 9 &&
      address.length > 3 &&
      pincode.length > 5
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, phone, pincode, address]);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
  };

  // useEffect(() => {
  //   let token = localStorage.getItem("myuser");
  //   if (!token) {
  //     router.push("/");
  //   }
  // }, [router.query]);

  return (
    <div className="container mx-auto my-9">
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
        <title>Shoppy - My Account</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      {/* USER DETAILS FORM */}

      <div className="container px-2 m-auto">
        <h1 className="font-semibold text-3xl my-8 text-center">
          Update your Account
        </h1>
        {/* DELIEVERY DETAILS */}

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
                Email ( can't be updated )
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

        {/*PHONE*/}
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="relative mb-2">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone (10 digit)
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
                Pincode (6 digit)
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

        <button
          onClick={handleUserSubmit}
          disabled={disabled}
          className="m-2 mb-5 disabled:bg-pink-400  flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
        >
          Submit
        </button>
      </div>

      <div>
        {/*CHANGE PASSWORD */}

        <h2 className="font-semibold mx-2 text-xl">2. Change Password</h2>
        <div className="mx-auto flex flex-wrap my-2">
          {/* OLD PASSWORD */}

          <div className="px-2 md:w-1/3 sm:w-1/2">
            <div className="mb-2">
              <label htmlFor="pass" className="leading-7 text-sm text-gray-600">
                Old Password
              </label>
              <input
                type="password"
                id="pass"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* NEW PASSWORD */}

          <div className="px-2 md:w-1/3 sm:w-1/2">
            <div className="relative mb-2">
              <label
                htmlFor="npass"
                className="leading-7 text-sm text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="npass"
                name="npassword"
                value={npassword}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* CONFIRM NEW PASSWORD */}

          <div className="px-2 md:w-1/3">
            <div className="mb-2">
              <label
                htmlFor="cpass"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="cpass"
                name="cpassword"
                value={cpassword}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="mx-4">
          <button
            onClick={handlePasswordSubmit}
            className="disabled:bg-pink-400 flex mt-6 mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
