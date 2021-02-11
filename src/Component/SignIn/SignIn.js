import React from 'react'
import firebase from '../../Shared/Global/Proivder/Firebase'
import './SignIn.css'
const auth = firebase.auth()

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
  
    return(
      <div className="SignInCard">
        <div className="container">
          <h1>Welcome to Leos BugTracker</h1>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
      </div>    
    )
}

export default SignIn
