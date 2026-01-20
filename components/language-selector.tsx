"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage, languageOptions, type Language } from "@/lib/i18n"

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile"
  isScrolled?: boolean
}

export function LanguageSelector({ variant = "desktop", isScrolled = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languageOptions.find((lang) => lang.code === language)

  if (variant === "mobile") {
    return (
      <div className="py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4">
          <Globe className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Idioma / Language</span>
        </div>
        <div className="mt-3 px-4">
          <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar idioma">
                <div className="flex items-center space-x-2">
                  <span>{currentLanguage?.flag}</span>
                  <span>{currentLanguage?.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 transition-colors ${
          isScrolled
            ? "text-gray-700 hover:text-green-600 hover:bg-gray-100"
            : "text-white hover:text-green-400 hover:bg-white/10"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage?.flag}</span>
        <span className="hidden md:inline">{currentLanguage?.name}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 py-2">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as Language)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 transition-colors ${
                  language === lang.code ? "bg-green-50 text-green-700" : "text-gray-700"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && <div className="ml-auto w-2 h-2 bg-green-600 rounded-full" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
