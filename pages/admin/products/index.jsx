import Image from "next/image";

import Adminnav from "../../../components/Adminnav";
import AdminSidebar from "../../../components/AdminSidebar";

import { useForm } from "react-hook-form";
import Link from "next/link";

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { useRouter } from "next/router";

export default function Products() {
  const [previewImg, setPreviewImg] = useState(false);
  // this is for the cookie management
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [stateDB, setStateDB] = useState("Loading..");
  const [hasProductInDB, setHasProductInDB] = useState(false);
  const [stockWarn, setStockWarn] = useState("outStock");

  // responsible for opening and closing the update modal
  const [updateModal, setUpdateModal] = useState("update_product_modal");
  const [placeOrderOverlay, setplaceOrderOverlay] =
    useState("placeOrder_overlay");

  // react hook form
  const { register, handleSubmit, watch, errors } = useForm();

  // this vars are for updating the items
  const [p_id, setP_id] = useState("");
  const [p_name, setP_name] = useState("");
  const [p_description, setP_description] = useState("");
  const [p_price, setP_price] = useState("");
  const [p_quantity, setP_quantity] = useState("");

  // for rerendering
  const [rerender, setrerender] = useState(null);

  useEffect(async () => {
    // check auth
    await checkAuth();

    axios
      .get(process.env.BACKEND_BASEURL + "/admin/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data.result);

        // check if there's a product in db, if none, set the message to no item
        if (res.status == 202) {
          setStateDB("There's no item added");
        } else {
          // if there's a product, show the product map function
          setHasProductInDB(true);
        }
      })
      .catch((error) => {
        if (!error.status) {
          toast.error("Network Error!", { autoClose: 2000 });
          setStateDB("Network error, Please check your internet connection.");
        }
        console.log(error.response);
      });
  }, [cookies, rerender]);

  const checkAuth = async () => {
    if (!cookies.admin) {
      router.push("/admin/auth");
    } else {
      // verify token if valid or not expired
      const isMyTokenExpired = await isExpired(cookies.admin.token);
      console.log(`is token expired? - ${isMyTokenExpired}`);

      // if expired, redirect to login page
      if (isMyTokenExpired == true) {
        window.location.href = "/admin/auth";
      } else {
        setLoading(true);
      }
    }
  };

  const handleItemDelete = (item_id) => {
    let ans = confirm("Are you sure you want to delete this item?");

    if (ans) {
      axios
        .delete(process.env.BACKEND_BASEURL + "/admin/deleteproduct/" + item_id)
        .then((res) => {
          console.log(res);

          // show toast and reload page to view changes
          if (res.status == 200) {
            toast.success(res.data.message, { autoClose: 2000 });
            setrerender((state) => ({ ...rerender }));
          } else if (res.status == 202) {
            toast.error(res.data.message, { autoClose: 5000 });
          }
        })
        .catch((error) => {
          if (!error.status) {
            toast.error("Network Error!", { autoClose: 2000 });
          }
          console.log(error.response);
        });
    }
  };

  const handleUpdateItem = (data) => {
    axios
      .post(process.env.BACKEND_BASEURL + "/admin/updateproduct", {
        id: p_id,
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
      })
      .then((res) => {
        // rerender
        setrerender((state) => ({ ...rerender }));
        // show toast and close modal
        toast.success(res.data.message, { autoClose: 2000 });
        closeUpdateModal();
      })
      .catch((error) => {
        if (!error.status) {
          // show this toast notif if user have network issue
          toast.error("Network Error!", { autoClose: 2000 });
        }
        console.log(error.response);
      });
  };

  // submitting data from update compoennt to update an item
  const onSubmit = async (data, e) => {
    console.log(data);
    console.log(`id: ${p_id}`);

    // call update function
    handleUpdateItem(data);
  };

  // update function, setting the specific item value to vaariable to put it in the inputs update
  const openUpdateModal = (val) => {
    setplaceOrderOverlay("placeOrder_overlay showplaceOrder_overlay");
    setUpdateModal("update_product_modal updateModalOpen");
    setP_id(val.product_id);
    setP_name(val.product_name);
    setP_description(val.product_description);
    setP_price(val.product_price);
    setP_quantity(val.product_quantity);
  };

  // close update modal
  const closeUpdateModal = () => {
    setUpdateModal("update_product_modal");
    setplaceOrderOverlay("placeOrder_overlay");
  };

  return (
    <>
      {loading && (
        <div className="admin_products">
          <ToastContainer />
          <Adminnav />

          <div onClick={closeUpdateModal} className={placeOrderOverlay}></div>
          <div className={updateModal}>
            <div className="update_head">
              <h3>Edit product</h3>
              <div>
                <svg
                  onClick={closeUpdateModal}
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input_wrapper">
                <label htmlFor="">Name</label>
                <input
                  name="name"
                  type="text"
                  onChange={(e) => setP_name(e.target.value)}
                  value={p_name}
                  ref={register({ required: true })}
                />
              </div>
              <div className="input_wrapper">
                <label htmlFor="">Description</label>
                <textarea
                  name="description"
                  type="text"
                  onChange={(e) => setP_description(e.target.value)}
                  value={p_description}
                  ref={register({ required: true })}
                />
              </div>
              <div className="input_wrapper">
                <label htmlFor="">Price</label>
                <input
                  name="price"
                  type="number"
                  onChange={(e) => setP_price(e.target.value)}
                  value={p_price}
                  ref={register({ required: true })}
                />
              </div>
              <div className="input_wrapper">
                <label htmlFor="">Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  onChange={(e) => setP_quantity(e.target.value)}
                  value={p_quantity}
                  ref={register({ required: true })}
                />
              </div>
              <input className="addproduct_btn" type="submit" value="UPDATE" />
            </form>
          </div>

          <div className="admin_headers">
            <h3>Products</h3>
            <Link href="/admin/products/newproduct/">
              <div className="addNew">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Add</span>
              </div>
            </Link>
          </div>

          <div className="content_wrap">
            <AdminSidebar page={3} />
            <div className="admin_products_wrapper">
              <div className="admin_add">
                <h3>Products</h3>
                <Link href="/admin/products/newproduct/">
                  <div className="addNew">
                    <i className="fal fa-plus-circle"></i>
                    <span>Add new product</span>
                  </div>
                </Link>
              </div>

              {hasProductInDB ? (
                // render this if there's an item in db
                <>
                  {products.map((val, key) => {
                    return (
                      <div className="admin_product" key={key}>
                        <Image
                          width={120}
                          height={120}
                          src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${val.product_image}`}
                          alt=""
                        />
                        <div className="p_details">
                          <div
                            className={`${
                              val.product_quantity > 0
                                ? "outStock"
                                : "outStock show_outStock"
                            }`}
                          >
                            Out of Stock
                          </div>
                          <div>ID: {val.product_id}</div>
                          <div>Name: {val.product_name}</div>
                          <div>
                            Price: ₱{val.product_price.toLocaleString()}
                          </div>
                          <div>Quantity: {val.product_quantity}</div>
                          <div className="p_details_op">
                            <div
                              className="op update_op"
                              onClick={() => openUpdateModal(val)}
                            >
                              <i className="fal fa-file-edit"></i> Update
                            </div>
                            <div
                              className="op del_op"
                              onClick={() => handleItemDelete(val.product_id)}
                            >
                              <i className="fal fa-trash-alt"></i> Delete
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                    // if there's no item, render this msg
                  })}
                </>
              ) : (
                <div className="stateDB_msg">{stateDB}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
