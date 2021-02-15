import { createContext, useState } from "react";
import { Student } from "../interfaces";

type StudentsArray = Student[];

type ContextProps = {
  readonly students: StudentsArray | null;
  readonly setStudents: (students: StudentsArray | null) => void;
};

export const StudentsContext = createContext<ContextProps>({
  students: null,
  setStudents: () => null,
});

const StudentsProvider: React.FC<{
  students: StudentsArray | null;
}> = ({ students, children }) => {
  const [currentStudents, setCurrentStudents] = useState<StudentsArray | null>(
    students
  );
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
