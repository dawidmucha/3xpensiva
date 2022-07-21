import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"


const LogInForm = (props) => {
	const [user, setUser] = useState(undefined)

	const onLogInSubmit = (e) => {
		e.preventDefault()

		const email = e.target.email.value
		const password = e.target.password.value

		const auth = getAuth()
		signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
			const user = userCredentials.user
			props.setUser(user)
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