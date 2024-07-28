function Answers(props) {
  return (
    <div className="answers">
      {props.answers.map((elem) => {
        let color = "#94bce9a0";

        if (props.isAttempted) {
          if (elem.id === "correct-answer") {
            color = "#349639b4";
          } else if (props.clickedBtnId === elem.id) {
            color = "#c6273cbd";
          }
        }

        return (
          <button
            style={{ backgroundColor: color }}
            disabled={props.isAttempted}
            className="ans-btn"
            id={elem.id}
            onClick={props.handleAnswerClick}
            dangerouslySetInnerHTML={{ __html: elem.answer }}
          />
        );
      })}
    </div>
  );
}

export default Answers;
