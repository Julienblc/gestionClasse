import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Student } from "../../interfaces";
import { sampleStudentData } from "../../utils/sample-students";

type Props = {
  isShowing: boolean;
  hide: () => void;
  student: Student;
};

const Modal = ({ isShowing, hide, student }: Props) => {
  const studentData = sampleStudentData[student.id];
  const [modifiedStudent, setModifiedStudent] = useState(studentData);
  const handleFormSubmit = (event: any) => {
    sampleStudentData[student.id] = modifiedStudent;
    event.preventDefault();
    console.log(sampleStudentData);
    hide();
  };

  const onChangeFirstname = (event: any) => {
    setModifiedStudent({ ...modifiedStudent, firstname: event.target.value });
  };

  const onChangeLastname = (event: any) => {
    setModifiedStudent({ ...modifiedStudent, lastname: event.target.value });
  };

  if (isShowing) {
    return ReactDOM.createPortal(
      <>
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <h4>Modifier {student.firstname}</h4>
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <label>
                    Prénom :
                    <input
                      type="text"
                      name="name"
                      value={modifiedStudent.firstname}
                      onChange={onChangeFirstname}
                    />
                  </label>
                  <label>
                    Nom de famille :
                    <input
                      type="text"
                      name="name"
                      value={modifiedStudent.lastname}
                      onChange={onChangeLastname}
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
  } else {
    return null;
  }
};

export default Modal;
