import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import CustomerList from './pages/CustomerList'
import CustomerCreate from './pages/CustomerCreate'
import CustomerEdit from './pages/CustomerEdit'

export default function App() {
  return (
    <div className="app-container">
    <header className="navbar">
      <div className="navbar-logo">MyApp</div>
      <nav className="navbar-links">
        <Link to="/customers" className="nav-link">Customers</Link>
        <Link to="/customers/create" className="nav-link">Create</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
    </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/customer" replace />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/:id/edit" element={<CustomerEdit />} />
        </Routes>
      </main>
    </div>
  )
}