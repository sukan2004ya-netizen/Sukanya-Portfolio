import React, { useState } from 'react';
import { 
  RotateCcw, 
  Check, 
  BrainCircuit
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PuzzleMove {
  id: string;
  label: string;
  notation: string;
  isCorrect: boolean;
  explanation: string;
}

const PUZZLE_OPTIONS: PuzzleMove[] = [
  {
    id: '1',
    label: '1. Qh7# (Queen Checkmate)',
    notation: 'Qh7#',
    isCorrect: true,
    explanation: 'Checkmate! The Queen is guarded by the Bishop on c2, and the Black King on h8 has no legal flight squares!'
  },
  {
    id: '2',
    label: '2. Qf7+ (Queen to f7 Check)',
    notation: 'Qf7+',
    isCorrect: false,
    explanation: 'Good check, but Black can play Kh8 or Kh7 and prolong the escape.'
  },
  {
    id: '3',
    label: '3. Bxh7+ (Bishop sacrifice)',
    notation: 'Bxh7+',
    isCorrect: false,
    explanation: 'After Kxh7, White loses tactical momentum.'
  },
  {
    id: '4',
    label: '4. Rd1 (Quiet Rook Centralization)',
    notation: 'Rd1',
    isCorrect: false,
    explanation: 'Too slow! Allows Black to reorganize defensive pieces.'
  }
];

export const ChessPuzzleSection: React.FC = () => {
  const [selectedMove, setSelectedMove] = useState<PuzzleMove | null>(null);
  const [solved, setSolved] = useState(false);

  const handleSelectMove = (move: PuzzleMove) => {
    setSelectedMove(move);
    if (move.isCorrect) {
      setSolved(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 }
      });
    } else {
      setSolved(false);
    }
  };

  const handleReset = () => {
    setSelectedMove(null);
    setSolved(false);
  };

  return (
    <section className="py-16 bg-[#0A0A0A] relative brutal-border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#0D0D0D] brutal-border p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282828] pb-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black text-[#CCFF00] border border-[#333]">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-mono uppercase flex items-center gap-2">
                    <span>Beyond Code: Chess Tactical Mindset</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-[#1a2200] text-[#CCFF00] border border-[#668800]">
                      HOBBY
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    "Playing chess teaches algorithmic discipline, anticipating edge cases 3 moves ahead, and remaining calm under pressure."
                  </p>
                </div>
              </div>
            </div>

            {solved && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1a2200] text-[#CCFF00] border border-[#CCFF00] text-xs font-mono font-bold uppercase animate-pulse">
                <Check className="w-3.5 h-3.5" /> PUZZLE SOLVED!
              </span>
            )}
          </div>

          {/* Puzzle Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Visual Chess Board Representation */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 bg-[#1a1a1a] border-4 border-[#333] grid grid-cols-8 grid-rows-8 overflow-hidden shadow-2xl">
                {Array.from({ length: 64 }).map((_, i) => {
                  const row = Math.floor(i / 8);
                  const col = i % 8;
                  const isDark = (row + col) % 2 === 1;
                  
                  // Key pieces placement representation
                  let piece = '';
                  let pieceClass = '';
                  if (row === 0 && col === 7) { piece = '♚'; pieceClass = 'text-black'; } // Black King at h8
                  if (row === 1 && col === 6) { piece = '♟'; pieceClass = 'text-black'; } // Black Pawn g7
                  if (row === 1 && col === 7) { piece = '♟'; pieceClass = 'text-black'; } // Black Pawn h7
                  if (row === 1 && col === 3) { piece = '♕'; pieceClass = 'text-[#CCFF00] drop-shadow-md text-2xl font-bold animate-bounce'; } // White Queen at d7 targeting h7
                  if (row === 3 && col === 2) { piece = '♗'; pieceClass = 'text-white drop-shadow-md'; } // White Bishop c4 targeting h7 battery

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center text-lg select-none ${
                        isDark ? 'bg-[#2a2a2a]' : 'bg-[#e5e5e5]'
                      }`}
                    >
                      <span className={pieceClass}>{piece}</span>
                    </div>
                  );
                })}
              </div>
              <span className="text-[10px] font-mono text-zinc-500 mt-2 uppercase">
                Position: White to play and mate in 1 move
              </span>
            </div>

            {/* Move Options */}
            <div className="md:col-span-7 space-y-3">
              <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                // SELECT TACTICAL MOVE:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PUZZLE_OPTIONS.map((opt) => {
                  const isSelected = selectedMove?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectMove(opt)}
                      className={`p-3 text-left border transition-all cursor-pointer font-mono ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-[#1a2200] border-[#CCFF00] text-[#CCFF00]'
                            : 'bg-red-950/60 border-red-500 text-red-300'
                          : 'bg-[#121212] hover:bg-[#1a1a1a] border-[#282828] text-zinc-200'
                      }`}
                    >
                      <div className="font-bold text-xs">{opt.label}</div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {selectedMove && (
                <div className={`p-3.5 border text-xs leading-relaxed space-y-1 font-mono ${
                  selectedMove.isCorrect
                    ? 'bg-[#1a2200] border-[#668800] text-[#CCFF00]'
                    : 'bg-red-950/40 border-red-800 text-red-200'
                }`}>
                  <div className="font-bold uppercase">
                    {selectedMove.isCorrect ? '🎯 Brilliant Move! Checkmate Delivered.' : '⚠️ Incorrect Tactical Line'}
                  </div>
                  <div className="text-zinc-300 text-[11px]">{selectedMove.explanation}</div>
                </div>
              )}

              {selectedMove && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#CCFF00] transition-colors pt-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset puzzle</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
