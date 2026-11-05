import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	let link = import.meta.env.VITE_BACKEND_URI;

	useEffect(() => {
		let active = true;

		async function fetchMe() {
			try {
				const res = await fetch(`${link}/api/auth/me`, {
					credentials: 'include',
				});

				if (!res.ok) {
					if (active) setUser(null);
					return;
				}

				const data = await res.json();
				if (active) setUser(data.user);
			} catch (error) {
				console.error('Error fetching current user:', error);
				if (active) setUser(null);
			} finally {
				if (active) setLoading(false);
			}
		}

		fetchMe();

		return () => {
			active = false;
		};
	}, []);

	const login = async (email, password) => {
		const res = await fetch(`${link}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || 'Login failed');
		}

		setUser(data.user);
		return data;
	};

	const logout = async () => {
		try {
			await fetch(`${link}/api/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});
		} catch (err) {
			console.error('Logout error:', err);
		} finally {
			setUser(null);
		}
	};

	const updateUser = (newUserData) => {
		setUser((prev) => (prev ? { ...prev, ...newUserData } : newUserData));
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				logout,
				setUser,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthContextProvider');
	}
	return context;
}

export default AuthContextProvider;
