import { useMemo } from 'react';
import { usePairStore, usePairStoreDispatch } from '../hooks/PairStoreContext';
import { XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import {
	SunIcon as SunIconSolid,
	MoonIcon as MoonIconSolid,
} from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import styles from '/src/assets/styles/sidebar.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

/**
 *
 * @param {{ handleClick: Function, isOpen: boolean}} props
 * @
 * @returns
 */
export function SideBar({ handleClick, isOpen }) {
	const sideBarContainerOpen = isOpen ? styles.open : '';
	const pairStore = usePairStore();
	const { deleteFromPairStore, pairStoreIncludes } = usePairStoreDispatch();

	const savedPairs = useMemo(() => {
		return pairStore.map((pair, index) => {
			return (
				<SavedPair
					key={index}
					id={index}
					firstFontFamily={pair?.font1?.family}
					secondFontFamily={pair?.font2?.family}
				/>
			);
		});
	}, [pairStore]);

	return (
		<>
			<div
				className={[styles.sideBarContainer, sideBarContainerOpen].join(' ')}
				hidden={!isOpen}
			>
				<div className={styles.sideBarTopContainer}>
					<button
						id='closeSideBarBtn'
						className={inputStyles.buttonIcon}
						onClick={handleClick}
					>
						<XMarkIcon className={iconStyles.icon} />
					</button>
					<div className={styles.themeSelectorContainer}></div>
				</div>
				<nav className={styles.sideBarBottomContainer}>
					<h2>Combinaisons Enregistrées</h2>
					<ul className={styles.savedPairsList}>{savedPairs}</ul>
				</nav>
			</div>
			<div
				className={styles.sideBarBackground}
				onClick={handleClick}
				hidden={!isOpen}
			></div>
		</>
	);
}

/**
 *
 * @returns
 */
function ThemeSelector() {
	return (
		<>
			<SunIcon className={[iconStyles.icon, iconStyles.sunIcon].join(' ')} />
			<input className={styles.themeSelector} type='checkbox' />
			<MoonIcon className={[iconStyles.icon, iconStyles.moonIcon].join(' ')} />
		</>
	);
}

/**
 *
 * @param {} param0
 * @returns
 */
function SavedPair({ firstFontFamily, secondFontFamily }) {
	return (
		<li className={styles.savedPair}>
			<p>
				1. <span>{firstFontFamily}</span>
			</p>
			<p>
				2. <span>{secondFontFamily}</span>
			</p>
			<button className={inputStyles.buttonIcon}>
				<EllipsisVerticalIcon
					className={[iconStyles.icon, styles.ellipsisVertIcon].join(' ')}
				/>
			</button>
		</li>
	);
}
