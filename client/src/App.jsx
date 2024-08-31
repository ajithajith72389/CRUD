import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  const [user, setUser] = useState([])
  const [filterdUser, setFilterdUser] = useState([])
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [userData, setUserData] = useState({ name: " ", age: " ", city: " " })


  // Get All the user Details
  const getAllUser = async () => {
    await axios.get("http://localhost:8000/user").then
      ((res) => {
        console.log(res.data)
        setUser(res.data)
        setFilterdUser(res.data)
      })
  };

  useEffect(() => {
    getAllUser()
  }, [])

  // Search function
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase()
    const filterdUser = user.filter((users) =>
      users.name.toLowerCase().includes(searchText) || users.city.toLowerCase().includes(searchText)
    )
    setFilterdUser(filterdUser)
  }

  //Delete User Detail
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/user/${id}`).then((res) => {
      setUser(res.data)
      setFilterdUser(res.data)
    })
  }

  // Add New User Details
  const handleAddUser = () => {
    setUserData({ name: "", age: "", city: "" })
    setIsModelOpen(true)
  }

  const handlechange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userData.id) {
      await axios.patch(`http://localhost:8000/user/${userData.id}`, userData).then((res) => {
        console.log(res.data);
        getAllUser()
      })
    }
    else {
      await axios.post("http://localhost:8000/user", userData).then((res) => {
        console.log(res.data);
        getAllUser()
      })
    }
    closeModel()
    setUserData({ name: "", age: "", city: "" })
  }

  const closeModel = () => {
    setIsModelOpen(false);
    getAllUser()
  }

  //Update User Detail
  const handleUpdate = (user) => {
    setUserData(user)
    setIsModelOpen(true)
  }

  return (
    <>
      <div>
        <h3 className='head'>Sample User Data Display</h3>
      </div>
      <div className='search-container'>
        <input type="search" onChange={handleSearch} className='search-box' placeholder='Search' />
        <button onClick={handleAddUser} className='btn green'>Add User</button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterdUser && filterdUser.map((users, index) => {
            return (
              <tr key={users.id}>
                <td>{index + 1}</td>
                <td>{users.name}</td>
                <td>{users.age}</td>
                <td>{users.city}</td>
                <td><button onClick={() => handleUpdate(users)} className='btn green'>Edit</button></td>
                <td><button onClick={() => handleDelete(users.id)} className='btn red'>Delete</button></td>
              </tr>
            )
          })}

        </tbody>
      </table>
      {isModelOpen && (
        <div className='add-user'>
          <div className='add-user-content'>
            <span onClick={closeModel} className='close' >&times;</span>
            <h3 className='head'>Add New User</h3>

            <div className='user-detail'>
              <div className='input-group'>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' id='name' value={userData.name} onChange={handlechange} />
              </div>
              <div className='input-group'>
                <label htmlFor="age">Age</label>
                <input type="number" name='age' id='age' value={userData.age} onChange={handlechange} />
              </div>
              <div className='input-group'>
                <label htmlFor="city">City</label>
                <input type="text" name='city' id='city' value={userData.city} onChange={handlechange} />
              </div>
              <button className='btn green new-btn' type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App