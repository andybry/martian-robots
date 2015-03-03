function RobotInstruction(description) {
  this.instructions = []
}

/**
 * @param {string} description format is a list of one letter instructions
 * @returns {RobotInstruction}
 */
RobotInstruction.createFromString = function(description) {
  var instruction = new RobotInstruction
  instruction.instructions = description.split('')
  return instruction
}

module.exports = RobotInstruction