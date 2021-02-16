import * as React from "react";

type Props = {
  addStudent: () => void;
};

const EmptyPlaceholder = (props: Props) => {
  return (
    <div id="empty-placeholder">
      <h1>Aucun élève trouvé 😕</h1>
      <h2>Vous pouvez en rajouter un dès maintenant : </h2>
      <button className="add-student-button" onClick={props.addStudent}>
        Ajouter un élève
      </button>
    </div>
  );
};

export default EmptyPlaceholder;
