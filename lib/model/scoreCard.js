const Frame = require("./frame");
const DataOutput = require("./dataOutput");

class ScoreCard {
  constructor(frame = Frame, output = new DataOutput()) {
    this.output = output;
    this.frame = frame;
    this.frames = [new this.frame()];
  }

  addKnockedPins(pins) {
    if (this.#currFrame().isDone) {
      this.frames.push(new this.frame());
    }
    if (this.#currFramePoints() < 10) this.#validateRoll(pins);

    this.#currFrame().addRoll(pins);
    this.output.addRoll(pins);
    this.#closeFrame();
    this.#addBonus();

  }

  #currFrameRolls() {
    return this.frames.at(-1).rolls;
  }

  #currFramePoints() {
    return this.#currFrameRolls().reduce(
      (rollOne, rollTwo) => rollOne + rollTwo,
      0
    );
  }

  #currFrame() {
    return this.frames.at(-1);
  }

  #validateRoll(pins) {
    if (this.#currFramePoints() + pins > 10) {
      throw "this is a 10 pins bowling game!";
    }
  }

  #addBonus() {
    if (this.#currFrame().isDone && this.frames.length > 1) {
      if (this.frames.at(-2).isStrike)
        this.frames.at(-2).bonus += this.#currFramePoints();
      if (this.frames.at(-2).isSpare)
        this.frames.at(-2).bonus += this.#currFrameRolls()[0];
    }
  }

  #closeFrame() {
    if (this.frames.length === 10) {
      if (this.#currFramePoints() % 10 === 0 && this.#currFrameRolls().length === 2) {
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
