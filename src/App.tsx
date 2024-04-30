import "../src/scss/main.scss";
import { IntlProvider } from "react-intl";
import WeatherApp from "./pages/WeatherApp";
import translations from "../sw.json";
import { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";

const App = () =>{
  const messages = translations[locale];
  const [locale, setLocale] = useState("en");

  const handleLanguageChange = (selectedLocale: string) => {
    setLocale(selectedLocale);
  };

  return (
    <>
      <IntlProvider locale={locale} messages={messages}>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
        <WeatherApp />
      </IntlProvider>
    </>
  );
}

export default App;
