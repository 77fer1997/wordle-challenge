import { answerSelector, useStore, WORD_LENGTH } from './store';
import { LetterState } from './word-utils';

interface WordRowProps {
  word: string;
  result?: LetterState[];
  className?: string;
}
export default function WordRow({
  word = '',
  result = [],
  className = '',
}: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - word.length;
  const letters = word.split('').concat(Array(lettersRemaining).fill(''));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value?: string;
  state?: LetterState;
}
function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles =
    state == null
      ? 'rounded-[5px] bg-[#939B9F]/30 text-white'
      : `${characterStateStyles[state]} text-white text-[35px]`;

  return (
    <span
      className={`p-2 uppercase text-center font-extrabold text-[35px] before:inline-block before:content-['_'] ${stateStyles} `}
    >
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: 'rounded-[5px] bg-[#939B9F]',
  [LetterState.Present]: 'rounded-[5px] bg-[#CEB02C]',
  [LetterState.Match]: 'rounded-[5px] bg-[#66A060]',
};
