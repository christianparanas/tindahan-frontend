import Link from 'next/link'


export default function HomeProductContainer({ val }) {


	return (
		<>
		<Link href={{ pathname: "/products/" + `${val.product_id}`}} as={`/products/${val.product_id}`}>
			<div className="homeProductContainer">
				<img style={{ width: "100%", height: "350px"}} src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${val.product_image}`} alt="product image" />				
				<div className="itemDescription">{ val.product_name }</div>
				<div className="itemPrice">₱ { val.product_price }</div>
			</div>
		</Link>
		</>
	)
}