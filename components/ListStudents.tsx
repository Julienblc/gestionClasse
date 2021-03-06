import * as React from "react";
import { ChangeEvent, useState } from "react";
import useStudents from "../hooks/students";
import { Student } from "../interfaces";
import EmptyPlaceholder from "./EmptyPlaceholder";
import Modal from "./Modal/Modal";
import useModal from "./Modal/useModal";
import StudentCard from "./StudentCard";
import Image from "next/image";

const ListStudents = () => {
  const { students } = useStudents();
  const [searchStudent, setSearchStudent] = useState("");
  const { isShowing, toggle } = useModal();

  const renderStudents = () => {
    if (students) {
      // Sort Students by lastname A -> Z
      const sortedStudents = [...students].sort((student1, student2) => {
        if (student1.lastName.toLowerCase() < student2.lastName.toLowerCase()) {
          return -1;
        }
        if (student1.lastName.toLowerCase() > student2.lastName.toLowerCase()) {
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
        // Check by firstname AND lastname
        return sortedStudents.map((student: Student) => {
          if (
            student.firstName
              .toLowerCase()
              .includes(searchStudent.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchStudent.toLowerCase())
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

  const renderStudentsPlaceholder = () => {
    if (students && students.length > 0) {
      return <ul id="student-list">{renderStudents()}</ul>;
    } else {
      return <EmptyPlaceholder addStudent={() => toggle("add")} />;
    }
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchStudent(event.target.value);
  };

  return (
    <>
      <div id="actions-container">
        <button className="add-student-button" onClick={() => toggle("add")}>
          <Image src="/images/add.png" alt="me" width="16" height="16" />
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

      {renderStudentsPlaceholder()}
      <Modal
        isShowing={isShowing}
        hide={toggle}
        student={{
          id: "",
          firstName: "",
          lastName: "",
          picture: "",
        }}
        modalContext="add"
      />
    </>
  );
};

export default ListStudents;
