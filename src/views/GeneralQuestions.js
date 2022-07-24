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

function GeneralQuestions() {
  const [questionList, setQuestionList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "GeneralQuestion"));
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
                <CardTitle tag="h4">Preguntas Generales - Sin Clasificar</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th hidden>#</th>
                      <th className="text-center">Pregunta</th>
                      <th className="text-center">Opción 1</th>
                      <th className="text-center">Opción 2</th>
                      <th className="text-center">Opción 3</th>
                      <th className="text-center">Respuesta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      questionList.map((q) => 
                        <tr key={q.id}>
                          <th scope="row" hidden>{q.id}</th>
                          <td>{q.question}</td>
                          <td className="text-center">{q.option1}</td>
                          <td className="text-center">{q.option2}</td>
                          <td className="text-center">{q.option3}</td>
                          <td className="text-center">Op. {q.idCorrect}</td>
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

export default GeneralQuestions;
