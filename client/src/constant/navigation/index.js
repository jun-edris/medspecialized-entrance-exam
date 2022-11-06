import {
	BsBarChart,
	BsBarChartLine,
	BsCardList,
	BsFillMegaphoneFill,
	BsFolder,
	BsPeople,
	BsPerson,
	BsQuestionSquare,
} from 'react-icons/bs';

const navigation = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		imgLink: '/assets/dashboard-white.svg',
	},
	{
		id: 'career',
		title: 'Career Path',
		imgLink: '/assets/career-white.svg',
	},
	{
		id: 'learning',
		title: 'Learning Path',
		icon: <BsBarChartLine size={25} color="white" />,
	},
	{
		id: 'assesments',
		title: 'Assesments',
		icon: <BsCardList size={25} color="white" />,
		haveChildren: true,
	},
	{
		id: 'module',
		title: 'Module Library',
		icon: <BsFolder size={25} color="white" />,
	},
	{
		id: 'teams',
		title: 'Teams',
		icon: <BsPeople size={25} color="white" />,
	},
	{
		id: 'users',
		title: 'Users',
		link: '/users',
		icon: <BsPerson size={25} color="white" />,
	},
	{
		id: 'reports',
		title: 'Reports',
		icon: <BsBarChart size={25} color="white" />,
	},
	{
		id: 'profile',
		title: 'Profile',
		imgLink: '/assets/user-default - Copy.svg',
	},
	{
		id: 'help',
		title: 'Help and Feedback',
		icon: <BsQuestionSquare size={25} color="white" />,
	},
	{
		id: 'new',
		title: "What's New",
		icon: <BsFillMegaphoneFill size={25} color="white" />,
	},
];

export default navigation;
