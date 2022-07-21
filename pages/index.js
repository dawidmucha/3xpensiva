import SignUpForm from '../components/SignUpForm'
import LogInForm from '../components/LogInForm'
import Dashboard from '../components/Dashboard'
import { app } from '../firebase/firebase'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const Home = () => {
  const [user, setUser] = useState(undefined)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user_) => {
      if(user_) {
        setUser(user_)
      } else setUser(undefined)
    })
  }, [])

  const onSetUser = (user) => {
    setUser(user)
    console.log('logging in')
  }

  const onLogOut = () => {
    signOut(auth).then(() => {
      setUser(undefined)
    }).catch(err => {
      console.error(err)
    })
  }

  if(user) {
    return (
      <div>
        <div>
          jestem na plaży w stegnie
        </div>
        <button onClick={onLogOut}>Log Out</button>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Sign up</h3>
        <SignUpForm />
  
        <h3>Log in</h3>
        <LogInForm setUser={(user) => onSetUser(user)} />
        {/* <Dashboard /> */}
      </div>
    )
  }
}

export default Home