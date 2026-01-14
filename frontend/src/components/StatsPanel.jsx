import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function StatsPanel({ ticks }) {
  if (!ticks || ticks.length < 10) return null;

  const digits = ticks.map(t => Math.floor(t.quote * 10) % 10);
  const evenCount = digits.filter(d => d % 2 === 0).length;
  const oddCount = digits.length - evenCount;
  
  const overRange = [4, 5, 6, 7];
  const underRange = [2, 3, 4, 5];
  const overCount = digits.filter(d => overRange.includes(d)).length;
  const underCount = digits.filter(d => underRange.includes(d)).length;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-3 border border-green-500/30">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs text-gray-400">EVEN</span>
        </div>
        <div className="text-2xl font-bold text-green-300">{evenCount}</div>
        <div className="text-xs text-gray-400">{((evenCount/digits.length)*100).toFixed(0)}%</div>
      </div>

      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-3 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-1">
          <TrendingDown className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-gray-400">ODD</span>
        </div>
        <div className="text-2xl font-bold text-purple-300">{oddCount}</div>
        <div className="text-xs text-gray-400">{((oddCount/digits.length)*100).toFixed(0)}%</div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-3 border border-blue-500/30">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-gray-400">TICKS</span>
        </div>
        <div className="text-2xl font-bold text-blue-300">{digits.length}</div>
        <div className="text-xs text-gray-400">Last 30</div>
      </div>
    </div>
  );
}
