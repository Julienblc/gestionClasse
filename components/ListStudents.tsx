import * as React from "react";
import { Student } from "../interfaces";
import StudentCard from "./StudentCard";

type Props = {
  students: Student[];
};

const ListStudents = ({ students }: Props) => (
  <ul id="student-list">
    {students.map((student: Student) => (
      <li key={student.id}>
        <StudentCard student={student} />
      </li>
    ))}
  </ul>
);

export default ListStudents;
