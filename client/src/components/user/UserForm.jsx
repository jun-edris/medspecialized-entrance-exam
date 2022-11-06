import React, { useRef, useState } from 'react';
import publicFetch from '../../utils/fetch';
import './styles/form/userForm.css';

const UserForm = ({ setShowModal, user }) => {
	const [creds, setCreds] = useState({
		role: Object.keys(user).length !== 0 ? user.role : 'trainer',
		email: Object.keys(user).length !== 0 ? user.email : '',
		password: '',
		name: Object.keys(user).length !== 0 ? user.name : '',
		status: false,
	});
	const modalRef = useRef();

	const updateUser = async (e) => {
		e.preventDefault();
		try {
			const data = await publicFetch.patch(`/admin/user/${user._id}`, creds);
			console.log(data.message);
		} catch (err) {
			console.log(err.response.data.message);
		}
	};

	const submitCreds = async (e) => {
		e.preventDefault();
		try {
			const { data } = await publicFetch.post(`/admin/user`, creds);
			console.log(data.message);
		} catch (err) {
			console.log(err.response.data.message);
		}
	};

	const closeModal = (e) => {
		if (e.target === modalRef.current) {
			setShowModal(false);
		}
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setCreds({ ...creds, [name]: value });
	};

	return (
		<div className="form-overlay">
			<div ref={modalRef} onClick={closeModal} className="form-container">
				<div className="form-heading">
					<h2>{Object.keys(user).length !== 0 ? 'Edit' : 'Invite'} a User</h2>
					<button onClick={() => setShowModal(false)}>X</button>
				</div>
				<div></div>
				<hr />
				<form
					action=""
					method="post"
					onSubmit={(e) => {
						if (Object.keys(user).length !== 0) {
							return updateUser(e);
						}
						if (Object.keys(user).length === 0) {
							return submitCreds(e);
						}
					}}
				>
					<select
						name="role"
						id=""
						value={creds.role}
						onChange={handleChange}
						required
					>
						<option value="admin">Admin</option>
						<option value="trainer">Trainer</option>
						<option value="trainee">Trainee</option>
					</select>
					<label htmlFor="email">E-mail</label>

					<input
						type="email"
						name="email"
						value={creds.email}
						onChange={handleChange}
						required
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={creds.password}
						onChange={handleChange}
						required
					/>

					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						value={creds.name}
						onChange={handleChange}
						required
					/>
					<label htmlFor="status">Status</label>
					<div>
						<input
							type="radio"
							name="status"
							value={true}
							onChange={handleChange}
							required
						/>
						Active
						<input
							type="radio"
							name="status"
							value={false}
							onChange={handleChange}
						/>
						Inactive
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default UserForm;
