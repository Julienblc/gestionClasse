import * as React from "react";
import { useState } from "react";
import useStudents from "../hooks/students";
import { Student } from "../interfaces";
import StudentCard from "./StudentCard";

const ListStudents = () => {
  const { students } = useStudents();
  const [searchStudent, setSearchStudent] = useState("");

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
      <ul id="student-list">{renderStudents()}</ul>
    </div>
  );
};

export default ListStudents;
