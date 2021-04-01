import axios from 'axios' 
import { useEffect, useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import Adminnav from '../../../components/Adminnav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function NewProductModal() {
	const { register, handleSubmit, watch, errors } = useForm();

	const notify = () => toast.success("Item Successfully Added!", {
			autoClose: 3000,
		});
		const failLog = () => toast.error("Something went wrong!", { autoClose: 2000 });

	const onSubmit = (data, e) => {
		console.log(data)
		axios.post("https://tindahan-mern.herokuapp.com/newproduct", {
			name: data.name,
			// save the image name to db, so it can be used to retrive the image from cloudianry
			image: data.image[0].name,
			price: data.price,
			quantity: data.quantity,
		}).then(res => {
				const formData = new FormData()
				// getting the form image
				formData.append('file', data.image[0])
				// setting up a  upload preset for cloudinary and the directory of the file
				formData.append('upload_preset', 'oujxfvjk')
				axios.post("https://api.cloudinary.com/v1_1/christianparanas/upload", formData)
				.then(data => { console.log(data)} )
				notify()

				e.target.reset();
		}).catch((error) => {
			failLog()
      console.log(error.response)
    })
  }

	return (
		<>
		 <ToastContainer />
		<Adminnav />
		<div className="admin_addproduct_modal">

			<h2>ADD NEW PRODUCT</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="input_wrapper">
					<label htmlFor="">Name</label>
					<input name="name" type="text" ref={register({ required: true })} />
				</div>
				<div className="input_wrapper">
					<label htmlFor="">Image</label>
					<input name="image" type="file" accept='image/*' ref={register({ required: true })} />
				</div>
				<div className="input_wrapper">
					<label htmlFor="">Price</label>
					<input name="price" type="text" ref={register({ required: true })} />
				</div>
				<div className="input_wrapper">
					<label htmlFor="">Quantity</label>
					<input name="quantity" type="text" ref={register({ required: true })} />
				</div>
				<input className="addproduct_btn" type="submit" value="ADD" />
			</form>
		</div>
		</>
	)
}