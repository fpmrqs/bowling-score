class DataOutput {
  constructor() {
    this.displayRolls = [];
  }

  addRoll(roll) {
    this.displayRolls.push(roll.toString());

    if (this.#isStandardStrike(roll)) {
      this.displayRolls.push("X");
    } else if (this.#noBonusRoll()) {
      this.displayRolls.push("X");
    }
    console.log(this.displayRolls.slice(-2));
    console.log(this.displayRolls);
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
    return (
      this.displayRolls.length === 20 &&
      this.displayRolls.at(-2) !== "10" &&
      this.displayRolls.at(-1) !== "10"
    );
  }
}

module.exports = DataOutput;
