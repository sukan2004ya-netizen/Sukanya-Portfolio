import React, { useState } from 'react';
import { 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  Sliders, 
  Code, 
  Eye, 
  Cpu, 
  Scan, 
  Info
} from 'lucide-react';
import { HELMO_VISION_TEST_CASES, PROJECTS } from '../data/portfolioData';
import { VisionTestCase } from '../types';

export const HelmoVisionDemo: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<VisionTestCase>(HELMO_VISION_TEST_CASES[0]);
  const [activePipelineStep, setActivePipelineStep] = useState<'input' | 'grayscale' | 'edges' | 'roi' | 'detection'>('detection');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.80);
  const [activeTab, setActiveTab] = useState<'interactive' | 'code' | 'architecture'>('interactive');

  const helmoProject = PROJECTS.find(p => p.id === 'helmo-vision');

  const handleRunInference = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const isCompliant = selectedCase.helmetDetected && selectedCase.confidence >= confidenceThreshold;

  return (
    <section id="helmo-lab" className="py-20 bg-[#0A0A0A] relative brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#333] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>[04] // LIVE COMPUTER VISION LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Helmo Vision — <span className="neon-text italic">Live Algorithm</span> Sandbox
          </h2>
          <p className="text-zinc-400 max-w-2xl text-xs sm:text-sm font-mono leading-relaxed">
            Test Sukanya's Python & OpenCV motorcycle helmet detection system directly in your browser. Inspect each stage of the computer vision pipeline.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            id="helmo-tab-interactive"
            onClick={() => setActiveTab('interactive')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'interactive'
                ? 'neon-bg text-black font-black'
                : 'bg-[#111] text-zinc-400 hover:text-white border border-[#282828]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            id="helmo-tab-code"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'code'
                ? 'neon-bg text-black font-black'
                : 'bg-[#111] text-zinc-400 hover:text-white border border-[#282828]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Python & OpenCV Code</span>
          </button>

          <button
            id="helmo-tab-arch"
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'neon-bg text-black font-black'
                : 'bg-[#111] text-zinc-400 hover:text-white border border-[#282828]'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Pipeline Architecture</span>
          </button>
        </div>

        {/* Main Interactive Stage */}
        {activeTab === 'interactive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Test Case Frame & Visualizer */}
            <div className="lg:col-span-7 bg-[#0D0D0D] brutal-border space-y-4 p-5">
              
              {/* Test Case Selection Bar */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                  Select Traffic Scenario Test Case:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {HELMO_VISION_TEST_CASES.map((tc, index) => (
                    <button
                      key={tc.id}
                      id={`helmo-testcase-btn-${index}`}
                      onClick={() => {
                        setSelectedCase(tc);
                        handleRunInference();
                      }}
                      className={`p-2.5 text-left text-xs font-mono uppercase transition-all cursor-pointer border ${
                        selectedCase.id === tc.id
                          ? 'bg-[#1A1A1A] border-[#CCFF00] text-white shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                          : 'bg-[#121212] border-[#262626] text-zinc-400 hover:text-zinc-200 hover:bg-[#161616]'
                      }`}
                    >
                      <div className="font-bold text-[#CCFF00] truncate">[CASE 0{index + 1}]</div>
                      <div className="text-[10px] text-zinc-400 truncate">{tc.title.split('—')[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Frame with Overlays */}
              <div className="relative aspect-video bg-black overflow-hidden border border-[#333] flex items-center justify-center">
                
                {/* Image Render with Filters based on Pipeline Step */}
                <img
                  src={selectedCase.imageUrl}
                  alt={selectedCase.title}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    activePipelineStep === 'grayscale' ? 'grayscale contrast-125' :
                    activePipelineStep === 'edges' ? 'invert grayscale contrast-200 brightness-50' :
                    ''
                  }`}
                />

                {/* Processing Overlay Animation */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2 z-20">
                    <Scan className="w-8 h-8 text-[#CCFF00] animate-spin" />
                    <span className="text-xs font-mono text-[#CCFF00]">EXTRACTING CANNY ROI CONTOURS...</span>
                  </div>
                )}

                {/* Pipeline Step: Edge & Contour Overlays */}
                {activePipelineStep === 'edges' && (
                  <div className="absolute inset-0 mix-blend-screen pointer-events-none border-2 border-dashed border-[#CCFF00]" />
                )}

                {/* Pipeline Step: ROI / Detection Bounding Box */}
                {(activePipelineStep === 'roi' || activePipelineStep === 'detection') && !isProcessing && (
                  <div
                    className={`absolute border-2 transition-all duration-300 flex flex-col justify-between p-1 shadow-lg ${
                      isCompliant
                        ? 'border-[#CCFF00] bg-[#CCFF00]/15 text-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                        : 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    }`}
                    style={{
                      left: `${selectedCase.bbox.x}%`,
                      top: `${selectedCase.bbox.y}%`,
                      width: `${selectedCase.bbox.width}%`,
                      height: `${selectedCase.bbox.height}%`,
                    }}
                  >
                    {/* Bounding Box Tag */}
                    <div className="flex items-center justify-between text-[9px] font-mono font-black bg-black px-1.5 py-0.5 border border-[#333]">
                      <span>{isCompliant ? 'HELMET_VERIFIED' : 'SAFETY_VIOLATION'}</span>
                      <span>{(selectedCase.confidence * 100).toFixed(0)}%</span>
                    </div>

                    {/* Rider Head Target Reticle */}
                    <div className="self-center">
                      <div className={`w-3 h-3 border border-dashed animate-ping ${isCompliant ? 'border-[#CCFF00]' : 'border-red-500'}`} />
                    </div>

                    <div className="text-[8px] font-mono text-right bg-black/80 px-1 text-zinc-300">
                      ROI: [{selectedCase.bbox.width}x{selectedCase.bbox.height}]
                    </div>
                  </div>
                )}

                {/* Live Camera Badge */}
                <div className="absolute top-3 left-3 bg-black px-2.5 py-1 border border-[#333] text-[9px] font-mono text-zinc-300 flex items-center gap-1.5">
                  <div className="w-2 h-2 neon-bg animate-pulse" />
                  <span>OPENCV // FRAME #1042</span>
                </div>

              </div>

              {/* Pipeline Step Selector Tabs */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase block">
                  Pipeline Step Viewer:
                </label>
                <div className="grid grid-cols-5 gap-1 text-[10px] font-mono">
                  {[
                    { id: 'input', label: '1. Raw RGB' },
                    { id: 'grayscale', label: '2. Gray+Blur' },
                    { id: 'edges', label: '3. Canny' },
                    { id: 'roi', label: '4. Head ROI' },
                    { id: 'detection', label: '5. Classify' }
                  ].map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setActivePipelineStep(step.id as any)}
                      className={`py-1.5 px-1 text-center font-bold uppercase transition-colors cursor-pointer border ${
                        activePipelineStep === step.id
                          ? 'neon-bg text-black border-[#CCFF00]'
                          : 'bg-[#121212] text-zinc-400 hover:bg-[#1a1a1a] border-[#282828]'
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Real-time Telemetry & Diagnostics */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Classification Status Banner */}
              <div className={`p-5 brutal-border ${
                isCompliant
                  ? 'bg-[#0f1800] border-[#668800] text-[#CCFF00]'
                  : 'bg-[#1f0505] border-red-900 text-red-400'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  {isCompliant ? (
                    <div className="p-2 bg-black text-[#CCFF00] border border-[#668800]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-2 bg-black text-red-400 border border-red-900">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Enforcement Verdict</div>
                    <div className="text-base font-black font-mono uppercase">
                      {isCompliant ? 'Compliant — Helmet Verified' : 'Road Safety Violation Detected'}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-zinc-300 leading-relaxed mt-2 bg-black p-3 border border-[#282828] font-mono">
                  <strong className="text-white">Analysis:</strong> {selectedCase.explanation}
                </p>
              </div>

              {/* Interactive CV Controls */}
              <div className="bg-[#0D0D0D] brutal-border p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#282828] pb-3">
                  <div className="flex items-center gap-2 text-white font-bold text-xs font-mono uppercase tracking-wider">
                    <Sliders className="w-4 h-4 text-[#CCFF00]" />
                    <span>Algorithm Calibration</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">TUNER</span>
                </div>

                {/* Confidence Threshold Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-300">Confidence Threshold:</span>
                    <span className="text-[#CCFF00] font-bold">{(confidenceThreshold * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.50"
                    max="0.99"
                    step="0.01"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#1A1A1A] border border-[#333] appearance-none cursor-pointer accent-[#CCFF00]"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>50% (High Recall)</span>
                    <span>99% (High Precision)</span>
                  </div>
                </div>

                {/* Metric Summary */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#080808] p-3 border border-[#262626]">
                    <div className="text-[9px] font-mono uppercase text-zinc-500">Model Confidence</div>
                    <div className="text-base font-black font-mono text-[#CCFF00] mt-0.5">
                      {(selectedCase.confidence * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-[#080808] p-3 border border-[#262626]">
                    <div className="text-[9px] font-mono uppercase text-zinc-500">Riders Detected</div>
                    <div className="text-base font-black font-mono text-white mt-0.5">
                      {selectedCase.riderCount} Person{selectedCase.riderCount > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Trigger Inference Button */}
                <button
                  id="helmo-rerun-inference-btn"
                  onClick={handleRunInference}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#141414] hover:bg-[#202020] text-zinc-200 font-mono text-xs font-bold uppercase tracking-wider border border-[#333] hover:border-[#CCFF00] transition-colors cursor-pointer"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                  <span>Re-run Frame Analysis</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Python Code View Tab */}
        {activeTab === 'code' && (
          <div className="bg-[#0D0D0D] brutal-border p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#282828] pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 uppercase">
                <Code className="w-4 h-4 text-[#CCFF00]" />
                <span>helmet_detector.py — Core OpenCV Pipeline</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-black neon-bg px-2 py-0.5 uppercase">
                Python 3.x + OpenCV
              </span>
            </div>

            <div className="bg-[#080808] p-4 font-mono text-xs text-zinc-300 overflow-x-auto border border-[#262626]">
              <pre className="text-[#CCFF00] leading-relaxed">
                {helmoProject?.codeSnippet?.code}
              </pre>
            </div>

            <div className="text-xs text-zinc-400 bg-[#080808] p-3 border border-[#262626] flex items-start gap-2 font-mono">
              <Info className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
              <span>
                <strong>Algorithm Highlights:</strong> Uses Gaussian blurring to attenuate high-frequency road noise, applies Canny edge contours to isolate crown ROI, and analyzes contour circularity ratio [4 * π * Area / Perimeter²] to distinguish hard helmet shells from unshielded heads.
              </span>
            </div>
          </div>
        )}

        {/* Pipeline Architecture Diagram Tab */}
        {activeTab === 'architecture' && (
          <div className="bg-[#0D0D0D] brutal-border p-6 space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2 font-mono uppercase">
              <Scan className="w-4 h-4 text-[#CCFF00]" />
              <span>Helmo Vision End-to-End System Pipeline</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#080808] border border-[#262626] space-y-2">
                <div className="text-[10px] font-mono text-[#CCFF00] font-bold">[STAGE 01]</div>
                <div className="font-bold text-zinc-200 text-xs font-mono uppercase">Video Stream Ingestion</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Extracts live frames from surveillance cameras or recorded traffic video feeds using OpenCV VideoCapture.
                </p>
              </div>

              <div className="p-4 bg-[#080808] border border-[#262626] space-y-2">
                <div className="text-[10px] font-mono text-[#CCFF00] font-bold">[STAGE 02]</div>
                <div className="font-bold text-zinc-200 text-xs font-mono uppercase">Motorcyclist ROI Isolation</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Identifies two-wheeler riders and isolates upper bounding box representing driver and pillion head coordinates.
                </p>
              </div>

              <div className="p-4 bg-[#080808] border border-[#262626] space-y-2">
                <div className="text-[10px] font-mono text-[#CCFF00] font-bold">[STAGE 03]</div>
                <div className="font-bold text-zinc-200 text-xs font-mono uppercase">Contour & Edge Analysis</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Evaluates geometric curvature, color gradient smoothness, and circularity index to verify helmet presence.
                </p>
              </div>

              <div className="p-4 bg-[#080808] border border-[#262626] space-y-2">
                <div className="text-[10px] font-mono text-[#CCFF00] font-bold">[STAGE 04]</div>
                <div className="font-bold text-zinc-200 text-xs font-mono uppercase">Violation Alert & Log</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Generates instant violation events with timestamped frame capture for law enforcement and traffic records.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
