import React, { useState } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './firebase'
import { UserContext } from './context/UserContext'

import NavBar from './components/NavBar'
import Dashboard from './views/Dashboard'
import Landing from './views/Landing'
import Login from './views/Login'
import Register from './views/Register'
import Recipes from './views/Recipes'
import Config from './views/Config'
import Profile from './views/Profile'
import RecipeInfo from './views/RecipeInfo'
import { User } from './types/User'
import { useDocumentData } from 'react-firebase-hooks/firestore'

interface Props {
    
}

const App = (props: Props) => {

    const [authUser] = useAuthState(auth)

    const [registering, setRegistering] = useState(false)

    return (
        <Router>
            <UserContext.Provider value={authUser}>
                <NavBar username={authUser ? authUser.displayName : undefined} />
                <Switch>
                    <Route exact path="/">
                        { authUser ? <Dashboard /> : <Landing />}
                    </Route>
                    <Route path="/login">
                        { authUser ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/register">
                        { registering || !authUser ? <Register start={() => setRegistering(true)} finish={() => setRegistering(false)} /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/recipes">
                        { authUser ? <Recipes /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/recipe/:recipe">
                        { authUser ? <RecipeInfo /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/settings">
                        { authUser ? <Config /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/:username">
                        <Profile />
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </UserContext.Provider>
        </Router>
    )
}

export default App
