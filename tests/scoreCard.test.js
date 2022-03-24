const ScoreCard = require("../lib/model/scoreCard");
const Frame = require("../lib/model/frame");

jest.mock("../lib/model/frame", () => {
  return jest.fn().mockImplementation(() => {
    return {
      rolls: [],
      points: 0
    }
  })
})

describe("ScoreCard class", () => {
  let scoreCard;
     beforeEach(() => {
       scoreCard = new ScoreCard(Frame);
     })

  it("adds pins to the total score", () => {
    scoreCard.addKnockedPins(4);
    scoreCard.addKnockedPins(4);
    expect(scoreCard.getTotalPoints()).toEqual(8);
  });

  describe("maximum pins", () => {
    it("adds maximum of 10 pins", () => {
      expect(() => scoreCard.addKnockedPins(11)).toThrow(
        "this is a 10 pins bowling game!"
      );
    });
  
    it("adds maximum of 10 pins across two throws or a frame", () => {
      scoreCard.addKnockedPins(6);
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
      scoreCard.addKnockedPins(4)
      expect(scoreCard.frames.length).toEqual(10);
    });
  })

  
});
