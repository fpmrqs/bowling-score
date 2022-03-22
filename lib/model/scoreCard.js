class ScoreCard {
  constructor() {
    this.frames = [];
    this.total = 0;
  }

  addKnockedPins(pins) {
    this.frames.push(pins);
  }

  getTotalPoints() {
    return this.frames.reduce((rollOne, rollTwo) => rollOne + rollTwo, 0);
  }
}

module.exports = ScoreCard;