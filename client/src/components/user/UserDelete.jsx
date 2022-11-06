import { useRef } from 'react';
import publicFetch from '../../utils/fetch';
import './styles/delete/userDelete.css';
const UserDelete = ({ setShowDeleteModal, id }) => {
	const deleteModalRef = useRef();

	const deleteUser = async () => {
		try {
			const { data } = await publicFetch.delete(`/admin/user/${id}`);

			console.log(data.message);
		} catch (err) {
			console.log(err.response.message);
		}
	};

	return (
		<div ref={deleteModalRef} className="delete-form-overlay">
			<div className="delete-container">
				<div className="form-heading">
					<h2>You sure you want to delete the user?</h2>
				</div>
				<div className="button-container">
					<button onClick={deleteUser}>Delete User</button>
					<button onClick={() => setShowDeleteModal(false)}>Cancel</button>
				</div>
			</div>
		</div>
	);
};

export default UserDelete;
