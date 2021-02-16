import React, { useState } from "react";
import ReactDOM from "react-dom";
import useStudents from "../../hooks/students";
import { Student } from "../../interfaces";
import { ModalContext } from "./useModal";

type Props = {
  isShowing: boolean;
  hide: (context: ModalContext) => void;
  modalContext: ModalContext;
  student: Student;
};

const emptyStudent = {
  id: 0,
  firstname: "",
  lastname: "",
  picture_url: "",
};

const Modal = ({ isShowing, hide, modalContext, student }: Props) => {
  const [modifiedStudent, setModifiedStudent] = useState(student);
  const { students, setStudents } = useStudents();

  const handleModifyFormSubmit = (event: any) => {
    if (students) {
      let newStudents = students.map((newStudent) => {
        if (newStudent.id === student.id) {
          return modifiedStudent;
        } else {
          return newStudent;
        }
      });
      setStudents(newStudents);
      event.preventDefault();
      hide("");
    }
  };

  const handleAddFormSubmit = (event: any) => {
    if (students) {
      const sortStudents = [...students].sort(
        (student1, student2) => student1.id - student2.id
      );
      const lastStudent = sortStudents.pop();
      let newStudentIndex = 0;
      if (lastStudent) {
        newStudentIndex = lastStudent.id + 1;
      } else {
        newStudentIndex = 1;
      }
      const newStudents = [
        ...students,
        { ...modifiedStudent, id: newStudentIndex },
      ];
      setStudents(newStudents);
      event.preventDefault();
      setModifiedStudent(emptyStudent);
      hide("");
    }
  };

  const deleteUser = () => {
    if (students) {
      const newStudents = students.filter(
        (newStudent) => newStudent.id !== student.id
      );
      setStudents(newStudents);
      hide("");
    }
  };

  const onChangeFirstname = (event: any) => {
    setModifiedStudent({ ...modifiedStudent, firstname: event.target.value });
  };

  const onChangeLastname = (event: any) => {
    setModifiedStudent({ ...modifiedStudent, lastname: event.target.value });
  };

  const onChangePictureUrl = (event: any) => {
    setModifiedStudent({ ...modifiedStudent, picture_url: event.target.value });
  };

  if (isShowing) {
    if (modalContext === "modify" || modalContext === "add") {
      return ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4>
                    {modalContext === "modify"
                      ? `Modifier ${student.firstname} ${student.lastname}`
                      : "Ajouter un élève"}
                  </h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={() => hide("")}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={
                      modalContext === "modify"
                        ? handleModifyFormSubmit
                        : handleAddFormSubmit
                    }
                  >
                    <label>
                      Prénom :
                      <input
                        type="text"
                        name="firstname"
                        value={modifiedStudent.firstname}
                        onChange={onChangeFirstname}
                      />
                    </label>
                    <label>
                      Nom de famille :
                      <input
                        type="text"
                        name="lastname"
                        value={modifiedStudent.lastname}
                        onChange={onChangeLastname}
                        required
                      />
                    </label>
                    <label>
                      Image url :
                      <input
                        type="text"
                        name="picture_url"
                        value={modifiedStudent.picture_url}
                        onChange={onChangePictureUrl}
                      />
                    </label>
                    <input type="submit" value="Envoyer" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      );
    } else if (modalContext === "delete") {
      return ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4>Supprimer {student.firstname}</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={() => hide("")}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <button onClick={deleteUser}>Oui</button>
                    <button onClick={() => hide("")}>Non</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      );
    }
  }
  return null;
};

export default Modal;
