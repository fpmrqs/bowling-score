const ScoreCard = require("../public/lib/model/scoreCard");
// const Frame = require("../lib/model/frame");

class frameMock {
  constructor() {
    this.rolls = [];
    this.isDone = false;
    this.isStrike = false;
    this.isSpare = false;
    this.bonus = 0;
  }

  addRoll(roll) { this.rolls.push(roll) }
  getPoints() {return}
}

describe("ScoreCard class", () => {
  let scoreCard;
  beforeEach(() => {
    scoreCard = new ScoreCard(frameMock);
  });

  it("adds pins to the total score", () => {
    const addRollSpy = jest.spyOn(frameMock.prototype, "addRoll")

    scoreCard.addKnockedPins(4);
    expect(addRollSpy).toHaveBeenCalledTimes(1);
  });

  describe("maximum pins", () => {
    it("adds maximum of 10 pins", () => {
      expect(() => scoreCard.addKnockedPins(11)).toThrow(
        "this is a 10 pins bowling game!"
      );
    });

    it("adds maximum of 10 pins across two throws or a frame", () => {
      scoreCard.frames.at(-1).rolls = [6]
      expect(() => scoreCard.addKnockedPins(6)).toThrow(
        "this is a 10 pins bowling game!"
      );
    });
  })

  it("closes frame after strike", () => {
    scoreCard.addKnockedPins(10);
    scoreCard.addKnockedPins(5);
    

    expect(scoreCard.frames.length).toEqual(2);
  });

  describe("tenth frame", () => {
    it("strike on roll 1 lets you roll again", () => {
      for (let i = 0; i < 18; i++) {
        scoreCard.addKnockedPins(4);
      }

      scoreCard.addKnockedPins(10)
      scoreCard.addKnockedPins(5)

      expect(scoreCard.frames.length).toEqual(10);
    });
  })

  describe("adding bonus points", () => {
    it("adds strike bonus to previous frame", () => {

      scoreCard.addKnockedPins(10)
      scoreCard.frames.at(-1).isStrike = true;
      scoreCard.addKnockedPins(5)
      scoreCard.addKnockedPins(4)

      expect(scoreCard.frames.at(-2).bonus).toEqual(9);
    });

    it("adds strike bonus to previous frame", () => {

      scoreCard.addKnockedPins(5)
      scoreCard.addKnockedPins(5)
      scoreCard.frames.at(-1).isSpare = true;
      scoreCard.addKnockedPins(5)
      scoreCard.addKnockedPins(4)

      expect(scoreCard.frames.at(-2).bonus).toEqual(5);
    });
  })
});
