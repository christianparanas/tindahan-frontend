import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

function account() {
	return (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
				<Link href="/account/login">
					Login here
				</Link>
			</div>
			<Footer />
		</div>
	)
}


export default account;