interface ConfidenceSliderProps {
  value: number;
  onChange: (val: number) => void;
}

export function ConfidenceSlider({ value, onChange }: ConfidenceSliderProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card space-y-3">
      <h3 className="text-sm font-bold text-foreground">🎯 Rate Your Confidence</h3>
      <p className="text-xs text-muted-foreground">How confident do you feel about the current topic?</p>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>1 – Lost 😰</span>
        <span className="font-bold text-foreground text-sm">{value}</span>
        <span>10 – Got it! 🎉</span>
      </div>
    </div>
  );
}
