import { useSyncExternalStore } from 'react';

function onWindowResize(onChange) {
	window.addEventListener('resize', onChange);
	return () => window.removeEventListener('resize', onChange);
}

export function useIsLargeScreen(largeLimit = 768) {
	const width = useSyncExternalStore(onWindowResize, () => window?.innerWidth);

	return width >= largeLimit;
}
