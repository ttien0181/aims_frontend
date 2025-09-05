import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCustomers, deleteCustomer } from '../api'

export default function CustomersList() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // Gỡ bỏ sau khi debug xong
  console.log('Customers:', customers);
  console.log('Is customers an array?', Array.isArray(customers));

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    setLoading(true)
    try {
      const res = await getCustomers()
      console.log("Dữ liệu nhận được từ API:", res.data); 
      setCustomers(res.data.results)
      setError(null)
    } catch (err) {
      setCustomers([])
      setError(err.message || 'Failed to fetch') // hiện lỗi , mặc định là Failed ...
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure to delete?')) return
    try {
      await deleteCustomer(id)
      setCustomers(prev => prev.filter(u => u.customerId !== id)) // lọc ra khách hàng đã bị xoá
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div>
      <h2>Customers</h2>
      {/* <div style={{ marginBottom: 12 }}>
        <Link to="/customers/create">Create new customer</Link>
      </div> */}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Address</th>
            <th>Password hash</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(u => (
            <tr key={u.customerId}>
              <td>{u.customerId}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.passwordHash}</td>
              <td>
                <Link to={`/customers/${u.customerId}/edit`} className='btn btn-warning'>
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDelete(u.customerId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}