import SignUpForm from '../components/SignUpForm'
import Dashboard from '../components/Dashboard'
import { app } from '../firebase/firebase'

const Home = () => {
  return (
    <div>
      {/* <SignUpForm /> */}
      <Dashboard />
    </div>
  )
}

export default Home