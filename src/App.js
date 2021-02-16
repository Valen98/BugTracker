import React from 'react'
import './Shared/Global/Styles/Global.css';
import 'firebase/firestore'
import 'firebase/auth'
import Router from './Routes/Routes'
import NavBar from './Component/NavBar/NavBar'

import firebase from './Shared/Global/Proivder/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';


const auth = firebase.auth()

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <main>
      <Router>
        {user ? <NavBar/> : <div></div>}
      </Router>
    </main>
  );
}




export default App;
