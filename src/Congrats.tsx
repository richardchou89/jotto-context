import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";
import stringsModule from './helpers/strings'
import { useContext } from "react";

const Congrats = () => {
  const [success] = successContext.useSuccess();
  const language = useContext(languageContext)

  if (success) {
    return <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        {stringsModule.getStringByLanguage(language, 'congrats')}
      </span>
    </div>
  }

  return <div data-test="component-congrats" />
}

export default Congrats;