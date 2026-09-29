// src/pages/admin/AdminDashboard.jsx

import { useEffect, useState } from 'react';

function AdminDashboard() {
	const [stats, setStats] = useState(null);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await fetch('http://localhost:3000/api/admin/stats', {
					credentials: 'include',
				});

				const data = await res.json();

				setStats(data);
			} catch (error) {
				console.log(error);
			}
		};

		getStats();
	}, []);

	if (!stats) {
		return <h2>Loading...</h2>;
	}

	return (
		<div>
			<h1>Admin Dashboard</h1>

			<h3>Total Users: {stats.totalUsers}</h3>

			<h3>Normal Users: {stats.totalNormalUsers}</h3>

			<h3>Admins: {stats.totalAdmins}</h3>
		</div>
	);
}

export default AdminDashboard;
