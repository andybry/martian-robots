var split = require('split')
var through = require('through')
var Planet = require('./Planet')
var RobotPosition = require('./RobotPosition')
var RobotInstruction = require('./RobotInstruction')
var Robot = require('./Robot')


module.exports = function(inputStream, outputStream) {
  var planet = null
  var currentPosition = null
  inputStream
    .pipe(split())
    .pipe(through(function linesToRobots(line) {
      var currentInstruction
      if(line === '') return
      if(planet) {
        if(currentPosition) {
          currentInstruction = RobotInstruction.createFromString(line)
          this.queue(Robot.create(planet, currentPosition, currentInstruction ))
          currentPosition = null
        } else {
          currentPosition = RobotPosition.createFromString(line)
        }
      } else {
        planet = Planet.createFromString(line)
      }
    }))
    .pipe(through(function processRobots(robot) {
      robot.process()
      this.queue(robot)
    }))
    .pipe(through(function robotsToStrings(robot) {
      this.queue(robot.toString() + '\n')
    }))
    .pipe(outputStream)
}