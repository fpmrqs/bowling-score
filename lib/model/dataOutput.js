class DataOutput {
  constructor() {
    this.displayRolls = []
  }

  addRoll(roll) {
    this.displayRolls.push(roll.toString())
    if (this.#isStrike(roll)) this.displayRolls.push("X");
  }

  getRoll(index) {
    return this.displayRolls[index];
  }

  #isStrike(roll) {
    return (this.displayRolls.length % 2 !== 0 && roll === 10)
  }
}

module.exports = DataOutput;