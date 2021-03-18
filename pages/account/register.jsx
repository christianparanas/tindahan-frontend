import Nav from '../../components/Nav'
import Link from 'next/link'

function register() {
		return (
		<div className="loginFormWrapper">
			<Nav />
			<div className="loginContentWrapper">
				<h1 className="header">CREATE ACCOUNT</h1>
				<form action="">
					<div className="loginEmailWrapper">
						<label htmlFor="regfirstname">FIRST NAME</label>
						<input type="text" id="regfirstname" name="regfirstname" />
					</div>
					<div className="loginEmailWrapper">
						<label htmlFor="reglastname">LAST NAME</label>
						<input type="text" id="reglastname" name="reglastname" />
					</div>
					<div className="loginEmailWrapper">
						<label htmlFor="regemail">EMAIL</label>
						<input type="email" id="regemail" name="regemail" />
					</div>
					<div className="loginEmailWrapper">
						<label htmlFor="regpass">PASSWORD</label>
						<input type="email" id="regpass" name="regpass" />
					</div>
					<div className="terms">
						<label htmlFor="chkagree" className="terms">
	             <input id="chkagree" type="checkbox" />
	               By ticking this box, you confirm that you have read, understood and agreed to our Terms and Conditions and the collection, use, storage of your data in accordance with our Privacy Policy
	          </label>
          </div>
					<input type="submit" value="CREATE" className="loginSignIpBtn" />
				</form>
			</div>
		</div>
	)
}


export default register;