import * as React from "react";
import { useState } from "react";
import useStudents from "../hooks/students";
import { Student } from "../interfaces";
import Modal from "./Modal/Modal";
import useModal from "./Modal/useModal";
import StudentCard from "./StudentCard";

const ListStudents = () => {
  const { students } = useStudents();
  const [searchStudent, setSearchStudent] = useState("");
  const { isShowing, toggle } = useModal();

  const renderStudents = () => {
    if (students) {
      const sortedStudents = [...students].sort((student1, student2) => {
        if (student1.lastname.toLowerCase() < student2.lastname.toLowerCase()) {
          return -1;
        }
        if (student1.lastname.toLowerCase() > student2.lastname.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      if (searchStudent === "") {
        return sortedStudents.map((student: Student) => (
          <li key={student.id}>
            <StudentCard student={student} />
          </li>
        ));
      } else {
        return sortedStudents.map((student: Student) => {
          if (
            student.firstname.toLowerCase().includes(searchStudent) ||
            student.lastname.toLowerCase().includes(searchStudent)
          ) {
            return (
              <li key={student.id}>
                <StudentCard student={student} />
              </li>
            );
          }
        });
      }
    }
  };

  const onChangeSearch = (event: any) => {
    setSearchStudent(event.target.value);
  };

  return (
    <>
      <div id="actions-container">
        <button id="add-student-button" onClick={() => toggle("add")}>
          Ajouter un élève
        </button>
        <input
          type="text"
          name="search"
          placeholder="Rechercher un élève par nom"
          id="search-student-input"
          value={searchStudent}
          onChange={onChangeSearch}
        />
      </div>

      <ul id="student-list">{renderStudents()}</ul>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        student={{
          id: 0,
          firstname: "",
          lastname: "",
          picture_url: "",
        }}
        modalContext="add"
      />
    </>
  );
};

export default ListStudents;
