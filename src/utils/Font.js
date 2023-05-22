/**
 *  Class representing a font.
 */
export default class Font {
	#family;
	#category;
	#variants;
	#subsets;

	/**
	 * Create a new font.
	 * @param {string} family - The name of the font.
	 * @param {FontOption} options - Contains other information about the font: its category, its variants and its subsets.
	 */
	constructor(family, options = {}) {
		this.#family = family;
		this.#category = options.category;
		this.#variants = options.variants;
		this.#subsets = options.subsets;
	}

	/**
	 * Checks wether a variant (regular, bold, 900 etc.) of a font is included in the font's variants.
	 * @param {string} variant - Variant to be checked.
	 * @returns {boolean}
	 */
	includesVariant(variant) {
		return this.#variants.includes(variant);
	}

	/**
	 * Returns an object with the properties of the font.
	 * @returns {FontObject}
	 */
	toObject() {
		return {
			family: this.#family,
			category: this.#category,
			variants: this.#variants,
			subsets: this.#subsets,
		};
	}

	/**
	 * Returns a stringified object containing the font's properties.
	 * @returns {string}
	 */
	toString() {
		return JSON.stringify(this.toObject());
	}

	// ---
	// Getters

	get family() {
		return this.#family;
	}

	get category() {
		return this.#category;
	}

	get variants() {
		return this.#variants;
	}

	get subsets() {
		return this.#subsets;
	}

	//---
	// Setters

	set family(familyName) {
		this.#family = familyName;
	}

	set category(category) {
		this.#category = category;
	}

	set variants(variants) {
		this.#variants = variants;
	}

	set subsets(subsets) {
		this.#subsets = subsets;
	}
}

/**
 * @typedef FontOption
 * @type {object}
 * @property {string} category - Category of the font.
 * @property {string[]} variants - Array of variants available.
 * @property {string[]} subsets - Array of subsets .
 */

/**
 * @typedef FontObject
 * @type {object}
 * @property {string} family - Name of the font family.
 * @property {string} category - Category of the font.
 * @property {string[]} variants - Array of variants available.
 * @property {string[]} subsets - Array of subsets.
 * @property {string} [version] - Version of the font family.
 * @property {string} [lastModified] - Date of latest modification.
 * @property {string} [kind] - Kind of font.
 * @property {string} [menu] -
 * @property {object} [files] - URL of the font variants.
 */

export const FontObject = {};
export const FontOption = {};
