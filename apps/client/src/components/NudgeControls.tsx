import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface NudgeControlsProps {
  totalNudge: number;
  onNudge: (amount: number) => void;
  disabled: boolean;
}

export const NudgeControls: React.FC<NudgeControlsProps> = ({
  totalNudge,
  onNudge,
  disabled,
}) => {
  const { watch, setValue } = useForm({
    defaultValues: {
      nudgeAmount: 10,
    },
  });

  const nudgeAmount = watch("nudgeAmount");

  const handleNudgeAmountChange = (newAmount: number) => {
    const validValues = [1, 5, 10, 20, 50, 100, 250, 500, 1000];

    // If the value is not in our predefined list, find the closest available option
    if (!validValues.includes(newAmount)) {
      const closest = validValues.reduce((prev, curr) => {
        return Math.abs(curr - newAmount) < Math.abs(prev - newAmount)
          ? curr
          : prev;
      });
      console.log(
        `Nudge amount ${newAmount} not in valid options, using closest value: ${closest}`
      );
      setValue("nudgeAmount", closest);
    } else {
      setValue("nudgeAmount", newAmount);
      console.log(`Nudge amount set to ${newAmount} ms`);
    }
  };

  return (
    <div className="relative mt-4 p-6 max-w-md w-full group">
      {/* Animated background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-violet-500/5 to-purple-500/10 backdrop-blur-xl border border-emerald-400/20 rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-emerald-500/20 group-hover:shadow-2xl group-hover:border-emerald-400/40"></div>
      
      {/* Glowing border animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with glow effect */}
        <div className="relative mb-6">
          <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-300 via-emerald-400 to-violet-300 bg-clip-text text-transparent animate-pulse">
            Microscopic Timing Controls
          </h3>
          <div className="absolute -bottom-1 left-0 h-0.5 w-16 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"></div>
        </div>

        {/* Nudge amount display with tech styling */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gradient-to-r from-slate-900/50 to-slate-800/30 rounded-xl border border-emerald-500/20">
          <span className="text-emerald-300 font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-emerald-400/50 shadow-lg"></div>
            Nudge Amount: 
            <span className="text-emerald-400 font-bold">{nudgeAmount} ms</span>
          </span>
          
          <div className="flex gap-2">
            {/* Divide by 2 button */}
            <button
              onClick={() =>
                handleNudgeAmountChange(Math.max(1, Math.floor(nudgeAmount / 2)))
              }
              className="px-3 py-2 bg-gradient-to-r from-violet-600/80 to-purple-600/80 hover:from-violet-500 hover:to-purple-500 text-white font-medium rounded-lg border border-violet-400/30 hover:border-violet-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95"
            >
              ÷2
            </button>
            
            {/* Multiply by 2 button */}
            <button
              onClick={() =>
                handleNudgeAmountChange(
                  Math.min(1000, Math.floor(nudgeAmount * 2))
                )
              }
              className="px-3 py-2 bg-gradient-to-r from-violet-600/80 to-purple-600/80 hover:from-violet-500 hover:to-purple-500 text-white font-medium rounded-lg border border-violet-400/30 hover:border-violet-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95"
            >
              ×2
            </button>
            
            {/* Custom Select with futuristic styling */}
            <div className="relative">
              <Select
                value={String(nudgeAmount)}
                onValueChange={(value) => handleNudgeAmountChange(Number(value))}
                defaultValue="10"
              >
                <SelectTrigger className="w-[110px] bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-emerald-400/30 hover:border-emerald-400/60 text-emerald-300 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                  <SelectValue placeholder="Nudge amount" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-emerald-400/30 rounded-xl">
                  <SelectItem value="1" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">1 ms</SelectItem>
                  <SelectItem value="5" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">5 ms</SelectItem>
                  <SelectItem value="10" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">10 ms</SelectItem>
                  <SelectItem value="20" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">20 ms</SelectItem>
                  <SelectItem value="50" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">50 ms</SelectItem>
                  <SelectItem value="100" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">100 ms</SelectItem>
                  <SelectItem value="250" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">250 ms</SelectItem>
                  <SelectItem value="500" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">500 ms</SelectItem>
                  <SelectItem value="1000" className="text-emerald-300 hover:bg-emerald-500/20 focus:bg-emerald-500/20">1000 ms (1s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main control buttons with enhanced futuristic design */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => onNudge(-nudgeAmount)}
            disabled={disabled}
            className="relative group/btn flex-1 px-6 py-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 hover:from-red-500/40 hover:via-orange-500/40 hover:to-red-500/40 disabled:from-gray-600/20 disabled:via-gray-500/20 disabled:to-gray-600/20 text-white font-bold rounded-xl border border-red-400/30 hover:border-red-400/60 disabled:border-gray-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25 disabled:hover:shadow-none hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-2">
              <span className="text-xl">◀</span>
              Slow Down
            </span>
          </button>
          
          <button
            onClick={() => onNudge(nudgeAmount)}
            disabled={disabled}
            className="relative group/btn flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500/30 via-green-500/30 to-emerald-500/30 hover:from-emerald-500/50 hover:via-green-500/50 hover:to-emerald-500/50 disabled:from-gray-600/20 disabled:via-gray-500/20 disabled:to-gray-600/20 text-white font-bold rounded-xl border border-emerald-400/40 hover:border-emerald-400/70 disabled:border-gray-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 disabled:hover:shadow-none hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-2">
              Speed Up
              <span className="text-xl">▶</span>
            </span>
          </button>
        </div>

        {/* Total adjustment display with futuristic styling */}
        <div className="text-center p-4 bg-gradient-to-r from-slate-900/40 via-slate-800/20 to-slate-900/40 rounded-xl border border-emerald-500/20">
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <span className="text-emerald-200">
              Total adjustment: 
              <span className={`font-bold ml-2 ${totalNudge > 0 ? 'text-emerald-400' : totalNudge < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                {totalNudge > 0 ? "+" : ""}{totalNudge} ms
              </span>
              <span className="text-violet-300 ml-2">
                ({(totalNudge / 1000).toFixed(3)} s)
              </span>
            </span>
            <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-violet-400/50"></div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute top-4 left-4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-8 right-6 w-1 h-1 bg-violet-400 rounded-full animate-ping opacity-50" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-6 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
    </div>
  );
};