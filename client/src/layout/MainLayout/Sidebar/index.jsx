import './styles/sidebar.css';
import { BsChevronCompactLeft } from 'react-icons/bs';
import Navigation from './Navigation';
const Sidebar = () => {
	return (
		<div className="sidebar-container open">
			<div className="logo-container">
				<img
					src="assets/LMClogo.svg"
					alt="Learning Management Center"
					className="logo"
				/>
			</div>
			<div className="user-container">
				<img src="assets/user-default - Copy.svg" alt="User" className="user" />
				<div className="details-container">
					<p className="name">User A</p>
					<span className="role">Admin</span>
				</div>
				<button className="sidebar-switch">
					<BsChevronCompactLeft color="white" size={20} />
				</button>
			</div>

			<div>
				<Navigation />
			</div>
		</div>
	);
};

export default Sidebar;
