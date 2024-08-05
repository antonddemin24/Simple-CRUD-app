import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Subscriptions from './components/Subscriptions'
import Preferences from './components/Preferences'
import Users from './components/Users'



function App() {

  return (
    <div className="App">
      <h1>Subscriptions</h1>
      <Router>
        <nav>
          <ul>
            <li><Link to="/subscriptions">Subscriptions</Link></li>
            <li><Link to="/preferences">Preferences</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App