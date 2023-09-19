import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { SideBar } from './SideBar';

import styles from '/src/assets/styles/header.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';
import { useIsLargeScreen } from '../hooks/useIsLargeScreen';

/**
 * Header of the Website Page.
 * @returns {import 'react'.ReactElement}
 */
export function Header() {
	const [isSideBarOpen, setSideBarState] = useState(false);
	const isLargeScreen = useIsLargeScreen();

	if (isSideBarOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'visible';
	}

	/**
	 * Opens the side bar.
	 */
	function handleSideBarState() {
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

	function closeSideBar() {
		if (!isLargeScreen) {
			const openSideBarBtn = document.getElementById('openSideBarBtn');
			openSideBarBtn.focus();
			openSideBarBtn.blur();
			setSideBarState(false);
		}
	}

	return (
		<div className={styles.headerAndSidebarContainer}>
			<SideBar
				onClick={handleSideBarState}
				onSavePairClick={closeSideBar}
				isOpen={isSideBarOpen}
			/>
			<header className={styles.header}>
				<button
					id='openSideBarBtn'
					type='button'
					name='open-sidebar'
					aria-label='Open Sidebar'
					className={inputStyles.buttonIcon}
					onClick={handleSideBarState}
				>
					<Bars3Icon className={iconStyles.icon} />
				</button>

				<h1 className={styles.websiteName}>
					<a href='#'>Fontsy</a>
				</h1>
				<div></div>
			</header>
		</div>
	);
}
