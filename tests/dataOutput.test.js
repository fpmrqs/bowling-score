const DataOutput = require("../public/lib/model/dataOutput");

describe("DataOutput class", () => {
  let output;
  beforeEach(() => {
    output = new DataOutput();
  });

  it("stores rolls and returns them as strings", () => {
    output.addRoll(4);
    expect(output.getRoll(0)).toEqual("4");
  });

  it("stores X for the second roll when strike", () => {
    output.addRoll(10);
    expect(output.getRoll(1)).toEqual("X");
  });
  describe("tenth frame", () => {
    it("stores X for the third roll", () => {
      for (let i = 0; i <= 19; i++) {
        output.addRoll(4);
      }
      expect(output.getRoll(20)).toEqual("X");
    });

    it("If double strike, X is not used for third roll", () => {
      for (let i = 0; i <= 17; i++) {
        output.addRoll(4);
      }
      output.addRoll(10);
      output.addRoll(10);
      output.addRoll(4);

      expect(output.getRoll(20)).toEqual("4");
    });
  });
});
