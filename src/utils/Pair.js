import Font from './Font';

/**
 * Class representing a pair of fonts.
 */
export default class Pair {
	#font1;
	#font2;
	#theme;

	/**
	 *  Creates a pair of fonts.
	 * @param {Font} font1 - The first font.
	 * @param {Font} font2 - The second font.
	 */
	constructor(font1, font2) {
		this.#font1 = font1;
		this.#font2 = font2;
		this.#theme = ['#FFF', '#000'];
	}

	get font1() {
		return this.#font1;
	}

	get font2() {
		return this.#font2;
	}

	get theme() {
		return this.#theme;
	}

	set font1(font) {
		this.#font1 = font;
	}

	set font2(font) {
		this.#font2 = font;
	}

	set theme(arrayOfColors) {
		this.#theme = [...arrayOfColors];
	}

	/**
	 * Returns an object containing the first and second font of the pair.
	 * @returns {PairObject}
	 */
	toObject() {
		return {
			font1: this.#font1.toObject(),
			font2: this.#font2.toObject(),
			theme: this.#theme,
		};
	}

	/**
	 * Returns a stringified object containing the pair's fonts.
	 * @returns {string}
	 */
	toString() {
		return JSON.stringify(this.toObject());
	}
}

/**
 * @typedef PairObject
 * @type {object}
 * @property {import("./Font").FontObject} font1 - First font of the pair.
 * @property {import("./Font").FontObject} font2 - Second font of the pair.
 * @property {string[]} theme - Theme used to display the pair.
 */
