import ListStudents from "../components/ListStudents";
import { sampleStudentData } from "../utils/sample-students";

const IndexPage = () => (
  <div id="class-container">
    <h1>Gestion de la classe</h1>
    <ListStudents students={sampleStudentData} />
  </div>
);

export default IndexPage;
