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

function AnalogClock({ date }: { date: Date }) {
  const size = 120;
  const center = size / 2;
  const radius = size / 2 - 8;
  const hour = date.getHours() % 12;
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const hourAngle = (hour + minute / 60) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = second * 6;
  return (
    <svg width={size} height={size} className="drop-shadow-lg">
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="var(--background)"
        stroke="var(--foreground)"
        strokeWidth="4"
      />
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = center + Math.sin(angle) * (radius - 8);
        const y1 = center - Math.cos(angle) * (radius - 8);
        const x2 = center + Math.sin(angle) * (radius - 2);
        const y2 = center - Math.cos(angle) * (radius - 2);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--foreground)"
            strokeWidth={i % 3 === 0 ? 3 : 1}
          />
        );
      })}
      {/* Hour hand */}
      <line
        x1={center}
        y1={center}
        x2={center + Math.sin((hourAngle * Math.PI) / 180) * (radius * 0.5)}
        y2={center - Math.cos((hourAngle * Math.PI) / 180) * (radius * 0.5)}
        stroke="var(--foreground)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={center}
        y1={center}
        x2={center + Math.sin((minuteAngle * Math.PI) / 180) * (radius * 0.7)}
        y2={center - Math.cos((minuteAngle * Math.PI) / 180) * (radius * 0.7)}
        stroke="var(--foreground)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Second hand */}
      <line
        x1={center}
        y1={center}
        x2={center + Math.sin((secondAngle * Math.PI) / 180) * (radius * 0.85)}
        y2={center - Math.cos((secondAngle * Math.PI) / 180) * (radius * 0.85)}
        stroke="#e11d48"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={center} cy={center} r={4} fill="#e11d48" />
    </svg>
  );
}

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [timezone, setTimezone] = useState("UTC");
  const [is24h, setIs24h] = useState(false);
  const [font, setFont] = useState(fonts[0].className);
  const [now, setNow] = useState(() => getTime(new Date(), timezone));
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getTime(new Date(), timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = is24h ? hour : hour % 12 || 12;

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-emerald-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 transition-colors duration-500 ${font}`}>
      <div className="absolute top-4 right-4 z-20">
        <button
          className="rounded-full bg-white/80 dark:bg-black/60 shadow-lg p-3 hover:scale-110 transition-transform"
          onClick={() => setShowSettings(true)}
          aria-label="Open settings"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Zm7.94-2.06a1 1 0 0 0 .21 1.09l.06.06a1 1 0 0 1 0 1.42l-1.42 1.42a1 1 0 0 1-1.42 0l-.06-.06a1 1 0 0 0-1.09-.21 7.03 7.03 0 0 1-2.19.88 1 1 0 0 0-.78.97v.17a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-.17a1 1 0 0 0-.78-.97 7.03 7.03 0 0 1-2.19-.88 1 1 0 0 0-1.09.21l-.06.06a1 1 0 0 1-1.42 0l-1.42-1.42a1 1 0 0 1 0-1.42l.06-.06a1 1 0 0 0 .21-1.09 7.03 7.03 0 0 1-.88-2.19 1 1 0 0 0-.97-.78h-.17a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h.17a1 1 0 0 0 .97-.78 7.03 7.03 0 0 1 .88-2.19 1 1 0 0 0-.21-1.09l-.06-.06a1 1 0 0 1 0-1.42l1.42-1.42a1 1 0 0 1 1.42 0l.06.06a1 1 0 0 0 1.09.21 7.03 7.03 0 0 1 2.19-.88 1 1 0 0 0 .78-.97V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.17a1 1 0 0 0 .78.97 7.03 7.03 0 0 1 2.19.88 1 1 0 0 0 1.09-.21l.06-.06a1 1 0 0 1 1.42 0l1.42 1.42a1 1 0 0 1 0 1.42l-.06.06a1 1 0 0 0-.21 1.09 7.03 7.03 0 0 1 .88 2.19 1 1 0 0 0 .97.78h.17a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.17a1 1 0 0 0-.97.78 7.03 7.03 0 0 1-.88 2.19Z"></path></svg>
        </button>
      </div>
      <div className="flex flex-col items-center gap-8 p-6 rounded-3xl shadow-2xl bg-white/70 dark:bg-black/40 backdrop-blur-md max-w-lg w-full">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mb-2 drop-shadow-lg">World Clock</h1>
        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold mb-1">Digital</span>
            <div className="text-5xl sm:text-6xl font-mono tracking-widest flex items-end gap-2">
              {pad(displayHour)}:{pad(minute)}
              <span className="text-3xl font-mono text-pink-600 animate-pulse">{second % 2 === 0 ? ":" : " "}</span>
              {pad(second)}
              {!is24h && (
                <span className="ml-2 text-lg font-bold text-gray-500 dark:text-gray-400">{ampm}</span>
              )}
            </div>
            <div className="text-lg mt-2 text-gray-700 dark:text-gray-300">
              {now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
            <div className="text-base mt-1 text-gray-500 dark:text-gray-400">{timezone.replace("_", " ")}</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold mb-1">Analog</span>
            <AnalogClock date={now} />
          </div>
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
                <span className="w-32">Dark Mode</span>
                <input
                  type="checkbox"
                  checked={dark}
                  onChange={e => setDark(e.target.checked)}
                  className="w-5 h-5 accent-pink-600"
                />
                <span>{dark ? "On" : "Off"}</span>
              </label>
            </div>
          </div>
        </div>
      )}
      <footer className="absolute bottom-4 left-0 w-full flex justify-center text-gray-500 dark:text-gray-400 text-sm z-10">
        <span>
          &copy; {new Date().getFullYear()} World Clock &mdash; <a href="https://github.com/developervijay7/worldclock" className="underline hover:text-pink-600">GitHub</a>
        </span>
      </footer>
    </div>
  );
}
