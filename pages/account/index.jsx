import Nav from '../../components/Nav'
import Link from 'next/link'

function account() {
	return (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
				<Link href="/account/login">
					Login
				</Link>
			</div>
		</div>
	)
}


export default account;