import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import './BugTracker.css'
import SortBy from './SortBy'

import firebase from '../../Shared/Global/Proivder/Firebase'
import 'firebase/firestore'
import 'firebase/auth'

import { useCollectionData } from 'react-firebase-hooks/firestore'


const auth = firebase.auth()
const firestore = firebase.firestore()
const IssueRef = firestore.collection('issue')

function BugTracker() {
    const query = IssueRef.orderBy('createdAt')
    const [issues] = useCollectionData(query, {idField: 'id'})

    const [issueTitle, setIssueTitle ] = useState('')
  
    const [issueAbout, setIssueAbout] = useState('')

    const [dueDate, setDueDate] = useState({})

    let isCompleted = false
  
    const sendIssue = async(e) => {
      e.preventDefault()
  
      const {uid, photoURL, email, displayName } = auth.currentUser
  
      await IssueRef.add({
        issueTitle: issueTitle,
        issueAbout: issueAbout,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        email,
        displayName,
        photoURL,
        isCompleted,
        dueDate: new Date(dueDate)
      })
      setIssueTitle('')
      setIssueAbout('')
  
    }
  
    return (
      <div className="issueForm">
        <form onSubmit={sendIssue}>
          <TextField id="outlined-basic" variant="outlined" label="Issue" value={issueTitle}  onChange={(e) => setIssueTitle(e.target.value)} autoComplete="off" className="issueTitle"/>
          <TextareaAutosize aria-label="" rowsMin={3} placeholder="About the issue" onChange={(e) => setIssueAbout(e.target.value)} autoComplete="off" className="textArea"/>

          <TextField 
            id="dueDate"
            label="Due Date"
            type="date"
            value={dueDate}
            className="datePicker"
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
            
          <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon></SendIcon>}
          className="submitButton"
          type="submit"
          disabled={!issueTitle}
            >Post
        </Button>
        </form>
        <section className="sectionIssue">
            <SortBy/>

          {issues && issues.map(iss => <DisplayIssues key={iss.id} issue={iss} />)}
        </section>
      </div>
    )
  }
  
function DisplayIssues(props) {
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



  export default BugTracker