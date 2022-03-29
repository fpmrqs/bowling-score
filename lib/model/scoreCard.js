const Frame = require("./frame");

class ScoreCard {
  constructor(frame = Frame) {
    this.frame = frame;
    this.frames = [];
  }

  addKnockedPins(pins) {
    if (this.frames.length < 1 || this.#currFrame().isDone) {
      this.frames.push(new this.frame());
    } 
    
    if (this.frames.length === 10) {
      if (this.#currFrameRolls().length === 0) this.#validateRoll(pins);
      
      if (this.#currFrameRolls().length === 1) {
        this.#currFrame().addRoll(pins);
        this.frames.at(-1).points += pins;
      } else if (this.#currFrameRolls().length === 2){
        if (this.#currFrameRolls() === [10, 10]) {
          this.#currFrame().addRoll(pins);
          this.frames.at(-1).points += pins;
        }
    } 
  } else {
    this.#validateRoll(pins);
    this.#currFrame().addRoll(pins);
    this.frames.at(-1).points += pins;
    this.#closeFrame();
  }
}

  getTotalPoints() {
    return this.#currFrameRolls().reduce(
      (rollOne, rollTwo) => rollOne + rollTwo,
      0
    );
  }

  #currFrameRolls() {
    return this.frames.at(-1).rolls;
  }

  #currFramePoints() {
    return this.frames.at(-1).points;
  }

  #currFrame() {
    return this.frames.at(-1);
  }

  #validateRoll(pins) {
    if (this.#currFramePoints() + pins > 10) {
      throw "this is a 10 pins bowling game!";
    }
  }

  #tenthFrameStrike() {
    this.#currFrameRolls().forEach(roll => { if (roll !== 10) return false }); 
  }

  #closeFrame() {
    if (this.frames.length === 10) {
      if (this.#currFramePoints() < 20 && this.#currFrameRolls().length === 2) {
        this.#currFrame().isDone = true;
      } else if (this.#currFrameRolls().length === 3) {
        this.#currFrame().isDone = true;
      }
    } else if (
      this.#currFrameRolls().length === 2 ||
      this.#currFramePoints() === 10
    ) {
      this.#currFrame().isDone = true;
    }
  }
}

module.exports = ScoreCard;
