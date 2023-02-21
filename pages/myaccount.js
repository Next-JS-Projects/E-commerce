import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MyAccount = () => {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("myuser");
    if (!token) {
      router.push("/");
    }
  }, [router.query]);
  return (
    <div>
      <Head>
        <title>Shoppy - My Account</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      wdlkfnkj
    </div>
  );
};

export default MyAccount;
