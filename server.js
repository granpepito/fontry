import express from 'express';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config({
	path: '/.env',
});

// app.use(
// 	cors({
// 		origin: 'http://localhost:5173',
// 		credentials: true,
// 		methods: ['GET'],
// 	})
// );

app.get('/fonts', async (_, res) => {
	const fonts = await fetchLatinExtendedGoogleFonts();

	// If data fetching is successful
	if (fonts && fonts.items) {
		const fontsList = groupFontsByCategory(fonts.items);

		res.json(fontsList);
	}

	/**
	 * Get the data from the fonts with the "latin extended" subset available in the Google Fonts library.
	 * @returns {Object} Returns a JSON object
	 */
	async function fetchLatinExtendedGoogleFonts() {
		const { GOOGLE_FONTS_API_KEY } = process.env;

		const response = await fetch(
			`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&subset=latin-ext&key=${GOOGLE_FONTS_API_KEY}`
		);

		if (!response.ok) {
			return { error: true, status: response.status };
		}
		return await response.json();
	}

	/**
	 * Returns an Object of the fonts grouped by category.
	 * @param {Object[]} fontsList
	 * @returns {Object}
	 */
	function groupFontsByCategory(fontsList) {
		const groupedFontsList = fontsList.reduce((groupedFonts, currentFont) => {
			const { category } = currentFont;
			groupedFonts[category] = groupedFonts[category] ?? [];
			groupedFonts[category].push(currentFont);

			return groupedFonts;
		}, {});

		return groupedFontsList;
	}
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening...'));
