import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function SortQuestions() {
  const [questionList, setQuestionList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "ClassifierQuestion"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        list.push(doc.data());
      });
      setQuestionList(list);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Preguntas Clasificadas</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th hidden>#</th>
                      <th>Pregunta</th>
                      <th className="text-center">Palabras Claves</th>
                      <th className="text-center">Nivel Bloom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      questionList.map((q) => 
                        <tr key={q.id}>
                          <th scope="row" hidden>{q.id}</th>
                          <td>{q.question}</td>
                          <td className="text-center">{q.keyword}</td>
                          <td className="text-center">{q.level}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SortQuestions;
