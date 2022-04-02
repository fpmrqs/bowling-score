const ScoreCard = require('./model/scoreCard.js')

class ScoreCardView {
  constructor(model) {
    this.model = model;
    this.submitButtonEl = document.querySelector('#submit-button')
    this.pinsInputEl = document.querySelector('#pins-input')

    this.submitButtonEl.addEventListener('click', () => {
      this.model.addKnockedPins(parseInt(this.pinsInputEl.value));

      const rolls = this.model.output.displayRolls;
      const totals = this.model.frames.map(frame => { return frame.getPoints() })
      const rollCells = document.querySelectorAll('.roll-points')
      const frameCells = document.querySelectorAll('.frame-points')
      const totalCell = document.querySelector('.total-points')

      for(let i = 0; i < rolls.length; i++) {
        rollCells[i].innerText = rolls[i]
      }

      for(let i = 0; i < totals.length; i++) {
        frameCells[i].innerText = totals[i].toString();
      }

      totalCell.innerText = totals.reduce((sum, points) => sum + points, 0);
    })
  }
}

module.exports = ScoreCardView;