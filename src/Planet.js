function Planet() {
  this.xBound = 0
  this.yBound = 0
  this.scents = []
}

/**
 * @param {string} coordinates format of string is 'x y'
 * @return {Planet}
 */
Planet.createFromString = function(coordinates) {
  var bounds = coordinates.split(' ')
  var planet = new Planet
  planet.xBound = Number(bounds[0])
  planet.yBound = Number(bounds[1])
  return planet
}

/**
 * @param {RobotPosition} position
 * @returns {boolean}
 */
Planet.prototype.isOffPlanet = function(position) {
  var isOffX = position.x < 0 || position.x > this.xBound
  var isOffY = position.y < 0 || position.y > this.yBound
  return isOffX || isOffY
}

/**
 * @param {RobotPosition} position
 */
Planet.prototype.addScent = function(position) {
  this.scents.push(position)
}

/**
 * @param {RobotPosition} position
 * @returns {boolean}
 */
Planet.prototype.hasScent = function(testPosition) {
  return this.scents.some(function(position) {
    return position.equals(testPosition)
  })
}

module.exports = Planet