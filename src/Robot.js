var RobotPosition = require('./RobotPosition')
var modulo = require('./modulo')

function Robot() {
  this.planet = null
  this.position = null
  this.instruction = null
  this.isLost = false
}

/**
 * @param {Planet} planet
 * @param {RobotPosition} initialPosition
 * @param {RobotInstruction} instruction
 * @returns {Robot}
 */
Robot.create = function(planet, initialPosition, instruction) {
  var robot = new Robot
  robot.planet = planet
  robot.position = initialPosition
  robot.instruction = instruction
  return robot
}

Robot.prototype.toString = function() {
  var positionAsString = this.position.toString()
  var robotAsString = positionAsString
  if(this.isLost) {
    robotAsString = positionAsString + ' LOST'
  }
  return robotAsString
}

Robot.prototype.process = function() {
  var self = this
  this.instruction.instructions.forEach(function(instruction) {
    switch(instruction) {
      case 'L':
        self.turnLeft()
        break
      case 'R':
        self.turnRight()
        break
      case 'F':
        self.moveForward()
        break
    }
  })
}

Robot.prototype.turnLeft = function() {
  this.position = RobotPosition.create(
    this.position.x,
    this.position.y,
    modulo(this.position.direction - 1, RobotPosition.directions.length)
  )
}

Robot.prototype.turnRight = function() {
  this.position = RobotPosition.create(
    this.position.x,
    this.position.y,
    modulo(this.position.direction + 1, RobotPosition.directions.length)
  )
}

Robot.prototype.moveForward = function() {
  if(this.isLost || this.planet.hasScent(this.position)) return
  var oldLastPosition = this.position
  switch(this.position.direction) {
    case RobotPosition.directions.indexOf('N'):
      this.position = RobotPosition.create(
        this.position.x,
        Number(this.position.y) + 1,
        this.position.direction
      )
      break
    case RobotPosition.directions.indexOf('E'):
      this.position = RobotPosition.create(
        this.position.x + 1,
        this.position.y,
        this.position.direction
      )
      break
    case RobotPosition.directions.indexOf('S'):
      this.position = RobotPosition.create(
        this.position.x,
        this.position.y - 1,
        this.position.direction
      )
      break
    case RobotPosition.directions.indexOf('W'):
      this.position = RobotPosition.create(
        this.position.x - 1,
        this.position.y,
        this.position.direction
      )
      break
  }
  if(this.planet.isOffPlanet(this.position)) {
    this.isLost = true
    this.position = oldLastPosition
    this.planet.addScent(this.position)
  }
}

module.exports = Robot