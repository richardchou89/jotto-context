import { useSuccess } from "./contexts/successContext";
import { useLanguage } from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const Congrats = () => {
  const [success] = useSuccess();
  const language = useLanguage();

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  }

  return <div data-test="component-congrats" />;
};

export default Congrats;
