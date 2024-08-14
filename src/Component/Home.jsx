import React, { useState, useEffect } from 'react';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '' });

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=3')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        setUsers([...users, { id: users.length + 1, ...newUser }]);
        setNewUser({ firstName: '', lastName: '', email: '' });
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>User Management</h1>
            
            <h2>Add New User</h2>
            <div>
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={newUser.firstName} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={newUser.lastName} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={newUser.email} 
                    onChange={handleInputChange} 
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>
            
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;

