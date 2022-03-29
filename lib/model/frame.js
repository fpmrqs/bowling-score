class Frame {
  constructor() {
    this.rolls = [];
    this.isDone = false;
    this.bonus = 0;
  }

  addRoll(roll) {
    this.rolls.push(roll);
  }

  getPoints() {
    return this.rolls.reduce((sum, roll) => sum + roll, 0);
  }
}

module.exports = Frame;
