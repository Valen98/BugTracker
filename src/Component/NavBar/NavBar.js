import React from 'react'

import firebase from '../../Shared/Global/Proivder/Firebase'
import 'firebase/firestore'
import 'firebase/auth'

import './NavBar.css'

const auth = firebase.auth()

function NavBar() {

    return auth.currentUser && (
        <div className="dummyDiv">
            <div className="NavBar">
                <h1>Leos BugTracker</h1>
                <div className="signOut">
                    <button onClick={() => auth.signOut()}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
