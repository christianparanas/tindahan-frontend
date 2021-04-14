import Link from 'next/link'


export default function HomeProductContainer({ val }) {


	return (
		<>
		<Link href={{ pathname: "/products/" + `${val.product_id}`}} as={`/products/${val.product_id}`}>
			<div className="homeProductContainer">
				<img src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${val.product_image}`} alt="product image" />				
				<div className="aa">
					<h3 className="itemDescription">{ val.product_name }</h3>
					<p className="itemPrice">₱{ val.product_price }</p>
				</div>
			</div>
		</Link>
		</>
	)
}