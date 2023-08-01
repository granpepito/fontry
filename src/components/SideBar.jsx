import { useCallback, useMemo } from 'react';
import { usePairStore } from '../hooks/usePairStore';
import { usePairDispatch } from '../hooks/PairContext';
import {
	XMarkIcon,
	SunIcon,
	MoonIcon,
	BookmarkIcon as OutlineBookmarkIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/outline';
import {
	SunIcon as SunIconSolid,
	MoonIcon as MoonIconSolid,
	BookmarkIcon as SolidBookmarkIcon,
} from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import styles from '/src/assets/styles/sidebar.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

/**
 * Renders the SideBar of the App.
 * @param {{ handleClick: Function, isOpen: boolean}} props
 */
export function SideBar({ handleClick, isOpen }) {
	const sideBarContainerOpen = isOpen ? styles.open : '';
	const { changePair } = usePairDispatch();
	const { pairs, remove } = usePairStore();

	const handleSavedPairClick = useCallback(function handleSavedPairClick(e) {
		try {
			const { id } = e.target.dataset;
			changePair(id);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const savedPairs = useMemo(() => {
		return pairs.map((pair, index) => {
			return (
				<SavedPair
					key={index}
					id={index}
					onClick={handleSavedPairClick}
					firstFontFamily={pair?.font1?.family}
					secondFontFamily={pair?.font2?.family}
				/>
			);
		});
	}, [pairs]);

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
					<ul className={styles.savedPairsList}>
						{pairs.length > 0 ? savedPairs : <InvitationToSavePairs />}
					</ul>
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
 * Component representing a pair that is saved inside the Pair Store.
 * @param {{id: string, firstFontFamily: string, secondFontFamily: string, onClick: Function}} props
 */
function SavedPair({ id, firstFontFamily, secondFontFamily, onClick }) {
	return (
		<li className={styles.savedPair} data-id={id} onClick={onClick}>
			<p>
				1. <span>{firstFontFamily}</span>
			</p>
			<p>
				2. <span>{secondFontFamily}</span>
			</p>
			<button
				className={[inputStyles.buttonIcon, styles.popOverButton].join(' ')}
			>
				<EllipsisVerticalIcon
					className={[iconStyles.icon, styles.ellipsisVertIcon].join(' ')}
				/>
			</button>
		</li>
	);
}

function InvitationToSavePairs() {
	return (
		<li className={styles.invitationToSavePairs}>
			<div className={styles.invitationIcons}>
				<div className={styles.notSavedIcon}>
					<OutlineBookmarkIcon className={iconStyles.icon} />{' '}
					<p>Pas Enregistrée</p>
				</div>
				<div className={styles.arrowRightIcon}>
					<ArrowRightIcon className={iconStyles.smallIcon} />
				</div>
				<div className={styles.savedIcon}>
					<SolidBookmarkIcon className={iconStyles.icon} /> <p>Enregistrée</p>
				</div>
			</div>
			<div className={styles.invitationText}>
				<p>
					Enregistrez les combinaisons que vous trouvez intéressantes !<br />
					Elles seront disponibles juste ici.
				</p>
			</div>
		</li>
	);
}
