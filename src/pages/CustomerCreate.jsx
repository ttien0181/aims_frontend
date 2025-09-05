import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomerForm from '../components/CustomerForm'
import { createCustomer } from '../api'

export default function UserCreate() {
  const navigate = useNavigate()

  async function handleCreate(data) {
    try {
      await createCustomer(data)
      navigate('/customers')
    } catch (err) {
      alert('Create failed: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div>
      <h2>Create User</h2>
      <CustomerForm onSubmit={handleCreate} />
    </div>
  )
}