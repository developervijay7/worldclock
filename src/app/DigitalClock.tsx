import React from "react";

interface DigitalClockProps {
  hour: number;
  minute: number;
  second: number;
  ampm: string;
  is24h: boolean;
  mounted: boolean;
  styleIndex: number;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const DigitalClock: React.FC<DigitalClockProps> = ({ hour, minute, second, ampm, is24h, mounted, styleIndex }) => {
  switch (styleIndex) {
    case 0:
      // Classic Apple Watch Modular
      return (
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-gray-900 dark:text-white tracking-tight flex items-end gap-2">
            <span className="text-blue-600">{pad(hour)}</span>
            <span className="mx-1 text-gray-400">:</span>
            <span className="text-blue-600">{pad(minute)}</span>
            <span className="text-3xl text-pink-600 animate-pulse">{mounted ? (second % 2 === 0 ? ":" : " ") : ":"}</span>
            <span className="text-blue-400">{pad(second)}</span>
            {!is24h && (
              <span className="ml-2 text-lg font-bold text-gray-500 dark:text-gray-400">{ampm}</span>
            )}
          </div>
        </div>
      );
    case 1:
      // StandBy Flip Clock
      return (
        <div className="flex gap-2 items-end">
          {[pad(hour), pad(minute), pad(second)].map((val, i) => (
            <span key={i} className="bg-black/80 text-white text-6xl sm:text-7xl font-mono rounded-lg shadow-lg px-4 py-2 mx-1 border-b-4 border-gray-700 select-none">
              {val}
            </span>
          ))}
          {!is24h && (
            <span className="ml-2 text-lg font-bold text-gray-500 dark:text-gray-400">{ampm}</span>
          )}
        </div>
      );
    case 2:
      // Liquid Glass
      return (
        <div className="relative flex items-end justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-200/60 via-white/40 to-pink-200/60 backdrop-blur-xl blur-sm" />
          <div className="relative text-6xl sm:text-7xl font-mono font-bold text-white drop-shadow-lg px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl">
            {pad(hour)}<span className="mx-1 text-blue-300">:</span>{pad(minute)}<span className="mx-1 text-pink-300">:</span>{pad(second)}
            {!is24h && (
              <span className="ml-2 text-lg font-bold text-blue-200">{ampm}</span>
            )}
          </div>
        </div>
      );
    case 3:
      // Minimalist Neon
      return (
        <div className="flex gap-2 items-end bg-black/80 rounded-2xl px-6 py-4 shadow-2xl">
          <span className="text-7xl font-mono text-cyan-400 drop-shadow-[0_0_8px_cyan]">{pad(hour)}</span>
          <span className="text-7xl font-mono text-cyan-400 drop-shadow-[0_0_8px_cyan]">:</span>
          <span className="text-7xl font-mono text-cyan-400 drop-shadow-[0_0_8px_cyan]">{pad(minute)}</span>
          <span className="text-3xl text-pink-400 animate-pulse">{mounted ? (second % 2 === 0 ? ":" : " ") : ":"}</span>
          <span className="text-4xl font-mono text-cyan-400 drop-shadow-[0_0_8px_cyan]">{pad(second)}</span>
          {!is24h && (
            <span className="ml-2 text-lg font-bold text-cyan-200">{ampm}</span>
          )}
        </div>
      );
    case 4:
      // Modern Glassmorphism
      return (
        <div className="relative flex items-end justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-blue-100/40 to-pink-100/30 backdrop-blur-2xl border border-white/30 shadow-2xl" />
          <div className="relative text-6xl sm:text-7xl font-mono font-bold text-gray-900 dark:text-white px-8 py-4 rounded-2xl bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/30 shadow-2xl">
            {pad(hour)}<span className="mx-1 text-gray-400">:</span>{pad(minute)}<span className="mx-1 text-gray-400">:</span>{pad(second)}
            {!is24h && (
              <span className="ml-2 text-lg font-bold text-gray-500 dark:text-gray-300">{ampm}</span>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default DigitalClock; 