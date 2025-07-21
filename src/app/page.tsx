"use client";
import { useState, useEffect } from "react";

const timezones = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Europe/Paris",
  "America/Los_Angeles",
  // Add more as needed
];

const fonts = [
  { name: "Sans", className: "font-sans" },
  { name: "Mono", className: "font-mono" },
  { name: "Serif", className: "font-serif" },
];

function getTime(date: Date, tz: string) {
  return new Date(
    date.toLocaleString("en-US", { timeZone: tz })
  );
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

// Add imports for new components
import DigitalClock from "./DigitalClock";
import AnalogClock from "./AnalogClock";

function getInitialDark() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('wc_dark');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [timezone, setTimezone] = useState("UTC");
  const [is24h, setIs24h] = useState(false);
  const [font, setFont] = useState(fonts[0].className);
  const [now, setNow] = useState(() => getTime(new Date(), timezone));
  const [dark, setDark] = useState(getInitialDark);
  const [mounted, setMounted] = useState(false);
  const [digitalStyle, setDigitalStyle] = useState(0); // index for digital styles
  const [analogStyle, setAnalogStyle] = useState(0); // index for analog styles
  const digitalStyleNames = [
    "Classic Modular",
    "StandBy Flip",
    "Liquid Glass",
    "Minimalist Neon",
    "Modern Glassmorphism"
  ];
  const analogStyleNames = [
    "California Dial",
    "StandBy Simple",
    "Liquid Glass Analog"
  ];
  const [clockMode, setClockMode] = useState<'digital' | 'analog'>('digital');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getTime(new Date(), timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (mounted) {
      localStorage.setItem("wc_dark", String(dark));
    }
  }, [dark, mounted]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedDark = localStorage.getItem("wc_dark");
    const storedTimezone = localStorage.getItem("wc_timezone");
    const storedIs24h = localStorage.getItem("wc_is24h");
    const storedFont = localStorage.getItem("wc_font");
    const storedDigitalStyle = localStorage.getItem("wc_digitalStyle");
    const storedAnalogStyle = localStorage.getItem("wc_analogStyle");
    const storedClockMode = localStorage.getItem("wc_clockMode");
    if (storedDark !== null) setDark(storedDark === "true");
    if (storedTimezone) setTimezone(storedTimezone);
    if (storedIs24h !== null) setIs24h(storedIs24h === "true");
    if (storedFont) setFont(storedFont);
    if (storedDigitalStyle) setDigitalStyle(Number(storedDigitalStyle));
    if (storedAnalogStyle) setAnalogStyle(Number(storedAnalogStyle));
    if (storedClockMode) setClockMode(storedClockMode as 'digital' | 'analog');
  }, []);

  useEffect(() => {
    localStorage.setItem("wc_timezone", timezone);
  }, [timezone]);
  useEffect(() => {
    localStorage.setItem("wc_is24h", String(is24h));
  }, [is24h]);
  useEffect(() => {
    localStorage.setItem("wc_font", font);
  }, [font]);
  useEffect(() => {
    localStorage.setItem("wc_digitalStyle", String(digitalStyle));
  }, [digitalStyle]);
  useEffect(() => {
    localStorage.setItem("wc_analogStyle", String(analogStyle));
  }, [analogStyle]);
  useEffect(() => {
    localStorage.setItem("wc_clockMode", clockMode);
  }, [clockMode]);

  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = is24h ? hour : hour % 12 || 12;

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-emerald-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 transition-colors duration-500 ${font}`}>
      <div className="absolute top-4 right-4 z-20">
        <button
          className="rounded-full bg-white/80 dark:bg-black/60 shadow-lg p-3 hover:scale-110 transition-transform"
          onClick={() => setShowSettings(true)}
          aria-label="Open settings"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.38 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.66 0 1.26.38 1.51 1H21a2 2 0 0 1 0 4h-.09c-.66 0-1.26.38-1.51 1z"/></svg>
        </button>
      </div>
      <div className="flex flex-col items-center gap-8 p-6 rounded-3xl shadow-2xl bg-white/70 dark:bg-black/40 backdrop-blur-md max-w-lg w-full">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mb-2 drop-shadow-lg">World Clock</h1>
        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
          {clockMode === 'digital' ? (
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold mb-1">Digital</span>
              <DigitalClock
                hour={displayHour}
                minute={minute}
                second={second}
                ampm={ampm}
                is24h={is24h}
                mounted={mounted}
                styleIndex={digitalStyle}
              />
              <div className="text-lg mt-2 text-gray-700 dark:text-gray-300">
                {mounted
                  ? now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                  : null}
              </div>
              <div className="text-base mt-1 text-gray-500 dark:text-gray-400">{timezone.replace("_", " ")}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold mb-1">Analog</span>
              {mounted && (
                <AnalogClock date={now} styleIndex={analogStyle} />
              )}
            </div>
          )}
        </div>
      </div>
      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md relative flex flex-col gap-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 text-2xl"
              onClick={() => setShowSettings(false)}
              aria-label="Close settings"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">Settings</h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3">
                <span className="w-32">Timezone</span>
                <select
                  className="flex-1 rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  value={timezone}
                  onChange={e => setTimezone(e.target.value)}
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz.replace("_", " ")}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3">
                <span className="w-32">12/24 Hour</span>
                <input
                  type="checkbox"
                  checked={is24h}
                  onChange={e => setIs24h(e.target.checked)}
                  className="w-5 h-5 accent-pink-600"
                />
                <span>{is24h ? "24h" : "12h"}</span>
              </label>
              <label className="flex items-center gap-3">
                <span className="w-32">Font</span>
                <select
                  className="flex-1 rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  value={font}
                  onChange={e => setFont(e.target.value)}
                >
                  {fonts.map(f => (
                    <option key={f.className} value={f.className}>{f.name}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3">
                <span className="w-32">Clock Mode</span>
                <select
                  className="flex-1 rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  value={clockMode}
                  onChange={e => setClockMode(e.target.value as 'digital' | 'analog')}
                >
                  <option value="digital">Digital</option>
                  <option value="analog">Analog</option>
                </select>
              </label>
              {clockMode === 'digital' && (
                <label className="flex items-center gap-3">
                  <span className="w-32">Digital Style</span>
                  <select
                    className="flex-1 rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    value={digitalStyle}
                    onChange={e => setDigitalStyle(Number(e.target.value))}
                  >
                    {digitalStyleNames.map((name, i) => (
                      <option key={i} value={i}>{name}</option>
                    ))}
                  </select>
                </label>
              )}
              {clockMode === 'analog' && (
                <label className="flex items-center gap-3">
                  <span className="w-32">Analog Style</span>
                  <select
                    className="flex-1 rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    value={analogStyle}
                    onChange={e => setAnalogStyle(Number(e.target.value))}
                  >
                    {analogStyleNames.map((name, i) => (
                      <option key={i} value={i}>{name}</option>
                    ))}
                  </select>
                </label>
              )}
            </div>
          </div>
        </div>
      )}
      <footer className="absolute bottom-4 left-0 w-full flex flex-col items-center text-gray-500 dark:text-gray-400 text-sm z-10">
        <span className="flex items-center gap-1">
          &copy; {new Date().getFullYear()} World Clock &mdash;
          <a href="https://github.com/developervijay7/worldclock" className="underline hover:text-pink-600 ml-1">GitHub</a>
        </span>
        <span className="flex items-center gap-1 mt-1">
          Designed with
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="inline-block animate-pulse">
            <path d="M12 21s-6.2-4.35-8.4-7.09C1.67 11.13 2.13 8.28 4.07 6.6c1.54-1.32 3.97-1.13 5.43.44L12 9.17l2.5-2.13c1.46-1.57 3.89-1.76 5.43-.44 1.94 1.68 2.4 4.53.47 7.31C18.2 16.65 12 21 12 21z" fill="#e11d48"/>
          </svg>
          by <a href="https://vijaygoswami.com" className="underline hover:text-pink-600 ml-1" target="_blank" rel="noopener noreferrer">Vijay Goswami</a>
        </span>
      </footer>
    </div>
  );
}
