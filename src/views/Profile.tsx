import React, { useContext, useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router'
import Page from '../components/layout/Page'
import { UserContext } from '../context/UserContext'
import { firestore } from '../firebase'
import { User } from '../types/User'

interface Props {
    
}

const Profile = (props: Props) => {

    const { username } = useParams<{ username: string }>()

    const authUser = useContext(UserContext)
    const [ownProfile, setOwnProfile] = useState(false)

    const userRef = firestore.collection('users').doc(username)
    const [user, loading, error] = useDocumentData<User>(userRef, { idField: 'username' });

    useEffect(() => {
        setOwnProfile(authUser?.displayName === username)
    },[authUser, username])

    return (
        <Page title="Profile">
            { user ? <h3>{user.username}: {user.name} {ownProfile ? 'You' : 'Someone Else'}</h3> : 'No User'}
        </Page>
    )
}

export default Profile
