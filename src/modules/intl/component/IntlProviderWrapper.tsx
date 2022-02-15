import { IntlProvider } from "react-intl";
import { connect } from "react-redux";

import { AppState } from "../../../redux/reducers";
import enMessages from "../en.json";
import viMessages from "../vi.json";

function getMessages(locale: string) {
  if (locale === "vi") {
    return viMessages;
  }
  return enMessages;
}

const StateToProps = (state: AppState) => ({
  messages: getMessages(state.intl.locale),
  locale: state.intl.locale,
});

export default connect(StateToProps)(IntlProvider);
