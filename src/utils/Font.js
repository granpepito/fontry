/**
 * @typedef FontFamily
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
export const Font = {};

/**
 * @typedef FontsByCategory
 * @type {object}
 * @property {FontFamily[]} serif Serif fonts.
 * @property {FontFamily[]} sans-serif Sans-serif fonts.
 * @property {FontFamily[]} display Display fonts.
 * @property {FontFamily[]} handwriting Handwriting fonts.
 * @property {FontFamily[]} monospace Monospace fonts.
 */
export const FontsByCategory = {};
