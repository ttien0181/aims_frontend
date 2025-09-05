import React, { useState, useEffect } from 'react'

export default function CustomerForm({ initialValues = { fullName: '', email: '', rawPassword: '', address: '' }, onSubmit }) {
    const [values, setValues] = useState(initialValues);

  function handleChange(e) { // tạo liên kết 1 chiều từ input tới state
    const { name, value} = e.target // lấy các name và value của trường trong input
    // prev là { fullName: 'Hieu', email: 'test@mail.com' }.
    // { ...prev } tạo ra { fullName: 'Hieu', email: 'test@mail.com' }.
    // [name]: value sẽ trở thành { fullName: 'Hieuy' }, ghi đè giá trị cũ.
    setValues(prev => ({ ...prev, [name]: value })) // ghi đè an toàn
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <label>Full Name</label>
        {/* "value={values.fullName}": liên kết 1 chiều từ state tới input*/}
        {/* "onChange={handleChange}": tạo liên kết 1 chiều khác từ input tới state */}
        <input name="fullName" value={values.fullName} onChange={handleChange} required /> {/* trường phải có; "value={values.fullName}": liên kết từ */}
      </div>
      <div className="form-row">
        <label>Email</label>
        <input name="email" value={values.email} onChange={handleChange} required type="email" />  {/* thêm yêu cầu đúng mẫu email*/}
      </div>
      <div className="form-row">
        <label>Password</label>
        <input name="rawPassword" value={values.rawPassword} onChange={handleChange} required type="password" />{/* password*/}
      </div>
      <div className="form-row">
        <label>Address</label>
        <input name="address" value={values.address} onChange={handleChange} required />{/* address*/}
      </div>
      <div className="form-row">
        <button type="submit" className='btn btn-primary'>Save</button>
      </div>
    </form>
  )
}