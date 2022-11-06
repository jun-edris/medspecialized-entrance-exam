import React from 'react';
import User from '../../pages/User';
import Header from './Header';
import Sidebar from './Sidebar';
import './styles/mainlayout.css';

const MainLayout = ({ children }) => {
	return (
		<div className="container">
			<Sidebar />
			<div className="item">
				<Header />
				<main className="main">
					<User />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
