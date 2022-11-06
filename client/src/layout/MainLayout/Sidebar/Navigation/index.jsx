import { BsFillCaretLeftFill } from 'react-icons/bs';
import navigation from '../../../../constant/navigation';
import './styles/navigation.css';

const Navigation = () => {
	return (
		<>
			<ul className="ul">
				{navigation?.map((nav) => (
					<li
						key={nav?.id}
						className={`nav-list ${nav?.id === 'users' ? 'users' : null}`}
					>
						<div className="nav-details-container ">
							<div className="nav-details">
								{nav?.icon ? (
									<div>{nav?.icon}</div>
								) : (
									<img src={nav?.imgLink} alt={nav?.title} width={25} />
								)}
								<p className="nav-title">{nav?.title}</p>
							</div>

							{nav?.haveChildren && <BsFillCaretLeftFill color="white" />}
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default Navigation;
