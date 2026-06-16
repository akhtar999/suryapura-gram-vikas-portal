"use client";

import { useState } from "react";
import { Search, Check, Clock, FileText } from "lucide-react";

const steps = [
  { label: "दर्ज", labelEn: "Filed", icon: FileText },
  { label: "समीक्षा", labelEn: "Review", icon: Search },
  { label: "कार्रवाई", labelEn: "Action", icon: Clock },
  { label: "हल", labelEn: "Resolved", icon: Check },
];

/** Demo complaints for lookup */
const demoComplaints: Record<string, { step: number; issue: string; issueHi: string; date: string }> = {
  "SP-2026-001": { step: 3, issue: "Broken hand-pump in Ward 3", issueHi: "वार्ड 3 में हैंड-पंप ख़राब", date: "2 Jun 2026" },
  "SP-2026-002": { step: 1, issue: "Street light not working", issueHi: "स्ट्रीट लाइट बंद", date: "10 Jun 2026" },
  "SP-2026-003": { step: 4, issue: "Drainage overflow near school", issueHi: "स्कूल के पास नाली उभरी", date: "28 May 2026" },
};

const GrievanceTracker = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<null | { step: number; issue: string; issueHi: string; date: string }>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const key = inputValue.trim().toUpperCase();
    if (demoComplaints[key]) {
      setResult(demoComplaints[key]);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-gradient-to-b from-surface to-surface-sunk/50 p-5 sm:p-6 shadow-[0_20px_50px_-30px_var(--glow-green)]">
      <h3 className="font-display text-lg font-bold text-ink-strong">
        शिकायत स्थिति
        <span className="block text-sm font-semibold text-primary mt-0.5">
          Track Your Grievance
        </span>
      </h3>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setNotFound(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="SP-2026-001"
          className="flex-1 bg-surface border border-line rounded-xl px-3.5 py-2.5 text-sm text-ink-strong placeholder:text-ink-soft/50 focus:outline-none focus:border-primary transition-colors duration-200"
        />
        <button
          onClick={handleSearch}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-transform active:scale-95 hover:bg-primary-deep cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">खोजें</span>
        </button>
      </div>

      <p className="mt-2 text-[0.68rem] text-ink-soft">
        डेमो: SP-2026-001, SP-2026-002, SP-2026-003 आज़माएं
      </p>

      {/* Result Stepper */}
      {result && (
        <div className="mt-5 animate-rise">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-ink-strong">{result.issueHi}</p>
              <p className="text-[0.72rem] text-ink-soft">{result.issue}</p>
            </div>
            <span className="text-[0.68rem] text-ink-soft shrink-0 ml-2">{result.date}</span>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-0">
            {steps.map((step, i) => {
              const isComplete = i < result.step;
              const isCurrent = i === result.step - 1;
              const StepIcon = step.icon;

              return (
                <div key={step.label} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 ${
                        isComplete
                          ? "bg-primary text-on-primary shadow-[0_6px_16px_-6px_var(--glow-green)]"
                          : isCurrent
                          ? "bg-gold-soft text-ochre border-2 border-gold-strong animate-pulse"
                          : "bg-surface-sunk text-ink-soft border border-line"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="h-4 w-4 stroke-[3]" />
                      ) : (
                        <StepIcon className="h-4 w-4" />
                      )}
                    </span>
                    <span className="text-center leading-tight">
                      <span
                        className={`block text-[0.68rem] font-bold ${
                          isComplete || isCurrent ? "text-ink-strong" : "text-ink-soft"
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="block text-[0.58rem] text-ink-soft">{step.labelEn}</span>
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 mx-1.5">
                      <div
                        className={`h-0.5 rounded-full transition-all duration-700 ${
                          i < result.step - 1
                            ? "bg-primary"
                            : "bg-line"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {result.step === 4 && (
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-soft/50 border border-primary/15 text-xs font-bold text-primary">
              <Check className="h-3.5 w-3.5" />
              समस्या हल हो गई है · Issue has been resolved
            </div>
          )}
        </div>
      )}

      {notFound && inputValue.trim() && (
        <div className="mt-4 px-3 py-2.5 rounded-xl bg-gold-soft/50 border border-gold-strong/20 text-xs font-semibold text-ochre animate-rise">
          शिकायत नंबर नहीं मिला · Complaint not found. कृपया सही नंबर डालें।
        </div>
      )}
    </div>
  );
};

export default GrievanceTracker;
