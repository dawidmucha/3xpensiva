import SignUpForm from '../components/SignUpForm'
import LogInForm from '../components/LogInForm'
import Dashboard from '../components/Dashboard'
import Item from '../components/Item'
import { app } from '../firebase/firebase'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDatabase, ref, set, onValue, addValueEventListener } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'

const Home = () => {
  const [user, setUser] = useState(undefined)
  const [receipts, setReceipts] = useState({})

  const auth = getAuth()
  const database = getDatabase()

  useEffect(() => {
    onAuthStateChanged(auth, async (user_) => {
      if(user_) {
        setUser(user_)
        getReceipts(user_)
      } else setUser(undefined)

    })

  }, [])

  useEffect(() => {
    console.log('CHANGE', user)
    
    if(user != undefined) getReceipts(user)
  }, [user])

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

  const onReceiptAdd = () => {
    const userId = user.uid
    const receiptId = uuidv4()
    
    set(ref(database, `${userId}/${receiptId}`), {
      createdAt: Date.now()
    })
  }
  
  const getReceipts = (user_) => {
    console.log(user_)
    const userId = user_.uid


    onValue(ref(database, `${userId}/`), snapshot => {
      const data = snapshot.val()
      console.log('awooga', data)
      setReceipts(data)
    })
  }

  if(user) {
    return (
      <div>
        <div>
          obecnie zalogowany jako <b>{user.email}</b> z id <b>{user.uid}</b>
          <button onClick={onLogOut}>Log Out</button>
        </div>
        <div> receipts
          {
            Object.entries(receipts).map(([key, value]) => {
              return <Item key={key} data={value} />
            })
          }
        </div>
        <div>
          <button onClick={onReceiptAdd}>ADD RECEIPT</button>
        </div>
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