import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Link from "next/link";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";

function register() {
  // react hool form
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const onSubmit = (data, e) => {
    axios
      .post(process.env.BACKEND_BASEURL + "/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
      })
      .then((res) => {
        if (res.status == 200) {
          // show toast
          toast.success(res.data.message, { autoClose: 3000 });

          setTimeout(function () {
            window.location.href = "/account/login";
          }, 2000);
          // clear inputs after submit
          e.target.reset();
        } else if (res.status == 202) {
          toast.error(res.data.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        if (!error.status) {
          toast.error("Network Error!", { autoClose: 2000 });
          console.log(error);
        }
      });
  };

  useEffect(async () => {
    // check if have a user cookie
    if (!cookies.user) {
      router.push("/account/register");
    } else {
      // verify token if valid or not expired
      const isMyTokenExpired = await isExpired(cookies.user.token);
      console.log(isMyTokenExpired);

      // if !expired, redirect to acct page
      if (isMyTokenExpired != true) {
        window.location.href = "/account/";
      }
    }
  }, [cookies]);

  return (
    <div className="loginFormWrapper">
      <ToastContainer />
      <Nav />
      <div className="loginContentWrapper">
        <img src="/reg.png" alt="user reg logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginEmailWrapper">
            <label htmlFor="regfirstname">Full name</label>
            <input
              name="name"
              ref={register({ required: true })}
              type="text"
              id="regname"
            />
          </div>
          <div className="loginEmailWrapper">
            <label htmlFor="regfirstname">Address</label>
            <input
              name="address"
              ref={register({ required: true })}
              type="text"
              id="regadd"
            />
          </div>
          <div className="loginEmailWrapper">
            <label htmlFor="regemail">Email</label>
            <input
              name="email"
              ref={register({ required: true })}
              type="email"
              id="regemail"
            />
          </div>
          <div className="loginEmailWrapper">
            <label htmlFor="regpass">Password</label>
            <input
              name="password"
              ref={register({ required: true })}
              type="password"
              id="regpass"
            />
          </div>
          <div className="terms">
            <label htmlFor="chkagree" className="terms">
              <input id="chkagree" type="checkbox" />
              By ticking this box, you confirm that you have read, understood
              and agreed to our Terms and Conditions and the collection, use,
              storage of your data in accordance with our Privacy Policy
            </label>
          </div>
          <input type="submit" value="CREATE" className="loginSignIpBtn" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default register;
