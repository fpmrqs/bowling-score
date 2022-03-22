const Frame = require("./frame")

class ScoreCard {
  constructor(frame = Frame) {
    this.frame = frame
    this.frames = []
  }

  addKnockedPins(pins) {
    if(this.frames.length < 1 || this.#currFrameRolls().length === 2) {
      this.frames.push(new this.frame);
    } 

    this.#currFrameRolls().push(pins)
  }

  getTotalPoints() {
    console.log(this.#currFrameRolls());
    return this.#currFrameRolls().reduce((rollOne, rollTwo) => rollOne + rollTwo, 0);
  }

  #currFrameRolls() {
    return this.frames.at(-1).rolls;
  }
}

module.exports = ScoreCard;