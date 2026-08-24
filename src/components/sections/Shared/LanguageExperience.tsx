"use client";

import { supportedLanguages } from "@/config/languages";
import { Card, CardBody, Chip, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { FiCheck, FiGlobe, FiHeadphones, FiMic } from "react-icons/fi";

const TARGET_LANGUAGE_KEY = "cinextma-target-audio-language";

type LanguageExperienceProps = {
  availableAudioLanguages: string[];
};

const LanguageExperience = ({ availableAudioLanguages }: LanguageExperienceProps) => {
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [mode, setMode] = useState("official");

  useEffect(() => {
    const saved = window.localStorage.getItem(TARGET_LANGUAGE_KEY);
    if (saved && supportedLanguages.some(({ code }) => code === saved)) setTargetLanguage(saved);
  }, []);

  const updateTargetLanguage = (value: string) => {
    setTargetLanguage(value);
    window.localStorage.setItem(TARGET_LANGUAGE_KEY, value);
  };

  const selected = supportedLanguages.find(({ code }) => code === targetLanguage) ?? supportedLanguages[0];
  // TMDB spoken-language metadata is not proof that a verified human-dubbed track exists.
  // A playback adapter must pass provider-verified audio tracks into this component.
  const hasOfficialTrack = availableAudioLanguages.includes(targetLanguage);

  return (
    <Card className="mt-4 border border-white/10 bg-white/[0.035]">
      <CardBody className="gap-5 p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">
              <FiHeadphones aria-hidden="true" />
              Language experience
            </div>
            <h2 className="text-xl font-bold text-white md:text-2xl">Choose how you want to listen</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              The app remembers your preferred language. Official audio tracks work immediately when the provider offers
              them; live translated voice is reserved for licensed sources that allow audio processing.
            </p>
          </div>
          <Select
            aria-label="Choose target audio language"
            selectedKeys={[targetLanguage]}
            onChange={(event) => updateTargetLanguage(event.target.value || "hi")}
            className="w-full md:max-w-52"
            size="sm"
            startContent={<FiGlobe aria-hidden="true" />}
          >
            {supportedLanguages.map((language) => (
              <SelectItem key={language.code} textValue={`${language.label} ${language.nativeLabel}`}>
                {language.nativeLabel}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="grid gap-3 md:grid-cols-3" role="radiogroup" aria-label="Audio mode">
          <button
            type="button"
            role="radio"
            aria-checked={mode === "original"}
            onClick={() => setMode("original")}
            className={`min-h-20 rounded-xl border p-4 text-left transition-colors duration-200 ${
              mode === "original"
                ? "border-rose-300/60 bg-rose-300/10"
                : "border-white/10 bg-black/15 hover:border-white/25"
            }`}
          >
            <span className="flex items-center gap-2 font-semibold text-white">
              <FiHeadphones aria-hidden="true" /> Original audio
            </span>
            <span className="mt-1 block text-xs text-white/50">Keep the source soundtrack unchanged.</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={mode === "official"}
            onClick={() => setMode("official")}
            className={`min-h-20 rounded-xl border p-4 text-left transition-colors duration-200 ${
              mode === "official"
                ? "border-emerald-300/60 bg-emerald-300/10"
                : "border-white/10 bg-black/15 hover:border-white/25"
            }`}
          >
            <span className="flex items-center gap-2 font-semibold text-white">
              <FiCheck aria-hidden="true" /> Official track
            </span>
            <span className="mt-1 block text-xs text-white/50">
              {hasOfficialTrack ? `${selected.nativeLabel} human-dubbed track verified.` : "No verified human-dubbed track reported yet."}
            </span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={mode === "live-dub"}
            onClick={() => setMode("live-dub")}
            className={`min-h-20 rounded-xl border p-4 text-left transition-colors duration-200 ${
              mode === "live-dub"
                ? "border-sky-300/60 bg-sky-300/10"
                : "border-white/10 bg-black/15 hover:border-white/25"
            }`}
          >
            <span className="flex items-center gap-2 font-semibold text-white">
              <FiMic aria-hidden="true" /> Live translated voice
            </span>
            <span className="mt-1 block text-xs text-white/50">Available only with an authorized audio source.</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/50">
          <Chip size="sm" variant="flat" color={hasOfficialTrack ? "success" : "default"}>
            {hasOfficialTrack ? "Human-dubbed track verified" : "Provider verification required"}
          </Chip>
          <span>Selected target: {selected.nativeLabel}</span>
          <span>Live voice translation requires an authorized source and translation service.</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default LanguageExperience;
