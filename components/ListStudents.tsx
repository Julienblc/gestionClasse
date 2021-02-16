import * as React from "react";
import { useState } from "react";
import useStudents from "../hooks/students";
import { Student } from "../interfaces";
import AddModal from "./Modal/AddModal";
import Modal from "./Modal/Modal";
import useModal from "./Modal/useModal";
import StudentCard from "./StudentCard";

const ListStudents = () => {
  const { students } = useStudents();
  const [searchStudent, setSearchStudent] = useState("");
  const { isShowing, toggle } = useModal();

  const renderStudents = () => {
    if (students) {
      if (searchStudent === "") {
        return students.map((student: Student) => (
          <li key={student.id}>
            <StudentCard student={student} />
          </li>
        ));
      } else {
        return students.map((student: Student) => {
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
    <div>
      <input
        type="text"
        name="search"
        placeholder="Rechercher un élève"
        value={searchStudent}
        onChange={onChangeSearch}
      />
      <button onClick={() => toggle("add")}>Ajouter un élève</button>
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
    </div>
  );
};

export default ListStudents;
