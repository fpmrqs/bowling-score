const Frame = require("../lib/model/frame")

describe("Frame class", () => {

  let frame;
     beforeEach(() => {
       frame = new Frame;
     })

  it("rolls add points to the frame", () => {
    frame.addRoll(4);
    expect(frame.getPoints()).toEqual(4);
  })
})