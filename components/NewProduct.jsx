import axios from 'axios' 
import { useEffect, useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import Adminnav from '../../../../components/Adminnav'


export default function NewProductModal() {
	const { register, handleSubmit, watch, errors } = useForm();

	const onSubmit = (data, e) => {
		console.log(data)
		axios.post("http://localhost:3001/newproduct", {
			name: data.name,
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

		}).catch((error) => {
      console.log(error.response)
    })
  }

	return (
		<>
		<div className="admin_addproduct_modal">
			<Adminnav />
			
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