// src/pages/admin/Users.jsx

import { useEffect, useState } from 'react';

function Users() {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/admin/users', {
				credentials: 'include',
			});

			const data = await res.json();

			setUsers(data.users);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			<h1>User Management</h1>

			<table border="1">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>{user.name}</td>

							<td>{user.email}</td>

							<td>{user.role}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Users;
