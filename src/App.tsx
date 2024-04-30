import "../src/scss/main.scss";
import { IntlProvider } from "react-intl";
import WeatherApp from "./pages/WeatherApp";
import English from "./translations/en.json";
import Swahili from "./translations/sw.json";
import { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
// import { Translations } from "./@types";

const App = () =>{
  const [locale, setLocale] = useState<string>("en");
  const messages: Record<string, any> = {
    en: English,
    sw: Swahili,
  };


  const handleLanguageChange = (selectedLocale: string) => {
    setLocale(selectedLocale);
  };

  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
        <WeatherApp />
      </IntlProvider>
    </>
  );
}

export default App;
