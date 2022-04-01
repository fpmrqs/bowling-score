const ScoreCard = require('./model/scoreCard.js')

class ScoreCardView {
  constructor(model) {
    this.model = model;
    this.submitButtonEl = document.querySelector('#submit-button')
    this.pinsInputEl = document.querySelector('#pins-input')

    this.submitButtonEl.addEventListener('click', () => {
      this.model.addKnockedPins(parseInt(this.pinsInputEl.value));

      const frames = this.model.frames;
      const totals = this.model.frames.getPoints();
      const rollCells = document.querySelectorAll('.roll-points')
      const frameCells = document.querySelectorAll('.frame-points')
      const totalCell = document.querySelector('.total-points')
      let allRolls = []

      for(let i = 0; i < frames.length; i++) {
        // rollCells[i].innerText = 
        
        
        frames[i],forEach((frame) => {
          frame.rolls.forEach(roll => allRolls.push(roll))
        } );
      }

      for(let i = 0; i < totals.length; i++) {
        frameCells[i].innerText = totals[i].total.toString();
      }

      totalCell.innerText = this.model.getTotalPoints().toString();
    })
  }
}

module.exports = ScoreCardView;