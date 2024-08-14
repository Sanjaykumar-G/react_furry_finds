import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../axios/UserController'; // Import functions to fetch, delete, and update users
import './UserListPage.css'; // Import necessary styles

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response) {
          setUsers(response);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user.userId);
    setUserName(user.name);
    setUserEmail(user.email);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateUser(editUserId, { name: userName, email: userEmail });
      const updatedUsers = users.map(user => 
        user.userId === editUserId ? { ...user, name: userName, email: userEmail } : user
      );
      setUsers(updatedUsers);
      setEditUserId(null);
    } catch (error) {
      console.error('An error occurred while updating the user:', error);
    }
  };

  return (
    <div className="user-list-container">
      <h1>Registered Users</h1>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUserId && (
        <div className="edit-user-container">
          <h2>Edit User</h2>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder="Name"
          />
          <input 
            type="email" 
            value={userEmail} 
            onChange={(e) => setUserEmail(e.target.value)} 
            placeholder="Email"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditUserId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
