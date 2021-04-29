import React from 'react'
import { render } from 'react-dom'
import App from './App'

import './index.css'

const root = document.createElement('div')
root.id = 'root';
document.body.appendChild(root);

render(<App />, document.getElementById('root'))