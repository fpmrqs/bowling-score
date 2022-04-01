const DataOutput = require("../lib/model/dataOutput")

describe("DataOutput class", () => {

  let output;
  beforeEach(() => {
    output = new DataOutput;
  });

  it("stores rolls and returns them as strings", () => {
    output.addRoll(4);
    expect(output.getRoll(0)).toEqual("4");
  })

  it("stores X for the second roll when strike", () => {
    output.addRoll(10);
    expect(output.getRoll(1)).toEqual("X");
  })
})