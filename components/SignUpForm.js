import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'next/router'


const LogInForm = () => {
	const router = useRouter()

	const onLogInSubmit = (e) => {
		e.preventDefault()

		const email = e.target.email.value
		const password = e.target.password.value

		console.log('signing up as', email, password)

		const auth = getAuth()
		createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
			const user = userCredentials.user
			console.log(user)

			//redirect
			router.push('/dashboard')

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