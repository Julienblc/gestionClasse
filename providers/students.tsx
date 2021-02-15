import { createContext, useState } from "react";
import { Student } from "../interfaces";

type StudentsResponse = Student[];

type ContextProps = {
  students: StudentsResponse | null;
  setStudents: (students: StudentsResponse | null) => void;
};

export const StudentsContext = createContext<ContextProps>({
  students: null,
  setStudents: () => null,
});

const StudentsProvider: React.FC<{
  students: StudentsResponse | null;
}> = ({ students, children }) => {
  const [
    currentStudents,
    setCurrentStudents,
  ] = useState<StudentsResponse | null>(students);
  return (
    <StudentsContext.Provider
      value={{
        students: currentStudents,
        setStudents: setCurrentStudents,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
