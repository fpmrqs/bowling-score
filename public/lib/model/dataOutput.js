class DataOutput {
  constructor() {
    this.displayRolls = [];
    this.displayFramePoints = [];
  }

  addRoll(roll) {
    this.displayRolls.push(roll.toString());

    if (this.#isStandardStrike(roll) || this.#noBonusRoll()) {
      this.displayRolls.push("X");
    }
  }

  getRoll(index) {
    return this.displayRolls[index];
  }

  #isStandardStrike(roll) {
    return (
      roll === 10 &&
      this.displayRolls.length < 18 &&
      this.displayRolls.length % 2 !== 0
    );
  }

  #noBonusRoll() {
    let lastFramePoints =
      parseInt(this.displayRolls.at(-1)) + parseInt(this.displayRolls.at(-2));

    return this.displayRolls.length === 20 && lastFramePoints % 10 !== 0;
  }
}

module.exports = DataOutput;
