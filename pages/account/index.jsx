import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function account() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState(cookies.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // user vars
  const [userorders, setUserOrders] = useState([]);

  // order modal vars
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const [orderPay, setOrderPay] = useState(null);
  const [orderShip, setOrderShip] = useState(null);
  const [orderImgs, setOrderImgs] = useState(null);
  const [orderNames, setOrderNames] = useState(null);
  const [orderQty, setOrderQty] = useState(null);

  // modal
  const [openClickOut, setOpenClickOut] = useState("clickoutsideModal");
  const [openModal, setOpenmodal] = useState("order_review_modal");
  const [openUpdateModal, setOpenUpdateModal] = useState("updateInfo_wrapper");

  // update user info
  const [user__id, setUser__id] = useState("");
  const [user__name, setUser__name] = useState("");
  const [user__email, setUser__email] = useState("");
  const [user__address, setUser__address] = useState("");

  const [user__nameModal, setUser__nameModal] = useState("");
  const [user__emailModal, setUser__emailModal] = useState("");
  const [user__addressModal, setUser__addressModal] = useState("");

  const [userHasOrders, setUserHasOrders] = useState(false);

  // for rerender
  const [rerender, setRerender] = useState(1);

  useEffect(async () => {
    // check if have a user cookie
    if (!cookies.user) {
      router.push("/account/login");
    } else {
      // verify token if valid or not expired
      const isMyTokenExpired = await isExpired(cookies.user.token);
      console.log(`is token expired? - ${isMyTokenExpired}`);
      console.log(user);

      // if expired, redirect to login page
      if (isMyTokenExpired == true) {
        logout();
      } else {
        setLoading(true);
        loadUserInfo();
        loadUserOrders();
      }
    }
  }, [cookies, rerender]);

  const logout = () => {
    removeCookie("user");
    window.location.href = "/account/login";
  };

  const loadUserOrders = () => {
    console.log(cookies.user.result.id);

    axios
      .post(process.env.BACKEND_BASEURL + "/user/orders", {
        id: cookies.user.result.id,
      })
      .then((res) => {
        setUserOrders(res.data.result);
        console.log(res.data.result);
        if (res.data.result == []) {
          setUserHasOrders(false);
        } else {
          setUserHasOrders(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadUserInfo = () => {
    axios
      .post(process.env.BACKEND_BASEURL + "/user/credentials", {
        id: cookies.user.result.id,
      })
      .then((res) => {
        console.log(res.data);

        setUser__id(res.data.result[0].customerId);
        setUser__name(res.data.result[0].name);
        setUser__email(res.data.result[0].email);
        setUser__address(res.data.result[0].address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const orderModal = (
    id,
    status,
    total,
    payment,
    shipping,
    date,
    imgs,
    names,
    qty
  ) => {
    setOpenUpdateModal("updateInfo_wrapper");
    setOpenClickOut("clickoutsideModal showclickoutsideModal");
    setOpenmodal("order_review_modal showorder_review_modal");

    setOrderId(id);
    setOrderStatus(status);
    setOrderTotal(total);
    setOrderPay(payment);
    setOrderShip(shipping);
    setOrderDate(date);
    setOrderImgs(imgs.split(","));
    setOrderNames(names.split(","));
    setOrderQty(qty.split(","));
  };

  const closeOrderModal = () => {
    setOpenClickOut("clickoutsideModal");
    setOpenmodal("order_review_modal");
    setOpenUpdateModal("updateInfo_wrapper");
  };

  const user_info_update = () => {
    if (
      user__nameModal.length != 0 &&
      user__emailModal != 0 &&
      user__addressModal != 0
    ) {
      axios
        .post(process.env.BACKEND_BASEURL + "/user/updatecredentials", {
          id: cookies.user.result.id,
          name: user__nameModal,
          email: user__emailModal,
          address: user__addressModal,
        })
        .then((res) => {
          if (res.status == 200) {
            toast.success("Information Updated", { autoClose: 2000 });
            setRerender((state) => ({ ...rerender }));
            closeOrderModal();
          } else if (res.status == 202) {
            toast.error("Something went wrong", { autoClose: 2000 });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("filled all fields");
    }
  };

  const open_UpdateModal = () => {
    setOpenmodal("order_review_modal");
    setOpenClickOut("clickoutsideModal showclickoutsideModal");
    setOpenUpdateModal("updateInfo_wrapper show_updateInfo_wrapper");

    setUser__nameModal(user__name);
    setUser__emailModal(user__email);
    setUser__addressModal(user__address);
  };

  return (
    <>
      {loading && (
        <div className="account">
          <ToastContainer />

          <Nav />
          <div className="accountWrapper">
            <div className="accountDetails">
              {user__email && (
                <>
                  <h3>Account</h3>
                  <div className="ww">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="grey"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    {user__name.replace(/^\w/, (c) => c.toUpperCase())}
                  </div>
                  <div className="ww">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="grey"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinejoin="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      ></path>
                    </svg>
                    {user__email}
                  </div>
                  <div className="ww">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="grey"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    {user__address}
                  </div>
                  <div className="options">
                    <div onClick={open_UpdateModal} className="update_info">
                      <i className="fad fa-file-edit"></i> Update
                    </div>
                    <div className="logout" onClick={logout}>
                      <i className="fad fa-sign-out-alt"></i> Logout
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={openClickOut} onClick={closeOrderModal}></div>
            <div className={openUpdateModal}>
              <div className="top">
                <h4>Update Information</h4>
                <svg
                  onClick={closeOrderModal}
                  aria-hidden="true"
                  width="28"
                  height="28"
                  focusable="false"
                  role="presentation"
                  className="icon icon-close"
                  viewBox="0 0 64 64"
                >
                  <defs></defs>
                  <path
                    className="cls-1"
                    d="M19 17.61l27.12 27.13m0-27.12L19 44.74"
                  ></path>
                </svg>
              </div>
              <div className="form">
                <div className="updateInput">
                  <label htmlFor="password">Name</label>
                  <input
                    type="text"
                    onChange={(e) => setUser__nameModal(e.target.value)}
                    value={user__nameModal}
                  />
                </div>
                <div className="updateInput">
                  <label htmlFor="password">Email</label>
                  <input
                    type="email"
                    onChange={(e) => setUser__emailModal(e.target.value)}
                    value={user__emailModal}
                  />
                </div>
                <div className="updateInput">
                  <label htmlFor="password">Address</label>
                  <input
                    type="text"
                    onChange={(e) => setUser__addressModal(e.target.value)}
                    value={user__addressModal}
                  />
                </div>
                <div onClick={user_info_update} className="update_btn">
                  <i className="fad fa-file-edit"></i> UPDATE
                </div>
              </div>
            </div>
            <div className={openModal}>
              <div className="top">
                <h4>Order Information</h4>
                <svg
                  onClick={closeOrderModal}
                  aria-hidden="true"
                  width="28"
                  height="28"
                  focusable="false"
                  role="presentation"
                  className="icon icon-close"
                  viewBox="0 0 64 64"
                >
                  <defs></defs>
                  <path
                    className="cls-1"
                    d="M19 17.61l27.12 27.13m0-27.12L19 44.74"
                  ></path>
                </svg>
              </div>
              <div className="product_details">
                <div className="imgs">
                  {orderImgs &&
                    orderImgs.map((val, key) => {
                      return (
                        <div className="img_wrapper" key={key}>
                          <img
                            src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${val}`}
                            alt="product image"
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="imgs">
                  {orderNames &&
                    orderNames.map((val, key) => {
                      return (
                        <div className="names_wrapper" key={key}>
                          {val}
                        </div>
                      );
                    })}
                </div>
                <div className="imgs">
                  {orderQty &&
                    orderQty.map((val, key) => {
                      return (
                        <div className="qty_wrapper" key={key}>
                          x{val}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="details">
                <div className="item">
                  <span>Trans. no</span>
                  <span>{orderId}</span>
                </div>
                <div className="item">
                  <span>Status</span>
                  <span>{orderStatus}</span>
                </div>
                <div className="item">
                  <span>Payment mode</span>
                  <span>{orderPay}</span>
                </div>
                <div className="item">
                  <span>Shipping option</span>
                  <span>{orderShip}</span>
                </div>
                <div className="item">
                  <span>Date</span>
                  <span>{new Date(orderDate).toLocaleDateString()}</span>
                </div>
                <div className="item">
                  <span>Total</span>
                  <span>₱{orderTotal && orderTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="orderDetails">
              <div className="order_op">
                <h3>
                  Order History <i className="fal fa-dolly"></i>
                </h3>
                <p>{userorders.length} Orders</p>
              </div>
              <div className="order_his_wrapper">
                {userHasOrders ? (
                  userorders.map((val, key) => {
                    return (
                      <div
                        onClick={() => {
                          orderModal(
                            val.id,
                            val.status,
                            val.total,
                            val.payment_mode,
                            val.shipping_option,
                            val.created_at,
                            val.product_images,
                            val.product_names,
                            val.product_quantities
                          );
                        }}
                        className="order_specific"
                        key={key}
                      >
                        <i className="aa fal fa-shopping-bag"></i>
                        <div className="aa">Order Ref#: {val.id}</div>
                        <div className="aa">
                          Total: ₱{val.total.toLocaleString()}
                        </div>
                        <div className="stat aa">
                          Status:{" "}
                          <span
                            className={`${
                              val.status == "Pending" ? "abc" : "abc delivered"
                            }`}
                          >
                            {val.status}
                          </span>
                        </div>
                        <div className="aa ab">
                          Date: {new Date(val.created_at).toLocaleString()}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No history</div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default account;
