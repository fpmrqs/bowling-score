(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/model/frame.js
  var require_frame = __commonJS({
    "lib/model/frame.js"(exports, module) {
      var Frame = class {
        constructor() {
          this.rolls = [];
          this.isDone = false;
          this.isStrike = false;
          this.isSpare = false;
          this.bonus = 0;
        }
        addRoll(roll) {
          this.rolls.push(roll);
          this.#checkForBonus();
        }
        getPoints() {
          return this.rolls.reduce((sum, roll) => sum + roll, 0) + this.bonus;
        }
        #checkForBonus() {
          if (this.rolls.length === 2 && this.getPoints() === 10) {
            this.isSpare = true;
          }
          if (this.rolls.length === 1 && this.rolls[0] === 10) {
            this.isStrike = true;
          }
          ;
        }
      };
      module.exports = Frame;
    }
  });

  // lib/model/dataOutput.js
  var require_dataOutput = __commonJS({
    "lib/model/dataOutput.js"(exports, module) {
      var DataOutput = class {
        constructor() {
          this.displayRolls = [];
          this.displayFramePoints = [];
        }
        addRoll(roll) {
          this.displayRolls.push(roll.toString());
          if (this.#isStandardStrike(roll) || this.#noBonusRoll()) {
            this.displayRolls.push("X");
          }
        }
        getRoll(index) {
          return this.displayRolls[index];
        }
        #isStandardStrike(roll) {
          return roll === 10 && this.displayRolls.length < 18 && this.displayRolls.length % 2 !== 0;
        }
        #noBonusRoll() {
          let lastFramePoints = parseInt(this.displayRolls.at(-1)) + parseInt(this.displayRolls.at(-2));
          return this.displayRolls.length === 20 && lastFramePoints % 10 !== 0;
        }
      };
      module.exports = DataOutput;
    }
  });

  // lib/model/scoreCard.js
  var require_scoreCard = __commonJS({
    "lib/model/scoreCard.js"(exports, module) {
      var Frame = require_frame();
      var DataOutput = require_dataOutput();
      var ScoreCard2 = class {
        constructor(frame = Frame, output = new DataOutput()) {
          this.output = output;
          this.frame = frame;
          this.frames = [new this.frame()];
        }
        addKnockedPins(pins) {
          if (this.#currFrame().isDone) {
            this.frames.push(new this.frame());
          }
          if (this.#currFramePoints() < 10)
            this.#validateRoll(pins);
          this.#currFrame().addRoll(pins);
          this.output.addRoll(pins);
          this.#closeFrame();
          this.#addBonus();
        }
        #currFrameRolls() {
          return this.frames.at(-1).rolls;
        }
        #currFramePoints() {
          return this.#currFrameRolls().reduce((rollOne, rollTwo) => rollOne + rollTwo, 0);
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
          } else if (this.#currFrameRolls().length === 2 || this.#currFramePoints() === 10) {
            this.#currFrame().isDone = true;
          }
        }
      };
      module.exports = ScoreCard2;
    }
  });

  // lib/scoreCardView.js
  var require_scoreCardView = __commonJS({
    "lib/scoreCardView.js"(exports, module) {
      var ScoreCard2 = require_scoreCard();
      var ScoreCardView2 = class {
        constructor(model2) {
          this.model = model2;
          this.submitButtonEl = document.querySelector("#submit-button");
          this.pinsInputEl = document.querySelector("#pins-input");
          this.submitButtonEl.addEventListener("click", () => {
            this.model.addKnockedPins(parseInt(this.pinsInputEl.value));
            const rolls = this.model.output.displayRolls;
            const totals = this.model.frames.map((frame) => {
              return frame.getPoints();
            });
            const rollCells = document.querySelectorAll(".roll-points");
            const frameCells = document.querySelectorAll(".frame-points");
            const totalCell = document.querySelector(".total-points");
            for (let i = 0; i < rolls.length; i++) {
              rollCells[i].innerText = rolls[i];
            }
            for (let i = 0; i < totals.length; i++) {
              frameCells[i].innerText = totals[i].toString();
            }
            totalCell.innerText = totals.reduce((sum, points) => sum + points, 0);
          });
        }
      };
      module.exports = ScoreCardView2;
    }
  });

  // lib/index.js
  var ScoreCard = require_scoreCard();
  var ScoreCardView = require_scoreCardView();
  var model = new ScoreCard();
  var view = new ScoreCardView(model);
})();
