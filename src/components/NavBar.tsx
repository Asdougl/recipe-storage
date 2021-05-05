import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {Button, LinkButton} from './Button'
import { auth } from '../firebase'
import FaIcon from './FaIcon'

interface Props {
    username: string | null | undefined;
}

const NavBar = ({ username }: Props) => {

    const history = useHistory();

    const [open, setOpen] = useState(false)

    const logout = () => {
        auth.signOut()
        history.push('/login')
        setOpen(false)
    }

    return (
        <div className="w-full border-b border-gray-200 px-6 py-4 shadow-sm relative">
            <div className="flex justify-between items-center">
                <div className="md:hidden" onClick={() => setOpen(curr => !curr)}>
                    <FaIcon icon={open ? 'times' : 'bars'} />
                </div>
                <div className="flex gap-1 items-baseline">
                    <Link to="/" className="focus:outline-none focus:ring focus:ring-blue-200 px-2 rounded">
                        <h1 className="text-2xl font-bold">Recipe Storage</h1>
                    </Link>
                    {username !== undefined && <>
                        <Link className="hidden md:block" to="/recipes">
                            Recipes
                        </Link>
                    </>}
                </div>
                <div className="flex gap-1">
                    {username !== undefined ? 
                        <>
                            <LinkButton color="blue" to={`/${username}`} className="flex items-center gap-1">
                                <FaIcon icon="user-circle" />
                                {username ? username : 'User'}
                            </LinkButton>
                            <Button onClick={logout} className="hidden md:flex items-center gap-1">
                                <FaIcon icon="sign-out" />
                                Logout
                            </Button>
                        </>
                    :
                        <>
                            <LinkButton to="/login" color="blue">Login</LinkButton>
                            <LinkButton to="/register">Register</LinkButton>
                        </>
                    }
                </div>
            </div>
            {open && <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 px-6 py-4 shadow-sm z-10">
                <ul className="divide-y divide-gray-200 flex flex-col">
                    <li className="text-lg px-4 py-2" onClick={() => setOpen(false)}>
                        <Link to="/">Dashboard</Link>    
                    </li>  
                    <li className="text-lg px-4 py-2" onClick={() => setOpen(false)}>
                        <Link to="/recipes">Recipes</Link>    
                    </li>  
                    <li className="text-lg px-4 py-2" onClick={() => setOpen(false)}>
                        <Link to="/profile">Profile</Link>    
                    </li>
                </ul>
                { username !== undefined ? <>
                    <Button onClick={logout}>Logout</Button>
                </> : <>
                    <Button>Login</Button> 
                    <Button>Sign Up</Button> 
                </>}
                
            </div>}
        </div>
    )
}

export default NavBar
