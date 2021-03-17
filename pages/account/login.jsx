
import Nav from '../../components/Nav'


function login() {
	return (
		<div className="loginFormWrapper">
			<Nav />
			<div className="loginContentWrapper">
				<h1 className="header">Login</h1>
				<form action="">
					<div className="loginEmailWrapper">
						<label htmlFor="loginEmail">Email</label>
						<input type="email" id="loginEmail" name="loginEmail" />
					</div>
					<div className="loginEmailWrapper">
						<div className="loginPassOptions">
							<label htmlFor="loginPassword">Password</label>
							<div className="ForgotPass">Forgot?</div>
						</div>
						<input type="password" id="loginPassword" name="LoginPassword" />
					</div>
					<input type="submit" value="Sign In" className="loginSignIpBtn" />
					<div className="createAcctBtn">Create account</div>
				</form>
			</div>
		</div>
	)
}


export default login;