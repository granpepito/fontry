import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { SideBar } from './SideBar';

import styles from '/src/assets/styles/header.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

/**
 * Header of the Website Page.
 * @returns {import 'react'.ReactElement}
 */
export function Header() {
	const [isSideBarOpen, setSideBarState] = useState(false);

	/**
	 * Opens the side bar.
	 */
	function openSideBar() {
		// Add focus on the element that will be visible and then remove it.
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
			<SideBar handleClick={openSideBar} isOpen={isSideBarOpen} />
			<header className={styles.header}>
				<button
					id='openSideBarBtn'
					className={inputStyles.buttonIcon}
					onClick={openSideBar}
				>
					<Bars3Icon className={iconStyles.icon} />
				</button>

				<h1 className={styles.websiteName}>
					<a href='#'>Fonts</a>
				</h1>
				<div></div>
			</header>
		</>
	);
}
