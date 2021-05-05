import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button } from '../components/Button'
import Input from '../components/forms/Input'
import Page from '../components/layout/Page'
import { auth, firestore } from '../firebase'
import { ProtoUser, User } from '../types/User'
import firebase from 'firebase/app'

interface Props {
    start: () => void;
    finish: () => void;
}

const Register = ({ start, finish }: Props) => {

    const history = useHistory();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    const [errors, setErrors] = useState<string[]>([])
    const [errMsg, setErrMsg] = useState('')

    const [pending, setPending] = useState(false)

    const usersRef = firestore.collection('users')

    const submit = async (e: React.FormEvent) => {

        start();

        e.preventDefault();
        let currErrors: string[] = [];

        setPending(false);

        // Check Name
        if(!username) currErrors = [...currErrors, 'name']

        // Check Email
        if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)) currErrors = [...currErrors, 'email']

        if(password !== cpassword) currErrors = [...currErrors, 'password']

        if(!currErrors.length) {

            // Async Time
            try {
                
                const result = await usersRef.doc(username).get();

                if(result.exists) throw new Error("Username Already In Use");

                const authUser = await auth.createUserWithEmailAndPassword(email, password)

                if(!authUser || !authUser.user) throw new Error("Error Creating Account")

                await authUser.user.updateProfile({ displayName: username })

                const user: ProtoUser = {
                    name: username,
                    uuid: authUser.user.uid,
                    joinedOn: firebase.firestore.Timestamp.now()
                }

                await usersRef.doc(username).set(user)

                finish();

            } catch (error) {
                setErrMsg(error.message)
            } finally {
                setPending(false)
            }

        } else {
            setErrors(currErrors);
        }
        
    }

    return (
        <Page title="Register" width="sm">
            <form onSubmit={submit} className="flex flex-col w-full">
                <Input 
                    label="Username"
                    value={username}
                    onChange={val => setUsername(val.replace(/[^A-Za-z0-9_-]/g, ''))}
                    error={errors.includes('name')}
                />
                <Input 
                    label="Email"
                    value={email}
                    onChange={val => setEmail(val)}
                    error={errors.includes('email')}
                />
                <Input 
                    label="Password"
                    value={password}
                    onChange={val => setPassword(val)}
                    error={errors.includes('password')}
                    password
                />
                <Input 
                    label="Confirm Password"
                    value={cpassword}
                    onChange={val => setCPassword(val)}
                    error={errors.includes('password')}
                    password
                />
                <Button color="blue" className="mt-5" disabled={pending}>
                    {pending ? 'Loading...' : 'Register'}
                </Button>
                {errMsg && <div className="text-red-400 text-center">{errMsg}</div>}
            </form>
        </Page>
    )
}

export default Register
