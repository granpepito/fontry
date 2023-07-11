import { useCallback, useSyncExternalStore } from 'react';
import { pairStore } from '../functions/pairStore';

export function usePairStore() {
	const add = useCallback(pairStore.add, []);
	const remove = useCallback(pairStore.remove, []);
	const includes = useCallback(pairStore.includes, []);
	const getLastPair = useCallback(pairStore.getLastPair, []);
	const subscribe = useCallback(pairStore.subscribe, []);
	const getSnapshot = useCallback(
		function getSnapshot() {
			return pairStore.pairs;
		},
		[pairStore.pairs]
	);

	const pairs = useSyncExternalStore(subscribe, getSnapshot);
	// const pairs = useMemo(() => snapshot, [snapshot]);
	return {
		pairs,
		add,
		remove,
		includes,
		getLastPair,
	};
}
