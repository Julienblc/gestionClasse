import * as React from "react";
import useModal from "./Modal/useModal";
import { Student } from "../interfaces";
import Modal from "./Modal/Modal";

type Props = {
  student: Student;
};

const StudentCard = ({ student }: Props) => {
  const { isShowing, toggle } = useModal();
  return (
    <div className="student">
      <img
        src={student.picture_url}
        alt={`${student.firstname} ${student.lastname}`}
      />
      <h3>{student.firstname}</h3>
      <h3>{student.lastname}</h3>
      <button onClick={toggle}>Modifier</button>
      <button>Supprimer</button>
      <Modal isShowing={isShowing} hide={toggle} student={student} />
    </div>
  );
};

export default StudentCard;
