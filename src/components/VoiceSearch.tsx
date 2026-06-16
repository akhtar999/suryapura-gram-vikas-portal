"use client";

import { useRef, useState } from "react";
import { MicIcon, SearchIcon } from "./icons";

/** Minimal typing for the vendor-prefixed Web Speech API. */
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

const VoiceSearch = () => {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const toggleVoice = () => {
    if (typeof window === "undefined") return;

    const Ctor =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike })
        .SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike })
        .webkitSpeechRecognition;

    if (!Ctor) {
      // No support — focus the field so the user can type instead.
      document.getElementById("village-search")?.focus();
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new Ctor();
    recognition.lang = "hi-IN";
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setQuery(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-4 shadow-[0_2px_12px_-6px_oklch(0.31_0.072_152/0.5)] focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
    >
      <SearchIcon className="h-5 w-5 shrink-0 text-ink-soft" />
      <label htmlFor="village-search" className="sr-only">
        Search schemes, prices, certificates — योजना, भाव, प्रमाण पत्र खोजें
      </label>
      <input
        id="village-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search schemes, prices, certificates…"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] text-ink-strong outline-none placeholder:text-ink-soft"
      />
      <button
        type="button"
        onClick={toggleVoice}
        aria-pressed={listening}
        aria-label={listening ? "Stop voice search" : "Search by voice — आवाज़ से खोजें"}
        title="Search by voice — आवाज़ से खोजें"
        className={`pulse-mic relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-on-gold transition-transform hover:scale-105 active:scale-95 ${
          listening ? "ring-2 ring-gold-strong ring-offset-2 ring-offset-surface" : ""
        }`}
        style={{
          background:
            "linear-gradient(135deg, var(--color-gold), var(--color-gold-strong))",
        }}
      >
        {listening && (
          <span className="absolute inset-0 animate-ping rounded-full bg-gold-strong/40" />
        )}
        <MicIcon className="relative h-5 w-5" />
      </button>
    </form>
  );
};

export default VoiceSearch;
