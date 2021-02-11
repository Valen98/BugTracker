import React from 'react'
import './Shared/Global/Styles/Global.css';


import 'firebase/firestore'
import 'firebase/auth'

import BugTracker from './Component/BugTracker/BugTracker'
import NavBar from './Component/NavBar/NavBar'
import SignIn from './Component/SignIn/SignIn'

import { useAuthState} from 'react-firebase-hooks/auth'


import firebase from './Shared/Global/Proivder/Firebase'

const auth = firebase.auth()


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
          <NavBar />
      </header>

      <section>
        {user ? <BugTracker Sorter={"createdAt"}/> : <SignIn />}
      </section>
    </div>
  );
}




export default App;
