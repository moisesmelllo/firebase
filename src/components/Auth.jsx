import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"


const Auth = () => {
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [isUserLogin, setIsUserLogin] = useState(false)

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, Password)
      setIsUserLogin(true)
    } catch (error) {
      console.log(error);
    }
  }

  const SignInWithGoogle = async() => {
    try {
      await signInWithPopup(auth, googleProvider)
      setIsUserLogin(true)
    } catch (error) {
      console.log(error);
    }
  }

  const SignOut = async () => {
    try {
      await signOut(auth)
      console.log(auth);
      console.log('estou deslogado!');
      setIsUserLogin(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='space-x-5 flex flex-col justify-between flex-wrap mb-10 mx-4'>
      <h1 className="flex justify-center text-4xl font-bold my-4">{isUserLogin ? 'Estou logado' : 'Não estou logado'}</h1>
      <div>
        <input
          type="text"
          placeholder='Email...'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder='Password...'
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
        />
        <button onClick={signIn}>Sign In</button>
        <button onClick={SignInWithGoogle}>Sign in with Google</button>
        <button onClick={SignOut}>Log Out</button>
      </div>
    </div>
  )
}

export default Auth