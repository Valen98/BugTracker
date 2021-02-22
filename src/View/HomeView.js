import React from 'react'
import SignIn from '../Component/SignIn/SignIn'
import 'firebase/firestore'
import 'firebase/auth'
import firebase from '../Shared/Global/Proivder/Firebase'
import { useAuthState} from 'react-firebase-hooks/auth'
import SortBy from '../Component/BugTracker/SortBy'

const auth = firebase.auth()

function HomeView() {
    const [user] = useAuthState(auth);
    return (
        <div>
        <section>
          {user ? <SortBy/> : <SignIn />}
        </section>
        </div>
    )
}

export default HomeView