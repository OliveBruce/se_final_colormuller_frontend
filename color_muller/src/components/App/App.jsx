import { useState } from "react";
import "./App.css";

import Header from "../Header/Header";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import SignUpModal from "../SignUpModal/SignUpModal";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const onSignUpClick = () => {
    setActiveModal("signup");
  };
  const handleClose = () => {
    setActiveModal("");
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header onSignUpClick={onSignUpClick} />
      </div>
      <SignUpModal activeModal={activeModal} handleClose={handleClose} />
    </div>
  );
}

export default App;
