import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import {authentication} from '../config/firebase';
import { onAuthStateChanged } from "firebase/auth";
//import { doc, updateDoc } from "firebase/firestore";


function UserProfile() {
  const [id, setId] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setId(user.uid);
        setName(user.displayName);
        setEmail(user.email);
      }
    });
  }, []);

  const saveProfile = () => {
    console.log(id);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Perfil de Usuario</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Nombre</label>
                        <Input
                          defaultValue={name || ""}
                          placeholder="Nombre"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Correo electrónico
                        </label>
                        <Input defaultValue={email || ""} placeholder="Correo electrónico" disabled type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="info" type="submit" onClick={saveProfile}>
                  Guardar
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="Default user profile"
                      className="avatar"
                      src={require("assets/img/default-avatar.png")}
                    />
                    <h5 className="title">{name || email}</h5>
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
