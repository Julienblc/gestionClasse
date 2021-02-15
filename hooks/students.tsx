import { useContext } from "react";
import { StudentsContext } from "../providers/students";

const useStudents = () => {
  const context = useContext(StudentsContext);
  return context;
};

export default useStudents;
