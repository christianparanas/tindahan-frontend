import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import Link from 'next/link'

import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm } from "react-hook-form";


function register() {
		// react hool form
		const { register, handleSubmit, watch, errors } = useForm();

		//  toast config
		const notify = () => toast.success("Registered Successfully!", {
			autoClose: 3000,
		});

  	const onSubmit = (data, e) => {
  		axios.post("http://localhost:3001/register", {
				name: data.name,
				email: data.email,
				password: data.password,
			}).then(data => {
				// show toast
	  		notify()
	  		// clear inputs after submit
				e.target.reset();
				}).catch((error) => {
	        console.log(error.response.data) //Logs a string: Error: Request failed with status code 404
	    })
  	}



		return (
		<div className="loginFormWrapper">
			 <ToastContainer />
			<Nav />
			<div className="loginContentWrapper">
				<h1 className="header">CREATE ACCOUNT</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="loginEmailWrapper">
						<label htmlFor="regfirstname">FULL NAME</label>
						<input name="name" ref={register({ required: true })} type="text" id="regname" />
					</div>
					<div className="loginEmailWrapper">
						<label htmlFor="regemail">EMAIL</label>
						<input name="email" ref={register({ required: true })} type="email" id="regemail" />
					</div>
					<div className="loginEmailWrapper">
						<label htmlFor="regpass">PASSWORD</label>
						<input name="password" ref={register({ required: true })} type="password" id="regpass" />
					</div>
					<div className="terms">
						<label htmlFor="chkagree" className="terms">
	            <input id="chkagree" type="checkbox" />
	               By ticking this box, you confirm that you have read, understood and agreed to our Terms and Conditions and the collection, use, storage of your data in accordance with our Privacy Policy
	          </label>
          </div>
          <input type="submit" value="Create" className="loginSignIpBtn" />
				</form>
			</div>
			<Footer />
		</div>
	)
}


export default register;