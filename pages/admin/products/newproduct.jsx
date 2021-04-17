import axios from 'axios' 
import { useEffect, useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import Adminnav from '../../../components/Adminnav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { useRouter } from 'next/router'


export default function NewProductModal() {
	const [cookies, setCookie, removeCookie] = useCookies(['admin']);
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit, watch, errors } = useForm();
	const [previewImg, setPreviewImg] = useState(false)

	const notify = () => toast.success("Item Successfully Added!", {
			autoClose: 3000,
		});
		const failLog = () => toast.error("Something went wrong!", { autoClose: 2000 });

	const onSubmit = async (data, e) => {
		
		console.log(data)
		axios.post(process.env.BACKEND_BASEURL + "/newproduct", {
			name: data.name,
			// save the image name to db, so it can be used to retrive the image from cloudianry
			image: data.image[0].name,
			price: data.price,
			description: data.description,
			quantity: data.quantity,
		}).then(res => {
				const formData = new FormData()
				// getting the form image
				formData.append('file', data.image[0])

				// setting up a  upload preset for cloudinary and the directory of the file
				formData.append('upload_preset', 'oujxfvjk')
				axios.post("https://api.cloudinary.com/v1_1/christianparanas/upload", formData)
					.then(data => { 
						notify()
						console.log(data)
						e.target.reset();
						setPreviewImg(false)
						setTimeout(function(){ window.location.href = "/admin/products" }, 1800);
					
					}).catch((error) => {
						if(!error.status) {
							toast.error("Network Error!", { autoClose: 2000 });
						}
					})

		}).catch((error) => {
			if(!error.status) {
				toast.error("Network Error!", { autoClose: 2000 });
			} else if(error.status == 400){
				toast.error("Server cannot be reached!", { autoClose: 2000 });
			} else {
				failLog()
			}
      console.log(error.response)
    })
  }

  useEffect( async () => {
		// check if have a user cookie
		if(!cookies.admin) {
			router.push("/admin/auth")
		} else {
			// verify token if valid or not expired
			const isMyTokenExpired = await isExpired(cookies.admin.token);
			console.log(`is token expired? - ${isMyTokenExpired}`)

			// if expired, redirect to login page
			if(isMyTokenExpired == true) {
				window.location.href = "/admin/auth"
			} else {
				setLoading(true)
			}
		}
	}, [cookies])

  const previewImage = (e) => {
  	setPreviewImg(URL.createObjectURL(e.target.files[0]))
  }

	return (
		<>
		{ loading && (
			<>
		<Adminnav />
		<div className="admin_addproduct_modal">
		<ToastContainer />

			<h3>Add new product</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="input_wrapper">
					<label htmlFor="">Name</label>
					<input name="name" type="text" ref={register({ required: true })} />
				</div>
				<div className="input_wrapper">
					<label htmlFor="">Image</label>
					<input name="image" type="file" onChange={previewImage} accept='image/*' ref={register({ required: true })} />
					{previewImg && ( <img className="previewImg" src={previewImg} /> )}
				</div>
				<div className="input_wrapper">
					<label htmlFor="">Description</label>
					<textarea name="description" type="text" ref={register({ required: true })} />
				</div>
				<div className="input_wrapper">
					<label htmlFor="">Price</label>
					<input name="price" type="number" ref={register({ required: true })} />
				</div>
				<div className="input_wrapper">
					<label htmlFor="">Quantity</label>
					<input name="quantity" type="number" ref={register({ required: true })} />
				</div>
				<input className="addproduct_btn" type="submit" value="ADD" />
			</form>
		</div>
		</>
		)}
		</>
	)
}