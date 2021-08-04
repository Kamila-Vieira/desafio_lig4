import MonteCarlo from './monte-carlo.js'
import Game from './game.js'

const kamilaScript = (scenery, myMove) => {
  scenery = scenery.map(line => line.map(cell => cell === undefined ? cell = 0 : cell === 0 ? cell = -1 : 1))

  let game = new Game(scenery, myMove) 
  let mcts = new MonteCarlo(game)
  
  let state = game.start() 
 
  mcts.runSearch(state, 1) 

  let play = mcts.bestPlay(state, 'max') 
  return play.row
};

export default kamilaScript;
