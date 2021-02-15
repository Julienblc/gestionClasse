import * as React from "react";
import useStudents from "../hooks/students";
import { Student } from "../interfaces";
import StudentCard from "./StudentCard";

const ListStudents = () => {
  const { students } = useStudents();
  if (students) {
    return (
      <ul id="student-list">
        {students.map((student: Student) => (
          <li key={student.id}>
            <StudentCard student={student} />
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

export default ListStudents;
