import { useEffect, useState } from 'react';
import { ComparisonPanel } from './ComparisonPanel';
import { FontsPanel } from './FontsPanel';
import { usePair } from '../hooks/PairContext';

import styles from '/src/assets/styles/main.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';
import { BookmarkIcon as OutlineBookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/24/solid';

import { usePairStore } from '../hooks/usePairStore';

export function Main() {
	return (
		<main id={styles.mainContent}>
			<article className={styles.pairContainer}>
				<div className={styles.panelsContainer}>
					<FontsPanel />
					<ComparisonPanel />
				</div>
				<SavePairButton />
			</article>
		</main>
	);
}

function SavePairButton() {
	const pair = usePair();
	const { pairs, add, remove, includes } = usePairStore();
	const isPairInPairStore = !!includes(pair);
	const [isSaved, setIsSaved] = useState(isPairInPairStore);

	useEffect(() => {
		setIsSaved(!!includes(pair));
	}, [pair, pairs]);

	function handleClick(e) {
		try {
			const pair = JSON.parse(e.target.dataset.pair);

			if (isSaved) {
				remove(pair);
				setIsSaved(!!includes(pair));
			} else {
				add(pair);
				setIsSaved(!!includes(pair));
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<button
			className={[inputStyles.buttonIcon, styles.savePairButton].join(' ')}
			data-pair={JSON.stringify(pair || '')}
			onClick={handleClick}
		>
			{isSaved ? (
				<SolidBookmarkIcon className={iconStyles.smallIcon} />
			) : (
				<OutlineBookmarkIcon className={iconStyles.smallIcon} />
			)}
		</button>
	);
}
