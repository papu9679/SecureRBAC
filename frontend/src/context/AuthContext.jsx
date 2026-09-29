import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const getMe = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/auth/me', {
				credentials: 'include',
			});

			if (!res.ok) {
				setUser(null);
				return;
			}

			const data = await res.json();

			setUser(data.user);
		} catch (error) {
			console.log(error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMe();
	}, []);

	const login = async (email, password) => {
		const res = await fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
			},

			credentials: 'include',

			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message);
		}

		setUser(data.user);

		return data;
	};

	const logout = async () => {
		await fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			credentials: 'include',
		});

		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				logout,
				getMe,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
