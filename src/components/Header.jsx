import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import SideBar from './SideBar';

import styles from '/src/assets/styles/header.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export default function Header() {
	const [isSideBarOpen, setSideBarState] = useState(false);

	function openNavBar() {
		if (isSideBarOpen) {
			const openSideBarBtn = document.getElementById('openSideBarBtn');
			openSideBarBtn.focus();
			openSideBarBtn.blur();
		} else {
			const closeSideBarBtn = document.getElementById('closeSideBarBtn');
			closeSideBarBtn.focus();
			closeSideBarBtn.blur();
		}
		setSideBarState(!isSideBarOpen);
	}

	return (
		<>
			<header className={styles.header}>
				<button
					id='openSideBarBtn'
					className={inputStyles.buttonIcon}
					onClick={openNavBar}
				>
					<Bars3Icon className={iconStyles.icon} />
				</button>

				<h1 className={styles.websiteName}>
					<a href='#'>Fontry</a>
				</h1>
				<div
					style={{
						height: '40px',
						width: '36px',
					}}
				></div>
			</header>
			<SideBar handleClick={openNavBar} isOpen={isSideBarOpen} />
		</>
	);
}
