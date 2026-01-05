import React from 'react';

interface RadarChartProps {
  scores: { data: number, infrastructure: number, culture: number };
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 300 }) => {
  const center = size / 2;
  const radius = size * 0.4;
  
  const getPoint = (angle: number, score: number) => {
    const r = (score / 100) * radius;
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const p1 = getPoint(0, scores.data);
  const p2 = getPoint(120, scores.infrastructure);
  const p3 = getPoint(240, scores.culture);

  const pointsString = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  
  const ref1 = getPoint(0, 100);
  const ref2 = getPoint(120, 100);
  const ref3 = getPoint(240, 100);

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {[25, 50, 75, 100].map(val => (
          <polygon
            key={val}
            points={`${getPoint(0, val).x},${getPoint(0, val).y} ${getPoint(120, val).x},${getPoint(120, val).y} ${getPoint(240, val).x},${getPoint(240, val).y}`}
            fill="none"
            stroke="#EFE9E4"
            strokeWidth="1"
          />
        ))}
        <line x1={center} y1={center} x2={ref1.x} y2={ref1.y} stroke="#EFE9E4" strokeWidth="1" />
        <line x1={center} y1={center} x2={ref2.x} y2={ref2.y} stroke="#EFE9E4" strokeWidth="1" />
        <line x1={center} y1={center} x2={ref3.x} y2={ref3.y} stroke="#EFE9E4" strokeWidth="1" />
        
        <polygon
          points={pointsString}
          fill="rgba(245, 158, 11, 0.1)"
          stroke="#F59E0B"
          strokeWidth="2"
          className="transition-all duration-1000 ease-out"
        />

        <text x={ref1.x} y={ref1.y - 15} textAnchor="middle" className="text-[10px] font-bold uppercase tracking-widest fill-[#999]">Data</text>
        <text x={ref2.x + 10} y={ref2.y + 15} textAnchor="start" className="text-[10px] font-bold uppercase tracking-widest fill-[#999]">Infrastructure</text>
        <text x={ref3.x - 10} y={ref3.y + 15} textAnchor="end" className="text-[10px] font-bold uppercase tracking-widest fill-[#999]">Culture</text>
      </svg>
    </div>
  );
};
