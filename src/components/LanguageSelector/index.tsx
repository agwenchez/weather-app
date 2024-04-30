interface LanguageSelectorProps {
  onLanguageChange: (locale: string) => void;
}

const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = e.target.value;
    onLanguageChange(selectedLocale);
  };

  return (
    <select onChange={handleLanguageSelect} className="locale-selector">
      <option value="en">English</option>
      <option value="sw">Swahili</option>
    </select>
  );
};

export default LanguageSelector;
