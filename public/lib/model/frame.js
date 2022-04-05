class Frame {
  constructor() {
    this.rolls = [];
    this.isDone = false;
    this.isStrike = false;
    this.isSpare = false;
    this.bonus = 0;
  }

  addRoll(roll) {
    this.rolls.push(roll);
    this.#checkForBonus()
  }

  getPoints() {
    return this.rolls.reduce((sum, roll) => sum + roll, 0) + this.bonus;
  }

  #checkForBonus() {
    if (this.rolls.length === 2 && this.getPoints() === 10) { this.isSpare = true }
    if (this.rolls.length === 1 && this.rolls[0] === 10) { this.isStrike = true };
  }
}

module.exports = Frame;
