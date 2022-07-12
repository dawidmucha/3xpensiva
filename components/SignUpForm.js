import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const LogInForm = () => {
	const onLogInSubmit = (e) => {
		e.preventDefault()

		console.log('logged in as', e.target.email.value, e.target.password.value)

		const auth = getAuth()
		createUserWithEmailAndPassword(auth, e.email, e.password).then((userCredentials) => {
			const user = userCredentials.user
			console.log(user)
		}).catch(err => {
			const errCode = err.code
			const errMessage = err.message

			console.error(errCode, errMessage)
		})
	}
	
	return (
		<div>
			<form onSubmit={(e) => onLogInSubmit(e)}>
				<label htmlFor='email'>Email:</label>
				<input type='email' id='email' name='email' />

				<label htmlFor='password'>Password:</label>
				<input type='password' id='password' name='password' />

				<input type='submit' value='Sign up' />
			</form>
		</div>
	)
}

export default LogInForm