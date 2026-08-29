import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  Plus, 
  Check, 
  Bell, 
  BellRing, 
  Trash2, 
  Flame, 
  ExternalLink, 
  Github
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  takenToday: boolean;
  streak: number;
  instructions: string;
}

const INITIAL_MEDS: Medication[] = [
  {
    id: '1',
    name: 'Vitamin D3 & Calcium',
    dosage: '1000 IU (1 Capsule)',
    time: '08:30 AM',
    takenToday: true,
    streak: 14,
    instructions: 'Post breakfast with water'
  },
  {
    id: '2',
    name: 'Omega-3 Fish Oil',
    dosage: '500 mg (1 Softgel)',
    time: '01:15 PM',
    takenToday: false,
    streak: 6,
    instructions: 'With lunch'
  },
  {
    id: '3',
    name: 'Multivitamin Complex',
    dosage: '1 Tablet',
    time: '08:00 PM',
    takenToday: false,
    streak: 11,
    instructions: 'After dinner'
  }
];

export const MedTrackDemo: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDS);
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTime, setNewTime] = useState('09:00 AM');
  const [newInstructions, setNewInstructions] = useState('');
  const [alarmActive, setAlarmActive] = useState(false);
  const [activeAlertMed, setActiveAlertMed] = useState<string | null>(null);

  // Play synthetic web audio chime
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('WebAudio not supported or blocked');
    }
  };

  const handleTakeDose = (id: string) => {
    playChime();
    setMedications(prev => prev.map(m => {
      if (m.id === id) {
        const updatedTaken = !m.takenToday;
        return {
          ...m,
          takenToday: updatedTaken,
          streak: updatedTaken ? m.streak + 1 : Math.max(0, m.streak - 1)
        };
      }
      return m;
    }));

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMed: Medication = {
      id: Date.now().toString(),
      name: newName.trim(),
      dosage: newDosage.trim() || '1 Dose',
      time: newTime,
      takenToday: false,
      streak: 1,
      instructions: newInstructions.trim() || 'Take as prescribed'
    };

    setMedications(prev => [newMed, ...prev]);
    setNewName('');
    setNewDosage('');
    setNewInstructions('');
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const handleTriggerSimulatedAlarm = (medName: string) => {
    setActiveAlertMed(medName);
    setAlarmActive(true);
    playChime();
    setTimeout(() => {
      setAlarmActive(false);
      setActiveAlertMed(null);
    }, 4000);
  };

  const takenCount = medications.filter(m => m.takenToday).length;
  const adherenceRate = medications.length > 0 ? Math.round((takenCount / medications.length) * 100) : 0;

  return (
    <div className="bg-[#0D0D0D] brutal-border p-6 sm:p-8 space-y-6">
      
      {/* MedTrack Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282828] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-[#CCFF00] border border-[#333]">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-mono uppercase flex items-center gap-2">
                <span>MedTrack Live Interactive Sandbox</span>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#1a2200] text-[#CCFF00] border border-[#668800]">
                  JS WEB APP
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Live demonstration of Sukanya's medicine reminder & dosage compliance tracker.
              </p>
            </div>
          </div>
        </div>

        {/* GitHub Link */}
        <a
          id="medtrack-github-button"
          href="https://github.com/sukan2004ya-netizen/MedTrack"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#161616] hover:bg-white hover:text-black text-zinc-200 text-xs font-mono uppercase font-bold border border-[#333] transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Simulated Alert Notification Popup */}
      {alarmActive && activeAlertMed && (
        <div className="bg-[#1a2200] border border-[#CCFF00] p-4 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <BellRing className="w-5 h-5 text-[#CCFF00] animate-spin" />
            <div>
              <div className="text-[10px] font-mono font-bold text-[#CCFF00] uppercase">REMINDER ALARM ACTIVE</div>
              <div className="text-xs font-bold text-white font-mono uppercase">Time to take: {activeAlertMed}</div>
            </div>
          </div>
          <button
            onClick={() => setAlarmActive(false)}
            className="px-3 py-1 neon-bg text-black text-xs font-mono font-bold uppercase cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-3 brutal-border bg-[#000]">
        <div className="p-3.5 text-center border-r border-[#282828]">
          <div className="text-[9px] font-mono uppercase text-zinc-500">Daily Compliance</div>
          <div className="text-xl font-black font-mono neon-text mt-0.5">{adherenceRate}%</div>
        </div>

        <div className="p-3.5 text-center border-r border-[#282828]">
          <div className="text-[9px] font-mono uppercase text-zinc-500">Doses Taken</div>
          <div className="text-xl font-black font-mono text-white mt-0.5">{takenCount} / {medications.length}</div>
        </div>

        <div className="p-3.5 text-center">
          <div className="text-[9px] font-mono uppercase text-zinc-500">Best Streak</div>
          <div className="text-xl font-black font-mono text-[#CCFF00] mt-0.5 flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 fill-[#CCFF00]" />
            <span>14d</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Active Medication Schedules */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
            <span>// ACTIVE SCHEDULE:</span>
            <span>Click box to log intake</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {medications.map((med) => (
              <div
                key={med.id}
                className={`p-3.5 border transition-all flex items-center justify-between gap-3 ${
                  med.takenToday
                    ? 'bg-[#121800] border-[#334400] text-zinc-400'
                    : 'bg-[#121212] border-[#282828] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleTakeDose(med.id)}
                    className={`mt-0.5 w-5 h-5 flex items-center justify-center border transition-all cursor-pointer ${
                      med.takenToday
                        ? 'neon-bg border-[#CCFF00] text-black'
                        : 'border-[#444] bg-[#181818] hover:border-[#CCFF00] text-transparent'
                    }`}
                    title={med.takenToday ? 'Mark as not taken' : 'Mark as taken'}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-xs font-mono uppercase ${med.takenToday ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {med.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#1a1a1a] text-zinc-400 border border-[#333]">
                        {med.dosage}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-1 font-mono">
                      <span className="flex items-center gap-1 text-[#CCFF00]">
                        <Clock className="w-3 h-3" />
                        {med.time}
                      </span>
                      <span>//</span>
                      <span>{med.instructions}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#CCFF00] bg-[#1a2200] px-2 py-0.5 border border-[#668800]">
                    <Flame className="w-3 h-3 fill-[#CCFF00]" />
                    <span>{med.streak}d</span>
                  </div>

                  <button
                    onClick={() => handleTriggerSimulatedAlarm(med.name)}
                    className="p-1.5 bg-[#181818] hover:bg-[#252525] text-zinc-400 hover:text-[#CCFF00] border border-[#333] transition-colors cursor-pointer"
                    title="Test alarm alert for this medication"
                  >
                    <Bell className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteMedication(med.id)}
                    className="p-1.5 bg-[#181818] hover:bg-[#252525] text-zinc-400 hover:text-red-400 border border-[#333] transition-colors cursor-pointer"
                    title="Remove from schedule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Add Schedule Form */}
        <div className="lg:col-span-5 bg-[#121212] border border-[#282828] p-5 space-y-4">
          <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2 border-b border-[#282828] pb-3">
            <Plus className="w-4 h-4 text-[#CCFF00]" />
            <span>Add Prescription to Schedule</span>
          </div>

          <form onSubmit={handleAddMedication} className="space-y-3 font-mono">
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1 uppercase">Medication Name</label>
              <input
                type="text"
                placeholder="e.g., Metformin, Cetirizine, Vitamin B"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-[#080808] border border-[#333] text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1 uppercase">Dosage</label>
                <input
                  type="text"
                  placeholder="e.g., 500mg (1 Tab)"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080808] border border-[#333] text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00]"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1 uppercase">Timing</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080808] border border-[#333] text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="08:00 AM">08:00 AM (Morning)</option>
                  <option value="01:00 PM">01:00 PM (Afternoon)</option>
                  <option value="08:00 PM">08:00 PM (Evening)</option>
                  <option value="10:00 PM">10:00 PM (Bedtime)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-zinc-400 block mb-1 uppercase">Instructions</label>
              <input
                type="text"
                placeholder="e.g., With meals, before sleep"
                value={newInstructions}
                onChange={(e) => setNewInstructions(e.target.value)}
                className="w-full px-3 py-2 bg-[#080808] border border-[#333] text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 neon-bg hover:brightness-110 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Add to Active Reminders
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
