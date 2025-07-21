import React from "react";

interface AnalogClockProps {
  date: Date;
  styleIndex: number;
}

function getAngles(date: Date) {
  const hour = date.getHours() % 12;
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    hourAngle: (hour + minute / 60) * 30,
    minuteAngle: (minute + second / 60) * 6,
    secondAngle: second * 6,
    hour,
    minute,
    second,
  };
}

const AnalogClock: React.FC<AnalogClockProps> = ({ date, styleIndex }) => {
  const size = 120;
  const center = size / 2;
  const radius = size / 2 - 8;
  const { hourAngle, minuteAngle, secondAngle } = getAngles(date);

  if (styleIndex === 0) {
    // Apple Watch California Dial
    return (
      <svg width={size} height={size} className="drop-shadow-lg">
        <defs>
          <radialGradient id="california-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b3c6e0" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <circle cx={center} cy={center} r={radius} fill="url(#california-bg)" stroke="#222" strokeWidth="3" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = center + Math.sin(angle) * (radius - 18);
          const y = center - Math.cos(angle) * (radius - 18);
          return (
            <text key={i} x={x} y={y + 5} textAnchor="middle" fontSize="16" fill="#222" fontFamily="Arial" fontWeight="bold">
              {i === 0 ? 12 : i}
            </text>
          );
        })}
        {/* Hands */}
        <line x1={center} y1={center} x2={center + Math.sin((hourAngle * Math.PI) / 180) * (radius * 0.5)} y2={center - Math.cos((hourAngle * Math.PI) / 180) * (radius * 0.5)} stroke="#222" strokeWidth="5" strokeLinecap="round" />
        <line x1={center} y1={center} x2={center + Math.sin((minuteAngle * Math.PI) / 180) * (radius * 0.7)} y2={center - Math.cos((minuteAngle * Math.PI) / 180) * (radius * 0.7)} stroke="#222" strokeWidth="3" strokeLinecap="round" />
        <line x1={center} y1={center} x2={center + Math.sin((secondAngle * Math.PI) / 180) * (radius * 0.85)} y2={center - Math.cos((secondAngle * Math.PI) / 180) * (radius * 0.85)} stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
        <circle cx={center} cy={center} r={5} fill="#e11d48" />
      </svg>
    );
  }
  if (styleIndex === 1) {
    // StandBy Simple
    return (
      <svg width={size} height={size} className="drop-shadow-lg">
        <circle cx={center} cy={center} r={radius} fill="#fff" stroke="#222" strokeWidth="2" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = center + Math.sin(angle) * (radius - 8);
          const y1 = center - Math.cos(angle) * (radius - 8);
          const x2 = center + Math.sin(angle) * (radius - 2);
          const y2 = center - Math.cos(angle) * (radius - 2);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bbb" strokeWidth={i % 3 === 0 ? 3 : 1} />
          );
        })}
        {/* Hands */}
        <line x1={center} y1={center} x2={center + Math.sin((hourAngle * Math.PI) / 180) * (radius * 0.5)} y2={center - Math.cos((hourAngle * Math.PI) / 180) * (radius * 0.5)} stroke="#222" strokeWidth="4" strokeLinecap="round" />
        <line x1={center} y1={center} x2={center + Math.sin((minuteAngle * Math.PI) / 180) * (radius * 0.7)} y2={center - Math.cos((minuteAngle * Math.PI) / 180) * (radius * 0.7)} stroke="#222" strokeWidth="2" strokeLinecap="round" />
        <line x1={center} y1={center} x2={center + Math.sin((secondAngle * Math.PI) / 180) * (radius * 0.85)} y2={center - Math.cos((secondAngle * Math.PI) / 180) * (radius * 0.85)} stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
        <circle cx={center} cy={center} r={4} fill="#e11d48" />
      </svg>
    );
  }
  if (styleIndex === 2) {
    // Liquid Glass Analog
    return (
      <svg width={size} height={size} className="drop-shadow-2xl">
        <defs>
          <radialGradient id="glass-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0e7ef" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <circle cx={center} cy={center} r={radius} fill="url(#glass-bg)" stroke="#fff" strokeWidth="3" opacity="0.85" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = center + Math.sin(angle) * (radius - 8);
          const y1 = center - Math.cos(angle) * (radius - 8);
          const x2 = center + Math.sin(angle) * (radius - 2);
          const y2 = center - Math.cos(angle) * (radius - 2);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth={i % 3 === 0 ? 3 : 1} opacity="0.7" />
          );
        })}
        {/* Hands */}
        <line x1={center} y1={center} x2={center + Math.sin((hourAngle * Math.PI) / 180) * (radius * 0.5)} y2={center - Math.cos((hourAngle * Math.PI) / 180) * (radius * 0.5)} stroke="#6366f1" strokeWidth="5" strokeLinecap="round" />
        <line x1={center} y1={center} x2={center + Math.sin((minuteAngle * Math.PI) / 180) * (radius * 0.7)} y2={center - Math.cos((minuteAngle * Math.PI) / 180) * (radius * 0.7)} stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
        <line x1={center} y1={center} x2={center + Math.sin((secondAngle * Math.PI) / 180) * (radius * 0.85)} y2={center - Math.cos((secondAngle * Math.PI) / 180) * (radius * 0.85)} stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
        <circle cx={center} cy={center} r={5} fill="#e11d48" />
      </svg>
    );
  }
  return null;
};

export default AnalogClock; 