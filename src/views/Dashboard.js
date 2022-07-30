import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function Dashboard(props) {
  const [countUsers, setCountUsers] = React.useState(0);
  const [countQuestions, setCountQuestions] = React.useState(0);
  const [countQuestions2, setCountQuestions2] = React.useState(0);
  const [countKeywords, setCountKeywords] = React.useState(0);
  const [countLevels, setCountLevels] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      const list1 = [];
      const list2 = [];
      const list3 = [];
      const list4 = [];
      const list5 = [];
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach((doc) => {
        list1.push(doc.data());
      });
      
      const querySnapshot2 = await getDocs(collection(db, "GeneralQuestion"));
      querySnapshot2.forEach((doc) => {
        list2.push(doc.data());
      });

      const querySnapshot3 = await getDocs(collection(db, "ClassifierQuestion"));
      querySnapshot3.forEach((doc) => {
        list3.push(doc.data());
      });

      const querySnapshot4 = await getDocs(collection(db, "KeyWords"));
      querySnapshot4.forEach((doc) => {
        list4.push(doc.data());
      });

      const querySnapshot5 = await getDocs(collection(db, "Level"));
      querySnapshot5.forEach((doc) => {
        list5.push(doc.data());
      });     
      
      setCountUsers(list1.length);
      setCountQuestions(list2.length);
      setCountQuestions2(list3.length);
      setCountKeywords(list4.length);
      setCountLevels(list5.length);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total de Usuarios</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> {countUsers}
                </CardTitle>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total de Preguntas</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-spaceship text-primary" />{" "}
                  {countQuestions}
                </CardTitle>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total de Preguntas Clasificadas</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-spaceship text-success" /> {countQuestions2}
                </CardTitle>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total de Palabras Claves</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-spaceship text-success" /> 
                  {countKeywords}
                </CardTitle>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total de Niveles</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-spaceship text-success" /> 
                  {countLevels}
                </CardTitle>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    </>
  );
}

export default Dashboard;
