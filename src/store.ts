import create from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWord, LetterState } from './word-utils';


export const NUMBER_OF_GUESSES = 5;
export const WORD_LENGTH = 5;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  isOver: boolean;
  victoriesQuantity: number;
  matchesQuantity: number;
  isFirstTime: boolean;
  darkMode: boolean;
  gameState: 'playing' | 'won' | 'lost';
  keyboardLetterState: { [letter: string]: LetterState };
  seconds: number;
  minutes: number;
  addGuess(guess: string): void;
  changeDarkMode(): void;
  changeIsOver(): void;
  changeIsFirstTime(): void;
  newGame(initialGuess?: string[]): void;
  substractMinutes(): void;
  substractSeconds(): void;
  resetTime(): void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => {
      const addGuess = (guess: string) => {
        const result = computeGuess(guess, get().answer)
        const victoriesQuantity = get().victoriesQuantity
        const matchesQuantity = get().matchesQuantity
        const rows = get().rows.concat({
          guess,
          result,
        })
        const didWin = result.every((r) => r === LetterState.Match)

        const keyboardLetterState = get().keyboardLetterState
        result.forEach((r, index) => {
          const resultGuessLetter = guess[index]

          const currentLetterState = keyboardLetterState[resultGuessLetter]
          switch (currentLetterState) {
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }
            default:
              keyboardLetterState[resultGuessLetter] = r
              break;
          }
        })
        set({
          rows,
          keyboardLetterState,
          gameState: didWin
            ? 'won'
            : rows.length === NUMBER_OF_GUESSES
              ? 'lost'
              : 'playing',
          victoriesQuantity: didWin ? victoriesQuantity + 1 : victoriesQuantity,
          matchesQuantity: didWin || rows.length === NUMBER_OF_GUESSES ? matchesQuantity + 1 : matchesQuantity,
          isOver: didWin || rows.length === NUMBER_OF_GUESSES ? true : false
        })

      }
      const changeDarkMode = () => {
        const darkMode = get().darkMode
        set({ darkMode: !darkMode })
      }
      const changeIsOver = () => {
        set({ isOver: false })
      }
      const changeIsFirstTime = () => {
        set({ isFirstTime: false })
      }
      const substractMinutes = () => {
        const minutes = get().minutes;
        set({
          minutes: minutes - 1,
          seconds: 59,
        })
      }
      const substractSeconds = () => {
        const seconds = get().seconds;
        set({ seconds: seconds - 1 })
      }
      const resetTime = () => {
        set({
          minutes: 4,
          seconds: 59,
        })
      }
      return {
        answer: getRandomWord(),
        rows: [],
        gameState: 'playing',
        keyboardLetterState: {},
        victoriesQuantity: 0,
        matchesQuantity: 0,
        isOver: false,
        darkMode: true,
        isFirstTime: true,
        seconds: 59,
        minutes: 4,
        changeDarkMode,
        addGuess,
        changeIsFirstTime,
        changeIsOver,
        substractMinutes,
        substractSeconds,
        resetTime,
        newGame(initialRows = []) {
          set({
            gameState: 'playing',
            answer: getRandomWord(),
            rows: [],
            keyboardLetterState: {},
          })

          initialRows.forEach(addGuess)
        },
      }
    },
    {
      name: 'reacdle',
      getStorage: () => localStorage,
    }
  )
)

// useStore.persist.clearStorage();

export const answerSelector = (state: StoreState) => state.answer;
