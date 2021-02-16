import * as React from "react";
import useModal from "./Modal/useModal";
import { Student } from "../interfaces";
import Modal from "./Modal/Modal";

type Props = {
  student: Student;
};

const nameLimit = 11;

const StudentCard = ({ student }: Props) => {
  const { isShowing, toggle, modalContext } = useModal();

  const getStudentPictureUrl = () => {
    if (student.picture_url) {
      return student.picture_url;
    } else {
      return "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";
    }
  };

  const formatName = (name: string) => {
    if (name.length > nameLimit) {
      return `${name.slice(0, nameLimit)}..`;
    }
    return name;
  };

  return (
    <div className="student">
      <img
        className="student__picture"
        src={getStudentPictureUrl()}
        alt={`${student.firstname} ${student.lastname}`}
      />
      <h3 className="student__firstname">{formatName(student.firstname)}</h3>
      <h4 className="student__lastname">{formatName(student.lastname)}</h4>
      <button
        className="student__button student__button-modify"
        onClick={() => toggle("modify")}
      >
        Modifier
      </button>
      <button
        className="student__button student__button-delete"
        onClick={() => toggle("delete")}
      >
        Supprimer
      </button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        student={student}
        modalContext={modalContext}
      />
    </div>
  );
};

export default StudentCard;
