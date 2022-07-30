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

function Users() {
  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setUserList(list);
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
                <CardTitle tag="h3">Usuarios</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th hidden>#</th>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userList.map((q) => 
                        <tr key={q.id}>
                          <th scope="row" hidden>{q.id}</th>
                          <td className="text-center">{q.name}</td>
                          <td className="text-center">{q.email}</td>
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

export default Users;
