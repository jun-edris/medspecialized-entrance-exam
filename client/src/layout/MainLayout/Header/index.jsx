import './styles/header.css';
import { BsArrowLeftRight, BsBell, BsBoxArrowRight } from 'react-icons/bs';
const Header = () => {
	return (
		<div className="header">
			<BsArrowLeftRight color="white" size={20} />
			<button className="button">Switch to Trainee</button>
			<BsBell color="white" size={20} />
			<BsBoxArrowRight color="white" size={20} />
		</div>
	);
};

export default Header;
