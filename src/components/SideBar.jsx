import { useCallback, useState } from 'react';
import { usePairStore } from '../hooks/usePairStore';
import { usePairDispatch } from '../hooks/PairContext';
import {
	XMarkIcon,
	// SunIcon,
	// MoonIcon,
	BookmarkIcon as OutlineBookmarkIcon,
	ArrowRightIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import {
	// SunIcon as SunIconSolid,
	// MoonIcon as MoonIconSolid,
	BookmarkIcon as SolidBookmarkIcon,
} from '@heroicons/react/24/solid';
// import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import styles from '/src/assets/styles/sidebar.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

/**
 * Renders the SideBar of the App.
 * @param {{ handleClick: Function, isOpen: boolean}} props
 */
export function SideBar({ handleClick, isOpen }) {
	const sideBarContainerOpen = isOpen ? styles.open : '';
	const [checkboxesEnabled, setCheckboxesEnabled] = useState(false);
	const [pairsToDelete, setPairsToDelete] = useState([]);
	const { changePair } = usePairDispatch();
	const { pairs, removePairsByIndex } = usePairStore();
	const hideEnableCheckboxesButtonClassName = checkboxesEnabled
		? styles.hide
		: '';
	const hideOtherActionButtonsClassName = !checkboxesEnabled ? styles.hide : '';

	function handleCheckboxesEnabled() {
		setCheckboxesEnabled(!checkboxesEnabled);
	}

	const handleSavedPairClick = useCallback(
		function handleSavedPairClick(e) {
			const { index } = e.target.dataset;
			changePair(index);
		},
		[changePair]
	);

	const handleDeletableChange = useCallback(
		(e) => {
			const { value, checked } = e.target;

			if (checked) {
				setPairsToDelete([...pairsToDelete, value]);
			} else {
				setPairsToDelete(pairsToDelete.filter((id) => id != value));
			}
		},
		[pairsToDelete]
	);

	function handleDeleteSavedPairs() {
		if (pairsToDelete.length > 0) {
			const toDelete = pairsToDelete.sort();

			removePairsByIndex(toDelete);

			setPairsToDelete([]);
			setCheckboxesEnabled(false);
		}
	}

	const savedPairs = pairs.map((pair, index) => {
		return (
			<SavedPair
				key={pair?.id}
				index={index}
				firstFontFamily={pair?.font1?.family}
				secondFontFamily={pair?.font2?.family}
				checked={pairsToDelete.includes(index)}
				deletable={checkboxesEnabled}
				isSidebarOpen={isOpen}
				onClick={handleSavedPairClick}
				onChange={handleDeletableChange}
			/>
		);
	});

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
						disabled={!isOpen}
					>
						<XMarkIcon className={iconStyles.icon} />
					</button>
					<div className={styles.themeSelectorContainer}></div>
				</div>
				<nav className={styles.sideBarBottomContainer}>
					<h2>Combinaisons Enregistrées</h2>
					{/* TODO: Add animations */}
					<div className={styles.savedPairsActions}>
						<div className={hideOtherActionButtonsClassName}>
							<button
								className={[
									inputStyles.button,
									styles.disableCheckboxesBtn,
								].join(' ')}
								onClick={handleCheckboxesEnabled}
								disabled={!isOpen || pairs.length === 0 || !checkboxesEnabled}
							>
								Annuler
							</button>
							<button
								className={[
									inputStyles.buttonIcon,
									inputStyles.button,
									styles.deletePairsBtn,
								].join(' ')}
								onClick={handleDeleteSavedPairs}
								disabled={!isOpen || pairs.length === 0 || !checkboxesEnabled}
							>
								Supprimer{' '}
								<TrashIcon className={iconStyles.xxSmallIcon} color='#FF000' />
							</button>{' '}
						</div>
						<div className={hideEnableCheckboxesButtonClassName}>
							<button
								className={[
									inputStyles.button,
									styles.enableCheckboxesBtn,
								].join(' ')}
								onClick={handleCheckboxesEnabled}
								disabled={!isOpen || pairs.length === 0 || checkboxesEnabled}
							>
								Sélectionner
							</button>
						</div>
					</div>
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
// function ThemeSelector() {
// 	return (
// 		<>
// 			<SunIcon className={[iconStyles.icon, iconStyles.sunIcon].join(' ')} />
// 			<input className={styles.themeSelector} type='checkbox' />
// 			<MoonIcon className={[iconStyles.icon, iconStyles.moonIcon].join(' ')} />
// 		</>
// 	);
// }

/**
 * Component representing a pair that is saved inside the Pair Store.
 * @param {{index: string, firstFontFamily: string, secondFontFamily: string, onClick: Function}} props
 */
function SavedPair({
	index: index,
	firstFontFamily,
	secondFontFamily,
	checked,
	deletable,
	isSidebarOpen,
	onClick,
	onChange,
}) {
	const [isChecked, setIsChecked] = useState(checked);
	const deleteCheckboxClassNames = deletable
		? styles.deletable
		: styles.notDeletable;

	function handleCheck(e) {
		const { checked } = e.target;
		setIsChecked(checked);
		onChange(e);
	}

	return (
		<li>
			<input
				className={deleteCheckboxClassNames}
				type='checkbox'
				id={`delete-${index}`}
				value={index}
				checked={isChecked}
				onChange={handleCheck}
				disabled={!isSidebarOpen || !deletable}
			/>
			<div className={styles.savedPair} data-index={index} onClick={onClick}>
				<p>
					1. <span>{firstFontFamily}</span>
				</p>
				<p>
					2. <span>{secondFontFamily}</span>
				</p>
			</div>
		</li>
	);
}

/**
 * Renders a prompt for the user to start saving pairs.
 */
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
