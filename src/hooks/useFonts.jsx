import useSWR from 'swr';
import { groupFontsByCategory } from '../functions/getFonts';
import { Arvo } from '../utils/Arvo';
import { SpaceGrotesk } from '../utils/SpaceGrotesk';
// import { Lotion } from '../utils/Lotion';

const { VITE_GOOGLE_FONTS_API_KEY } = import.meta.env;

export function useFonts() {
	const { data, error, isLoading, mutate } = useSWR(
		`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&subset=latin&key=${VITE_GOOGLE_FONTS_API_KEY}`,
		{
			// revalidateOnMount: false,
			revalidateOnFocus: false,
			// revalidateIfStale: true,
			fallbackData: {
				items: [Arvo, SpaceGrotesk],
			},
		}
	);

	if (data && data.items) {
		const groupedFonts = groupFontsByCategory(data.items);
		console.log('g', groupedFonts);

		try {
			mutate(groupedFonts, { revalidate: false });
		} catch (err) {
			console.error(err);
		}
	}

	return {
		fonts: data,
		isLoading,
		error,
	};
}
