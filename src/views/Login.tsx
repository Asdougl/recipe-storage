import React, { useState } from 'react'
import Input from '../components/forms/Input'
import Page from '../components/layout/Page'
import { Button } from '../components/Button'
import { auth } from '../firebase'

interface Props {
    
}

const Login = (props: Props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [pending, setPending] = useState(false)

    const signIn = (e: React.FormEvent) => {
        setPending(true);
        e.preventDefault();
        auth.signInWithEmailAndPassword(username, password)
            .catch(err => setError(err.code === 'auth/user-not-found' ? 'Incorrect Username or Password' : 'Login Error'))
            .finally(() => setPending(false))
    }

    return (
        <Page title="Login" width="sm">
            <form onSubmit={signIn} className="flex flex-col gap-2">
                <Input 
                    label="Email"
                    value={username} 
                    onChange={val => setUsername(val)}
                    error={!!error}
                />
                <Input 
                    label="Password"
                    value={password} 
                    onChange={val => setPassword(val)}
                    password
                    error={!!error}
                />
                <Button color="blue" className="mt-4" disabled={pending}>
                    {pending ? 'Loading...' : 'Login'}
                </Button>
                {error && <div className="text-red-500 text-center">{error}</div>}
            </form>
        </Page>
    )
}

export default Login
