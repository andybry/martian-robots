/**
 * Returns number modulo mod to work
 * around the lack of modulo operator.
 *
 * @param {number} number
 * @param {number} mod
 * @returns {number}
 */
module.exports = function(number, mod) {
  return ((number % mod) + mod) % mod
}