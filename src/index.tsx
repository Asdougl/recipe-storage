import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faBookmark, faCheck, faPencil, faPlay, faPlus, faSave, faShoppingBasket, faSignOut, faSpinnerThird, faStopwatch, faTimes, faTrash, faUserCircle } from '@fortawesome/pro-light-svg-icons'

library.add(faBars, faTimes, faPencil, faPlay, faBookmark, faCheck, faTimes, faStopwatch, faShoppingBasket, faSave, faPlus, faSpinnerThird, faUserCircle, faSignOut, faTrash)

const root = document.createElement('div')
root.id = 'root';
document.body.appendChild(root);

render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'))