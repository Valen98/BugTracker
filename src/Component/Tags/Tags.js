import React from 'react'
import firebase from '../../Shared/Global/Proivder/Firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const firestore = firebase.firestore()
const TagRef = firestore.collection('tags')

const query = TagRef.orderBy('tag').limit(25)

function Tags() {
    const [tags] = useCollectionData(query, {idField: 'id'})
    console.log(tags)
    return (
        <div>
            {tags && tags.map(tag => <DisplayTags key={tag.id} tags={tag} />)}
        </div>
    )
}

function DisplayTags(props) {
    let {tag} = props.tags 
    //todo: ADD ADDON TAGS FOR EVERY ISSUE
    return (
        <div>
            <h1>{tag}</h1>
        </div>
    )
}

export default Tags
