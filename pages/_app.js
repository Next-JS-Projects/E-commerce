import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";


export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(1);
  const [progress, setProgress] = useState(0);

  // GETTING CART FROM LOCALSTORAGE

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (err) {
      localStorage.clear();
    }

    let myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }
    setKey(Math.random());
  }, [router.query]);

  // LOGOUT

  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/");
  };

  // SAVING CART TO LOCALSTORAGE

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }

    setSubTotal(subt);
  };

  // ADDING CART ITEMS

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    if (Object.keys(cart).length == 0) {
      setKey(Math.random());
    }

    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // BUY NOW

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant };

    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  // CLEARING CART

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  // REMOVING A CART ITEM

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <div>
      <LoadingBar
        color="#ff2d55"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      
          {key && (
            <Navbar
              user={user}
              key={key}
              cart={cart}
              logout={logout}
              buyNow={buyNow}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              subTotal={subTotal}
            />
          )}
          <Component
            cart={cart}
            buyNow={buyNow}
            key={setKey}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            subTotal={subTotal}
            {...pageProps}
          />
      
      <Footer />
    </div>
  );
}
