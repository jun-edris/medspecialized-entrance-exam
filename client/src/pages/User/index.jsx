import './styles/user.css';
import { BsPlus } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import publicFetch from '../../utils/fetch';
import UserForm from '../../components/user/UserForm';
import { AuthContext } from '../../context/AuthContext';
import UserDelete from '../../components/user/UserDelete';

const User = () => {
	const authContext = useContext(AuthContext);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};

	const getUsers = async () => {
		try {
			const { data } = await publicFetch.get(`/users`);
			setUsers(data?.users);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		getUsers();

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div className="user-container">
			<div className="user-heading">
				<h1 className="heading-1">Users</h1>
				{authContext.authState.userInfo.default && (
					<button
						className="user-button"
						onClick={() => {
							openModal();
							setUser({});
						}}
					>
						<BsPlus color="white" size={25} />
						Invite User
					</button>
				)}
			</div>
			<hr />
			<div className="sort-container">
				<select name="" id="">
					<option value="name">Name</option>
				</select>
			</div>
			<div className="table-container">
				<table cellSpacing="0" cellPadding="0">
					<thead>
						<tr>
							<th>Email</th>
							<th>Name</th>
							<th>Status</th>
							<th>Role</th>
							<th>View</th>
							{authContext.authState.userInfo.default && (
								<>
									<th>Update</th>
									<th>Delete</th>
								</>
							)}
						</tr>
					</thead>
					<tbody>
						{users?.map((user, index) => (
							<tr key={index}>
								<td>
									<img src="/assets/user-default.svg" alt="User" width={30} />
									<span>{user?.email}</span>
								</td>
								<td>{user?.name}</td>
								<td>{user?.status ? 'Active' : 'Inactive'}</td>
								<td>{user?.role}</td>
								<td>
									<button>
										<img src="/assets/view.svg" alt="Edit" width={30} />
									</button>
								</td>
								{authContext.authState.userInfo.default && (
									<>
										<td>
											<button
												onClick={() => {
													openModal();
													setUser(user);
												}}
											>
												<img src="/assets/edit.svg" alt="Edit" width={15} />
											</button>
										</td>
										<td>
											<button
												onClick={() => {
													setShowDeleteModal(true);
													setUser(user);
												}}
											>
												<img src="/assets/trash.svg" alt="Delete" width={15} />
											</button>
										</td>
									</>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showModal && <UserForm setShowModal={setShowModal} user={user} />}
			{showDeleteModal && (
				<UserDelete setShowDeleteModal={setShowDeleteModal} id={user._id} />
			)}
		</div>
	);
};

export default User;
