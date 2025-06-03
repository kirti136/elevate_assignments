import React, { useReducer, useEffect } from 'react';

// --- Initial State ---
const initialState = {
  players: [
    { id: 1, name: 'Player 1', health: 100, inventory: [], skills: [], position: [0, 0], stats: { turns: 0, damage: 0, items: 0 } },
    { id: 2, name: 'Player 2', health: 100, inventory: [], skills: [], position: [4, 4], stats: { turns: 0, damage: 0, items: 0 } }
  ],
  currentPlayerIndex: 0,
  board: Array(5).fill(null).map(() => Array(5).fill(null)),
  obstacles: [[2, 2]],
  collectibles: [[1, 1], [3, 3]],
  phase: 'MOVE', // MOVE -> ATTACK -> END_TURN
  achievements: [],
  history: []
};

// --- Actions ---
const ACTIONS = {
  MOVE_PLAYER: 'MOVE_PLAYER',
  ATTACK: 'ATTACK',
  END_TURN: 'END_TURN',
  SAVE_GAME: 'SAVE_GAME',
  LOAD_GAME: 'LOAD_GAME',
  RESET: 'RESET'
};

// --- Reducer Function ---
function gameReducer(state, action) {
  const { players, currentPlayerIndex, collectibles, phase } = state;
  const currentPlayer = players[currentPlayerIndex];

  switch (action.type) {
    case ACTIONS.MOVE_PLAYER: {
      if (phase !== 'MOVE') return state;
      const newPosition = action.payload;
      if (state.obstacles.some(([x, y]) => x === newPosition[0] && y === newPosition[1])) return state;

      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex] = {
        ...currentPlayer,
        position: newPosition,
        stats: {
          ...currentPlayer.stats,
          turns: currentPlayer.stats.turns + 1
        }
      };

      // Collectible pickup
      const newCollectibles = collectibles.filter(([x, y]) => !(x === newPosition[0] && y === newPosition[1]));
      updatedPlayers[currentPlayerIndex].inventory.push('Item');
      updatedPlayers[currentPlayerIndex].stats.items++;

      return {
        ...state,
        players: updatedPlayers,
        collectibles: newCollectibles,
        phase: 'ATTACK'
      };
    }

    case ACTIONS.ATTACK: {
      if (phase !== 'ATTACK') return state;
      const targetIndex = action.payload;
      const target = players[targetIndex];
      if (!target || targetIndex === currentPlayerIndex) return state;

      const updatedPlayers = [...players];
      updatedPlayers[targetIndex] = {
        ...target,
        health: Math.max(0, target.health - 10)
      };
      updatedPlayers[currentPlayerIndex].stats.damage += 10;

      return {
        ...state,
        players: updatedPlayers,
        phase: 'END_TURN'
      };
    }

    case ACTIONS.END_TURN: {
      const nextIndex = (currentPlayerIndex + 1) % players.length;
      return {
        ...state,
        currentPlayerIndex: nextIndex,
        phase: 'MOVE'
      };
    }

    case ACTIONS.SAVE_GAME: {
      localStorage.setItem('turn-game', JSON.stringify(state));
      return state;
    }

    case ACTIONS.LOAD_GAME: {
      const loaded = JSON.parse(localStorage.getItem('turn-game'));
      return loaded || state;
    }

    case ACTIONS.RESET: {
      return initialState;
    }

    default:
      return state;
  }
}

// --- Main Game Component ---
export default function TurnBasedGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { players, currentPlayerIndex, phase, collectibles, achievements } = state;

  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    if (currentPlayer.stats.damage >= 30 && !achievements.includes('Heavy Hitter')) {
      dispatch({
        type: 'UNLOCK_ACHIEVEMENT',
        payload: 'Heavy Hitter'
      });
    }
  }, [currentPlayer.stats.damage]);

  return (
    <div className="p-4 space-y-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-xl font-bold">Turn-Based Strategy Game</h1>
      <p>Current Turn: {currentPlayer.name}</p>
      <p>Phase: {phase}</p>

      <div className="grid grid-cols-5 gap-2">
        {state.board.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const isPlayer = players.find(p => p.position[0] === rowIndex && p.position[1] === colIndex);
            const isCollectible = collectibles.some(([x, y]) => x === rowIndex && y === colIndex);
            const isObstacle = state.obstacles.some(([x, y]) => x === rowIndex && y === colIndex);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-12 w-12 flex items-center justify-center border ${
                  isPlayer ? 'bg-green-600' : isCollectible ? 'bg-yellow-500' : isObstacle ? 'bg-red-600' : 'bg-gray-700'
                }`}
                onClick={() => dispatch({ type: ACTIONS.MOVE_PLAYER, payload: [rowIndex, colIndex] })}
              >
                {isPlayer ? 'P' : isCollectible ? 'C' : isObstacle ? 'X' : ''}
              </div>
            );
          })
        )}
      </div>

      <div className="space-x-2 mt-4">
        <button onClick={() => dispatch({ type: ACTIONS.ATTACK, payload: (currentPlayerIndex + 1) % 2 })} className="bg-blue-500 px-4 py-2 rounded">
          Attack
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.END_TURN })} className="bg-green-500 px-4 py-2 rounded">
          End Turn
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.SAVE_GAME })} className="bg-purple-500 px-4 py-2 rounded">
          Save
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.LOAD_GAME })} className="bg-yellow-500 px-4 py-2 rounded">
          Load
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.RESET })} className="bg-red-500 px-4 py-2 rounded">
          Reset
        </button>
      </div>

      <div>
        <h2 className="mt-6 font-semibold">Achievements</h2>
        <ul className="list-disc list-inside">
          {achievements.length === 0 ? <li>No achievements yet</li> : achievements.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>
    </div>
  );
}
