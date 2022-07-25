import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { db } from "../config/firebase";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";

function KeyWords() {
  const [keyWordsList, setKeyWordsList] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const [level, setLevel] = React.useState(null);
  const [words, setWords] = React.useState(null);

  const toggle = () => setOpenModal(!openModal);

  React.useEffect(() => {
    async function fetchData() {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "KeyWords"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        list.push(doc.data());
      });
      setKeyWordsList(list);
    }
    fetchData();
  }, []);

  const createQuestion = async () => {
    if (!level || !words) {
      alert("Debe ingresar el nivel y la palabra clave!");
    } else {
        const id = generateId(10);
        const data = {
            id: id,
            level: level,
            word: words.toLowerCase(),
        };

        await setDoc(doc(db, "KeyWords", id), data);
        setOpenModal(false);
        setLevel(null);
        setWords(null);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Palabras Clave{" "}
                  <Button onClick={() => setOpenModal(true)} color="info">
                    <i
                      className="tim-icons icon-simple-add"
                      style={{
                        marginRight: 20,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    />{" "}
                    Añadir Palabra Clave
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th hidden>#</th>
                      <th className="text-center">Nivel</th>
                      <th className="text-center">Palabra</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyWordsList.map((q) => (
                      <tr key={q.id}>
                        <th scope="row" hidden>
                          {q.id}
                        </th>
                        <td className="text-center">{q.level}</td>
                        <td className="text-center">{q.word}</td>
                        <td className="text-center"></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={openModal} toggle={toggle} size={"lg"}>
          <ModalHeader toggle={toggle}>
            Agregar nueva palabra clave
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm={4}>
                <Input
                  id="level"
                  name="level"
                  type="select"
                  style={{ color: "black" }}
                  onChange={(ev) => setLevel(ev.target.value)}
                >
                  <option value="0">Seleccione el nivel</option>
                  <option value="1">Nivel 1 - Recordar</option>
                  <option value="2">Nivel 2 - Comprender</option>
                  <option value="3">Nivel 3 - Aplicar</option>
                  <option value="4">Nivel 4 - Analizar</option>
                  <option value="5">Nivel 5 - Evaluar</option>
                  <option value="6">Nivel 6 - Crear</option>
                </Input>
              </Col>
              <br />
              <br />
              <Col sm={8}>
                <Input
                  defaultValue={words || ""}
                  placeholder="Escribe la palabra clave"
                  type="text"
                  onChange={(ev) => setWords(ev.target.value)}
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter style={{ padding: 25 }}>
            <Button onClick={createQuestion} color="info">
              <i
                className="tim-icons icon-simple-add"
                style={{ marginRight: 20, fontWeight: "bold", fontSize: 16 }}
              />{" "}
              Guardar
            </Button>
            <Button onClick={toggle} color="danger">
              <i
                className="tim-icons icon-simple-remove"
                style={{ marginRight: 20, fontWeight: "bold", fontSize: 16 }}
              />{" "}
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default KeyWords;

function generateId(n) {
  var add = 1,
    max = 10 - add;

  if (n > max) {
    return generateId(max) + generateId(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}
