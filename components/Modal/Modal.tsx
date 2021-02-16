import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import ReactDOM from "react-dom";
import { toast, ToastOptions } from "react-toastify";
import useStudents from "../../hooks/students";
import { Student } from "../../interfaces";
import { ModalContext } from "./useModal";

type Props = {
  isShowing: boolean;
  hide: (context: ModalContext) => void;
  modalContext: ModalContext;
  student: Student;
};

type NotificationContext = "add" | "modify" | "delete";

const emptyStudent = {
  id: 0,
  firstname: "",
  lastname: "",
  picture_url: "",
};

const Modal = ({ isShowing, hide, modalContext, student }: Props) => {
  const [modifiedStudent, setModifiedStudent] = useState(student);
  const { students, setStudents } = useStudents();

  const toggleNotification = (
    student: Student,
    context: NotificationContext
  ) => {
    let toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    let actionWord = "";
    if (context === "add") {
      toastOptions.type = toast.TYPE.SUCCESS;
      actionWord = "créé";
    } else if (context === "modify") {
      toastOptions.type = toast.TYPE.INFO;
      actionWord = "modifié";
    } else if (context === "delete") {
      toastOptions.type = toast.TYPE.WARNING;
      actionWord = "supprimé";
    }
    toast(
      `L'élève ${student.firstname} ${student.lastname} a bien été ${actionWord}`,
      toastOptions
    );
  };

  const handleModifyFormSubmit = (event: SyntheticEvent) => {
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
      toggleNotification(modifiedStudent, "modify");
    }
  };

  const handleAddFormSubmit = (event: SyntheticEvent) => {
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
      toggleNotification(modifiedStudent, "add");
    }
  };

  const deleteUser = () => {
    if (students) {
      const newStudents = students.filter(
        (newStudent) => newStudent.id !== student.id
      );
      setStudents(newStudents);
      hide("");
      toggleNotification(student, "delete");
    }
  };

  const onChangeFirstname = (event: ChangeEvent<HTMLInputElement>) => {
    setModifiedStudent({ ...modifiedStudent, firstname: event.target.value });
  };

  const onChangeLastname = (event: ChangeEvent<HTMLInputElement>) => {
    setModifiedStudent({ ...modifiedStudent, lastname: event.target.value });
  };

  const onChangePictureUrl = (event: ChangeEvent<HTMLInputElement>) => {
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
                  <h3 className="modal-title">
                    {modalContext === "modify"
                      ? `Modifier ${student.firstname} ${student.lastname}`
                      : "Ajouter un élève"}
                  </h3>
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
                    <div className="form-input">
                      <label>Prénom :</label>
                      <input
                        type="text"
                        name="firstname"
                        value={modifiedStudent.firstname}
                        onChange={onChangeFirstname}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label>Nom de famille :</label>
                      <input
                        type="text"
                        name="lastname"
                        value={modifiedStudent.lastname}
                        onChange={onChangeLastname}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label>Image url :</label>
                      <input
                        type="text"
                        name="picture_url"
                        value={modifiedStudent.picture_url}
                        onChange={onChangePictureUrl}
                      />
                    </div>
                    <input
                      id="form-submit-button"
                      type="submit"
                      value={
                        modalContext === "modify"
                          ? `Valider les modifications`
                          : "Ajouter l'élève"
                      }
                    />
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
                  <h4 className="modal-title">
                    Supprimer {student.firstname} {student.lastname} ?
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
                  <div className="delete-user-inputs">
                    <button
                      className="delete-user-inputs__button delete-user-inputs__button-yes"
                      onClick={deleteUser}
                    >
                      Oui
                    </button>
                    <button
                      className="delete-user-inputs__button delete-user-inputs__button-no"
                      onClick={() => hide("")}
                    >
                      Non
                    </button>
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
