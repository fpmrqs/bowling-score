const Frame = require("../public/lib/model/frame")

describe("Frame class", () => {

  let frame;
     beforeEach(() => {
       frame = new Frame;
     })

  it("rolls add points to the frame", () => {
    frame.addRoll(4);
    expect(frame.getPoints()).toEqual(4);
  })

  it("frame records strike", () => {
    expect(frame.isStrike).toEqual(false);
    frame.addRoll(10);
    expect(frame.isStrike).toEqual(true);
  })

  it("frame records spare", () => {
    expect(frame.isSpare).toEqual(false);
    frame.addRoll(4);
    frame.addRoll(6);
    expect(frame.isSpare).toEqual(true);
  })
})