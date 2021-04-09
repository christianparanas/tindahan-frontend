import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios' 
import { useEffect, useState, useContext } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function auth() {
	const { register, handleSubmit, watch, errors } = useForm();
	const [cookies, setCookie, removeCookie] = useCookies(['admin']);

	const succLog = () => toast.success("Logging In..", { autoClose: 2000 });


	const onSubmit = (data, e) => {
  	axios.post(process.env.BACKEND_BASEURL + "/adminlogin", {
			username: data.username,
			password: data.password,
		}).then(res => {
				if(res.status == 200) {
					console.log(res)
				// show success toast
					succLog()	
				
					// save admin info to cookie
					setTimeout(function(){ setCookie('admin', res.data, { path: '/' }) }, 1800);	  		

		  		// clear inputs after submit
					e.target.reset();	
				} else if(res.status == 202) {
					toast.error("Invalid Username or Password!", { autoClose: 2000 });
				} else if(res.status == 204) {
					toast.error("User didn't exist!", { autoClose: 2000 });
				}		
		}).catch((error) => {
		 	if(!error.status) {
		 		toast.error("Network Error!", { autoClose: 2000 });
		 		console.log(error)
		 	}
    })
  }

  useEffect( async () => {
		if(cookies.admin) {
			// verify token if valid or not expired
			const isMyTokenExpired = await isExpired(cookies.admin.token);
			console.log(`is token expired? - ${isMyTokenExpired}`)

			if(isMyTokenExpired == false) {
				window.location.href = "/admin"
			}
		} 
	}, [cookies])

	return (
		<div className="admin_auth">
			<ToastContainer />
			<div className="auth_form_container">
				<h1 className="header">ADMIN PANEL</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input name="username" placeholder="Username or Email" ref={register({ required: true })} type="text" id="admin_auth_username" />
					<input name="password" placeholder="Password"  ref={register({ required: true })} type="password" id="admin_auth_password" />
          <input type="submit" value="LOGIN" className="admin_auth_loginBtn" />
				</form>
			</div>
		</div>
	)
}