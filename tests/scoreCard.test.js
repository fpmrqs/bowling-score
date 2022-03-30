const ScoreCard = require("../lib/model/scoreCard");
// const Frame = require("../lib/model/frame");

class frameMock {
  constructor() {
    this.rolls = [];
    this.isDone = false;
    this.bonus = 0;
  }

  addRoll() { return }
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

  // describe("maximum pins", () => {
  //   it("adds maximum of 10 pins", () => {
  //     expect(() => scoreCard.addKnockedPins(11)).toThrow(
  //       "this is a 10 pins bowling game!"
  //     );
  //   });

  //   it("adds maximum of 10 pins across two throws or a frame", () => {
  //     scoreCard.addKnockedPins(6);
  //     expect(() => scoreCard.addKnockedPins(6)).toThrow(
  //       "this is a 10 pins bowling game!"
  //     );
  //   });
  // })

  // it("closes frame after strike", () => {
  //   scoreCard.addKnockedPins(10);
  //   frameMock.rolls = []
  //   scoreCard.addKnockedPins(5);
  //   console.log(scoreCard.frames)

  //   expect(scoreCard.frames.length).toEqual(2);
  // });

  // describe("tenth frame", () => {
  //   it("strike on roll 1 lets you roll again", () => {
  //     for (let i = 0; i < 9; i++) {
  //       scoreCard.addKnockedPins(5);
  //       scoreCard.addKnockedPins(5);
  //       frameMock.rolls = []
  //     }

  //     scoreCard.addKnockedPins(10)
  //     frameMock.rolls = []
  //     scoreCard.addKnockedPins(5)

  //     expect(scoreCard.frames.length).toEqual(10);
  //   });
  // })
});
