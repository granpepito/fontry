import { argv } from 'node:process';
import { writeFile } from 'node:fs/promises';
import fetch from 'node-fetch';

async function fetchFontsData(apiKey) {
	const response = await fetch(
		`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&subset=latin&key=${apiKey}`
	);

	if (!response.ok) {
		return { error: true, status: response.status };
	}
	return await response.json();
}

function buildGoogleFontsQuery(fonts) {
	if (fonts.length > 0) {
		function formatFonts(fonts) {
			return fonts.map((fontData) => {
				const family = fontData.family.replaceAll(' ', '+');

				return `${family}:400`;
			});
		}

		const formattedFonts = formatFonts(fonts);
		const textQuery = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const fontFamiliesQuery = formattedFonts.join('|');

		return `https://fonts.googleapis.com/css?family=${fontFamiliesQuery}&text=${textQuery}`;
	}
	return null;
}

async function fetchFonts(url) {
	try {
		if (url) {
			const response = await fetch(url);

			if (!response.ok) {
				return { status: response.status };
			}
			// return await response.json();
			return response;
		}
		throw new Error('URL is not valid.');
	} catch (error) {
		console.error(error);
	}
}

/**
 * Returns an Object of the fonts grouped by category.
 * @param {Object[]} fontsList
 * @returns {FontDataGroupedByCategory}
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

async function buildStyleSheet(filePath, cssBuffer) {
	console.log(cssBuffer);
	// cssStream
	await writeFile(filePath, cssBuffer);
}

(async function main(apiKey) {
	try {
		if (apiKey) {
			const fontsData = await fetchFontsData(apiKey);
			const groupedFonts = groupFontsByCategory(fontsData.items);

			const categories = Object.keys(groupedFonts);
			categories.forEach(async (category) => {
				const url = buildGoogleFontsQuery(groupedFonts[category]);

				const fontFaces = await fetchFonts(url);
				buildStyleSheet(
					`../src/${category}-fonts.css`,
					await fontFaces.buffer()
				);
			});
		} else {
			throw new Error('API Key is required.');
		}
	} catch (error) {
		console.error(error);
	}
})(argv[2]);

/**
 * @typedef FontDataGroupedByCategory
 * @type {object}
 * @property {import("../src/utils/Font").FontFamily[]} serif - Serif fonts
 * @property {import("../src/utils/Font").FontFamily[]} sans-serif - Serif fonts
 * @property {import("../src/utils/Font").FontFamily[]} display - Serif fonts
 * @property {import("../src/utils/Font").FontFamily[]} handwriting - Serif fonts
 * @property {import("../src/utils/Font").FontFamily[]} monospace - Serif fonts
 */
