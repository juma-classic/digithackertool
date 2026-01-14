import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TickChart({ ticks }) {
  if (!ticks || ticks.length === 0) return null;

  const data = ticks.slice(-20).map((tick, idx) => ({
    index: idx,
    price: tick.quote,
    digit: Math.floor(tick.quote * 10) % 10
  }));

  return (
    <div className="bg-black/30 rounded-xl p-4 mt-4">
      <p className="text-xs text-gray-400 mb-2">LAST 20 TICKS</p>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <XAxis dataKey="index" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #333',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#60a5fa" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex gap-1 mt-2 flex-wrap">
        {data.map((d, idx) => (
          <div
            key={idx}
            className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
              d.digit % 2 === 0 ? 'bg-green-500/30 text-green-300' : 'bg-purple-500/30 text-purple-300'
            }`}
          >
            {d.digit}
          </div>
        ))}
      </div>
    </div>
  );
}
