import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'

interface Props {
    
}

const Landing = (props: Props) => {
    return (
        <Page>
            <Link to="/login">
                Login
            </Link>
            <Link to="/register">
                Register
            </Link>
        </Page>
    )
}

export default Landing
