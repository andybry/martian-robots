function RobotPosition(description) {
  this.x = 0
  this.y = 0
  this.direction = RobotPosition.directions[0]
}

/**
 * @param {string} description format is 'x y orientation'
 * @return {RobotPosition}
 */
RobotPosition.createFromString = function(description) {
  var position = new RobotPosition
  var splitDescription = description.split(' ')
  position.x = Number(splitDescription[0])
  position.y = Number(splitDescription[1])
  position.direction = RobotPosition.directions.indexOf(splitDescription[2])
  return position
}

/**
 * @param {number} xCoord
 * @param {number} yCoord
 * @param {number} directionIndex
 * @returns {RobotPosition}
 */
RobotPosition.create = function(xCoord, yCoord, directionIndex) {
  var position = new RobotPosition
  position.x = Number(xCoord)
  position.y = Number(yCoord)
  position.direction = directionIndex
  return position
}

RobotPosition.directions = ['N', 'E', 'S', 'W']

RobotPosition.prototype.toString = function() {
  return this.x + ' ' + this.y + ' ' + RobotPosition.directions[this.direction]
}

/**
 * @param {RobotPosition} testPosition
 */
RobotPosition.prototype.equals = function(testPosition) {
  return this.toString() === testPosition.toString()
}

module.exports = RobotPosition