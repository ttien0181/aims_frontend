import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CustomerForm from '../components/CustomerForm'
import { getCustomer, updateCustomer } from '../api'

export default function UserEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState({ fullName: '', email: '', rawPassword: '', address: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCustomer(id)
      .then(res => setInitial(res.data))
      .catch(() => alert('Cannot load user'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpdate(data) {
    try {
      await updateCustomer(id, data)
      navigate('/customers')
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message))
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{  
      maxWidth: '50%', // Giới hạn chiều rộng
      margin: '0 auto', // Tự động căn giữa khối theo chiều ngang (margin trên dưới = 0, trái phải là auto)
      padding: '20px' // Thêm khoảng đệm cho nội dung bên trong
    }}>
      <h2>Edit Customer</h2>
      <div  >
        <CustomerForm initialValues={initial} onSubmit={handleUpdate}/>
      </div>
    </div>
  )
}