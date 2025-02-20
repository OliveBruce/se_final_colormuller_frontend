import React from "react";

const CurrentBackgroundPreference = React.createContext({
  currentBGTheme: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentBackgroundPreference };
