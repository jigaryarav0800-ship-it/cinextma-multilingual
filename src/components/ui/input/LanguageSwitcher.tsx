"use client";

import { supportedLanguages } from "@/config/languages";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useEffect, useState } from "react";
import { FiGlobe } from "react-icons/fi";

const LANGUAGE_KEY = "cinextma-interface-language";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && supportedLanguages.some(({ code }) => code === savedLanguage)) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const active = supportedLanguages.find(({ code }) => code === language) ?? supportedLanguages[0];

  const changeLanguage = (code: string) => {
    setLanguage(code);
    window.localStorage.setItem(LANGUAGE_KEY, code);
    document.documentElement.lang = code;
    window.dispatchEvent(new CustomEvent("cinextma:language-change", { detail: code }));
  };

  return (
    <Dropdown showArrow classNames={{ content: "min-w-52 bg-[#17171f]/95 backdrop-blur-xl" }}>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          aria-label={`Language: ${active.label}`}
          className="min-h-11 min-w-11 rounded-xl text-default-500 transition-colors hover:bg-white/10 hover:text-white"
        >
          <FiGlobe className="size-5" aria-hidden="true" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Choose interface language"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[language]}
      >
        {supportedLanguages.map((item) => (
          <DropdownItem
            key={item.code}
            value={item.code}
            textValue={`${item.label} ${item.nativeLabel}`}
            onPress={() => changeLanguage(item.code)}
          >
            <div className="flex items-center justify-between gap-4">
              <span>{item.nativeLabel}</span>
              <span className="text-xs font-semibold tracking-widest text-default-400">
                {item.flag}
              </span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
