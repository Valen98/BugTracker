import React from 'react'
import BugTracker from '../Component/BugTracker/BugTracker'
import SignIn from '../Component/SignIn/SignIn'
import 'firebase/firestore'
import 'firebase/auth'
import firebase from '../Shared/Global/Proivder/Firebase'
import { useAuthState} from 'react-firebase-hooks/auth'

const auth = firebase.auth()

function HomeView() {
    const [user] = useAuthState(auth);
    return (
        <div>
        <section>
          {user ? <BugTracker Sorter={"createdAt"}/> : <SignIn />}
        </section>
        </div>
    )
}

export default HomeView