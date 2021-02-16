import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import firebase from '../../Shared/Global/Proivder/Firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState} from 'react-firebase-hooks/auth'
import './PTracker.css'

const firestore = firebase.firestore()
const IssueRef = firestore.collection('issue')
const auth = firebase.auth()

function PTracker() {
    const [user] = useAuthState(auth);
    const query = IssueRef.where('uid', '==', `${auth.currentUser.uid}`)
    const [issues] = useCollectionData(query, {idField: 'id'})
    if(user) {
        return (
            <div className="pTracker">
                {issues && issues.map(iss => <DisplayOwnIssues key={iss.id} issue={iss} />)}
            </div>
        )
    }else {
        return <h1>Hi</h1>
    }
}

function DisplayOwnIssues(props) {
    let {issueTitle, id, photoURL, displayName, issueAbout, isCompleted, dueDate, createdAt} = props.issue

    const handleChecker = async (id) => {
      const BooleanComplete = !isCompleted
      await IssueRef.doc(id).update({isCompleted: BooleanComplete})
      console.log(isCompleted)
    }
    let displayDueDate = new Date(dueDate.seconds * 1000).toLocaleDateString("se-SE")
    //let displayCreatedAt = Date(createdAt.seconds)
    let displayCreatedAt = new Date(createdAt.seconds * 1000).toLocaleDateString("se-SE")
    const removeIssue = async (id) => {
      if(window.confirm(`Are you sure you want to delete id: ${id}`)){
        await IssueRef.doc(id).delete() 
      }
    }
  
    return(
        <div className={`issue`}>
          <div className="imgDiv">
            <img src={photoURL} alt=""/>
            <p>{displayName}</p>
          </div>
          <p className="createdAt">Created: {displayCreatedAt}</p>
          <h1>{issueTitle}</h1>
          <p>{issueAbout}</p>
          <p className="dueDate">Due to: {displayDueDate}</p>
          <div className="checkboxCompleted">
            Completed?<Checkbox 
            checked={isCompleted}
            onChange={() => handleChecker(id)}
            color="primary"/>
    
          </div>
          <div className="removeIssue">
              <button onClick={() => removeIssue(id)}
              disabled={isCompleted === false}
              ><DeleteOutlinedIcon/></button>
          </div>
        </div>
    )
}



export default PTracker
