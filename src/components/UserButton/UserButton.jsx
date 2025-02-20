import "./UserButton.css";

function UserButton({ onButtonClick, buttonText }) {
  return (
    <button className="user-button" onClick={onButtonClick} type="button">
      {buttonText}
    </button>
  );
}

export default UserButton;
