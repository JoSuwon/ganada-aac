'use client';

import { useState } from 'react';
import { CONSONANTS, VOWELS, InputType } from './constants';
import Hangul from 'hangul-js';

export default function Home() {
  const [inputType, setInputType] = useState<InputType | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentChars, setCurrentChars] = useState<string[]>([]);

  const handleTypeSelect = (type: InputType) => {
    setInputType(type);
    setSelectedGroup(null);
  };

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
  };

  const handleCharacterSelect = (char: string) => {
    setCurrentChars(prev => [...prev, char]);
    const combined = Hangul.assemble(currentChars.concat(char));
    setCurrentWord(combined);
    setInputType(null);
    setSelectedGroup(null);
  };

  const handleBack = () => {
    if (selectedGroup) {
      setSelectedGroup(null);
    } else if (inputType) {
      setInputType(null);
    }
  };

  const handleDelete = () => {
    setCurrentChars(prev => prev.slice(0, -1));
    const combined = Hangul.assemble(currentChars.slice(0, -1));
    setCurrentWord(combined);
  };

  const renderGroups = () => {
    if (!inputType || selectedGroup) return null;
    
    const groups = inputType === 'consonant' ? CONSONANTS : VOWELS;
    const groupEntries = Object.entries(groups);
    
    return (
      <div className="flex flex-col gap-4 relative">
        {groupEntries.map(([groupName, characters], index) => (
          <div key={groupName} className="relative">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
              {index + 1}
            </div>
            <button
              onClick={() => handleGroupSelect(groupName)}
              className="w-full p-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-3xl"
            >
              {characters.join(' ')}
            </button>
          </div>
        ))}
        <div className="relative">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
            {groupEntries.length + 1}
          </div>
          <button
            onClick={handleBack}
            className="w-full p-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-2xl"
          >
            뒤로가기
          </button>
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
            {groupEntries.length + 2}
          </div>
          <button
            onClick={handleDelete}
            className="w-full p-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-2xl"
          >
            지우기
          </button>
        </div>
      </div>
    );
  };

  const renderCharacters = () => {
    if (!selectedGroup || !inputType) return null;
    
    const characters = inputType === 'consonant' 
      ? CONSONANTS[selectedGroup as keyof typeof CONSONANTS]
      : VOWELS[selectedGroup as keyof typeof VOWELS];

    return (
      <div className="flex flex-col gap-4 relative">
        {characters.map((char, index) => (
          <div key={char} className="relative">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
              {index + 1}
            </div>
            <button
              onClick={() => handleCharacterSelect(char)}
              className="w-full p-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-4xl"
            >
              {char}
            </button>
          </div>
        ))}
        <div className="relative">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
            {characters.length + 1}
          </div>
          <button
            onClick={handleBack}
            className="w-full p-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-2xl"
          >
            뒤로가기
          </button>
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
            {characters.length + 2}
          </div>
          <button
            onClick={handleDelete}
            className="w-full p-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-2xl"
          >
            지우기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">의사소통 도우미</h1>
        
        <div className="mb-8 p-4 bg-slate-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-white">현재 입력: {currentWord}</h2>
          <p className="text-lg text-gray-300">선택된 자모: {currentChars.join(' ')}</p>
        </div>

        {!inputType && (
          <div className="flex flex-col gap-4 relative">
            <div className="relative">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
                1
              </div>
              <button
                onClick={() => handleTypeSelect('consonant')}
                className="w-full p-6 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-3xl"
              >
                자음 선택
              </button>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
                2
              </div>
              <button
                onClick={() => handleTypeSelect('vowel')}
                className="w-full p-6 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-3xl"
              >
                모음 선택
              </button>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg">
                3
              </div>
              <button
                onClick={handleDelete}
                className="w-full p-6 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-2xl"
              >
                지우기
              </button>
            </div>
          </div>
        )}

        {renderGroups()}
        <div className='h-10'></div>
        {renderCharacters()}
      </div>
    </div>
  );
}