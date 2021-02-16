import React from 'react'

import firebase from '../../Shared/Global/Proivder/Firebase'
import 'firebase/firestore'
import 'firebase/auth'

import './NavBar.css'
import { useHistory } from 'react-router-dom'

const auth = firebase.auth()

function NavBar() {
    const history = useHistory()

    return auth.currentUser && (
        <div className="dummyDiv">
            <div className="NavBar">
                <h1>Leos BugTracker</h1>
                <div className="homeHistory">
                    <button onClick={() => {history.push('/')}}>All Issues</button> 
                </div>
                <div className="userHistory">
                    <button onClick={() => {history.push('/User')}}>My Issues</button> 
                </div>
                <div className="signOut">
                    <button onClick={() => auth.signOut()}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
