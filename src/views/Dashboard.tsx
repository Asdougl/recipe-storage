import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import QuantityEditor from '../components/forms/QuantityEditor'
import { Ingredient } from '../types/Ingredient'

interface Props {
    
}

const Dashboard = (props: Props) => {

    return (
        <Page title="Feed">
            <code>A Recommendations Feed for your next recipe OR recipes from your friends</code>
        </Page>
    )
}

export default Dashboard
