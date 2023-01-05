"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldUseWhiteText = shouldUseWhiteText;
function getContrastYIQ(hexcolor) {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Determine whether white text should be used on a given background color, based on YIQ contrast.
 *
 * @param {string} backgroundColorHex
 */
function shouldUseWhiteText(backgroundColorHex) {
  var hex = backgroundColorHex.charAt(0) === '#' ? backgroundColorHex.substr(1) : backgroundColorHex;
  return getContrastYIQ(hex) < 128;
}
//# sourceMappingURL=color-utils.js.map