const ScoreCard = require("../lib/model/scoreCard");

describe("ScoreCard class", () => {
  let scoreCard;
     beforeEach(() => {
       scoreCard = new ScoreCard;
     })

  it("pins add to the total score", () => {
    scoreCard.addKnockedPins(4);
    scoreCard.addKnockedPins(4);
    expect(scoreCard.getTotalPoints()).toEqual(8);
  });
});
