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

  it("pins add to the total score", () => {
    scoreCard.addKnockedPins(4);
    scoreCard.addKnockedPins(4);
    expect(scoreCard.getTotalPoints()).toEqual(8);
  });
});
