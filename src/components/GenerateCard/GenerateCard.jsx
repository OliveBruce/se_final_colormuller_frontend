import "./GenerateCard.css";

function GenerateCard({ title, children, onGenerateClick, currentBGTheme }) {
  return (
    <div className="generate-card">
      <button
        onClick={onGenerateClick}
        type="button"
        className={
          "generate-card__content" +
          (currentBGTheme === "light"
            ? " generate-card__content--light"
            : " generate-card__content--dark")
        }
      >
        <h2 className="generate-card__title">{title}</h2>
        {children}
        <p className="generate-card__footer">Click here!</p>
      </button>
    </div>
  );
}

export default GenerateCard;
