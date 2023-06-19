import { useEffect, useRef, useState } from 'react';
import Keyboard from './Keyboard';
import { useStore, NUMBER_OF_GUESSES, WORD_LENGTH } from './store';
import { isValidWord } from './word-utils';
import WordRow from './WordRow';
import { Modal } from './components/Modal';
import { Toggle } from './components/Toggle';

import { HelpIcon } from './components/Icons/HelpIcon';
import { ChartIcon } from './components/Icons/ChartIcon';

export default function App() {
  const [toggled, setToggled] = useState(false);
  const handleClick = () => {
    setToggled((s) => !s);
  };
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
  let timer: NodeJS.Timeout;

  const background = state.darkMode ? ' bg-[#262B3C]' : 'bg-[#F9F9F9]  ';
  const backgroundHeader = state.darkMode ? ' bg-[#dadce008] ' : ' bg-[#F3F3F3] '
  const colorTitle = state.darkMode ? ' text-[#DADCE0] ' : ' text-[#202537] '
  const textColor = state.darkMode ? ' text-white ' : ' text-dark '

  useEffect(() => {
    if (state.isOver) {
      timer = setInterval(() => {
        state.substractSeconds()
        if (state.seconds === 0) {
          state.substractMinutes()
        }
        if (state.seconds === 0 && state.minutes === 0) {
          state.resetTime()
          state.changeIsOver()
          state.newGame()
        }
      }, 1000)
    }

    return () => clearInterval(timer);
  },)

  const changeLightMode = useStore((s) => s.changeDarkMode)

  const [statusStatisticsModal, setStatusStatisticsModal] = useState(false);
  const [statusHelpModal, setStatusHelpModal] = useState(false);

  const [showInvalidGuess, setInvalidGuess] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1500);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  const statisticModal =
    <Modal status={statusStatisticsModal} >
      <div>
        <h2 className={`text-[35px] font-bold text-center ${textColor}`}>Estadísticas</h2>
      </div>
      <div className={`flex justify-between`}>
        <div className={`flex items-center flex-col`} >
          <span className={`text-[35px] font-bold ${textColor}`} >{state.matchesQuantity}</span>
          <p className={`text-[21px] ${textColor}`} >Jugadas</p>
        </div>
        <div className={`flex items-center flex-col`} >
          <span className={`text-[35px] ${textColor}`} font-bold >{state.victoriesQuantity}</span>
          <p className={`text-[21px] ${textColor}`} >Victorias</p>
        </div>
      </div>


      {state.isOver && (
        <div className={`flex flex-col items-center ${textColor}`}>
          <p className=' text-[19px]'>La palabra era: <b>{state.answer}</b></p><br />
          <p className=' text-[19px]'>SIGUIENTE PALABRA</p>
          <p className=' text-[24px] font-bold '> {state.minutes}:{state.seconds < 10 ? `0${state.seconds}` : state.seconds} </p>
        </div>
      )}

      <div className="flex justify-center" >
        <button onClick={() => setStatusStatisticsModal(false)} className=' text-center bg-[#6AAA64] font-bold text-[28px] rounded-md px-10 py-1 text-white '>
          Aceptar
        </button>
      </div>

    </Modal>

  const helpModal =
    <Modal status={statusHelpModal} >
      <div className={`flex flex-col gap-3 ${textColor}`}>
        <h2 className='text-[35px] font-bold text-center'>Cómo jugar</h2>
        <p>Adivina la palabra oculta en cinco intentos</p>
        <p>Cada intento debe ser una palabra válida de 5 letras.</p>
        <p>Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra </p>
        <b>Ejemplos</b>
        <div className='flex justify-between gap-2 w-[90%] m-[auto]'>
          <div
            className={` rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block bg-[#6AAA64] `}
          >
            G
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            A
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            T
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            O
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            S
          </div>
        </div>

        <p> La letra <b>G</b> está en la palabra y en la posición correcta.</p>

        <div className='flex justify-between gap-2 w-[90%] m-[auto]'>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            V
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            O
          </div>
          <div
            className={` rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block bg-[#CEB02C] `}
          >
            C
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            A
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            L
          </div>
        </div>

        <p> La letra <b>c</b> está en la palabra pero en la  posición incorrecta.</p>

        <div className='flex justify-between gap-2 w-[90%] m-[auto]'>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            C
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            A
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block  `}
          >
            N
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block `}
          >
            T
          </div>
          <div
            className={`border-2 rounded-[5px] p-2 w-[76px] h-[76px] uppercase text-center font-extrabold text-[35px] before:inline-block bg-[#939B9F] `}
          >
            O
          </div>

        </div>
        <p> La letra <b>O</b> no está en la palabra.</p>
        <p>Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>
        <button onClick={() => setStatusHelpModal(false)} className=' text-center bg-[#6AAA64] font-bold text-[28px] rounded-md px-10 py-1 text-white m-auto'>
          ¡JUGAR!
        </button>
      </div>
    </Modal>

  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      if (isValidWord(previousGuess)) {

        setInvalidGuess(false);
        addGuess(previousGuess);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);


  let rows = [...state.rows];

  let currentRow = 0;
  if (rows.length < NUMBER_OF_GUESSES) {
    currentRow = rows.push({ guess }) - 1;
  }

  const guessesRemaining = NUMBER_OF_GUESSES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(''));
  useEffect(() => {
    const isGameOver = state.gameState !== 'playing';
    isGameOver && setStatusStatisticsModal(true)
  }, [state.gameState])
  useEffect(() => {
    if (state.isFirstTime) {
      setStatusHelpModal(true)
      state.changeIsFirstTime()
    }
  }, [state.isFirstTime])
  return (
    <>
      {statisticModal}
      {helpModal}
      <div className={`${background}`}>
        <div className={`mx-auto  max-w-[638px] relative h-screen pt-4`}>
          <header className={` ${backgroundHeader} rounded-[15px] p-4 flex justify-between items-center  `}>
            <div onClick={() => setStatusHelpModal(!statusHelpModal)}> <HelpIcon /> </div>
            <h1 className={`text-[40px] tracking-[.075em] letter font-bold  ${colorTitle} text-center uppercase`}>WORDLE </h1>
            <div className='flex gap-2 items-center'>
              <div onClick={() => setStatusStatisticsModal(!statusStatisticsModal)}> <ChartIcon /> </div>
              <div className=' text-center flex '><Toggle toggled={state.darkMode} onClick={state.changeDarkMode} /></div>
            </div>

          </header>

          <main className="max-w-[70%] m-[auto] grid grid-rows-6 gap-4 my-4">
            {rows.map((word, index) => (
              <WordRow
                key={index}
                word={word.guess}
                result={word.result}
                className={
                  showInvalidGuess && index === currentRow ? 'animate-bounce' : ''
                }
              />
            ))}

          </main>

          <Keyboard
            onClick={(key) => {
              addGuessLetter(key);
            }}
          />
        </div>
      </div>
    </>
  );
}

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState('');
  const addGuessLetter = (letter: string) => {
    letter = letter.toLowerCase()
    setGuess((curGuess) => {
      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
        case 'backspace':
          return newGuess.slice(0, -1);
        case 'enter':
          if (newGuess.length === WORD_LENGTH) {
            return '';
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
