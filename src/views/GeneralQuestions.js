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
  Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { db } from '../config/firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";

function GeneralQuestions() {
  const [questionList, setQuestionList] = React.useState([]);
  
  const [openModal, setOpenModal] = React.useState(false);
  const [question, setQuestion] = React.useState(null);
  const [option1, setOption1] = React.useState(null);
  const [option2, setOption2] = React.useState(null);
  const [option3, setOption3] = React.useState(null);
  const [idCorrect, setIdCorrect] = React.useState(null);
  const [keywordList, setKeywordList] = React.useState(null);

  let arrayDeCadenas = [];
  let separador = ' ';

  const toggle = () => setOpenModal(!openModal);

  React.useEffect(() => {
    async function fetchData() {
      const list = [];
      const keywords = [];
      const querySnapshot = await getDocs(collection(db, "GeneralQuestion"));
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setQuestionList(list);
      const querySnapshot2 = await getDocs(collection(db, "KeyWords"));
      querySnapshot2.forEach((doc) => {
        keywords.push(doc.data());
      });
      setKeywordList(keywords);
    }
    fetchData();
  }, []);

  const createQuestion = async() => {
    if(!question || !option1 || !option2 || !option3){
      alert('Debe ingresar la pregunta y sus opciones de respuesta!');
    } else if (!idCorrect){
      alert('Debe especificar la opción correcta (1-3)');
    } else {
      const objQuestion = {
        id: generateId(10),
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        idCorrect: idCorrect,
      };

      const docRef = await addDoc(collection(db, "GeneralQuestion"), objQuestion);
      setOpenModal(false);
      console.log("Document written with ID: ", docRef.id);
      questionClassifier(objQuestion);
    }
  }

  const questionClassifier = (obj) => {
    console.log(obj);
    let key = obj.question.toLowerCase();
    let palabra;
    let encontroPalabra = false;
    let level;
    
    arrayDeCadenas = key.split(separador);

    for (const item of keywordList) {
      for (var i=0; i < arrayDeCadenas.length; i++) {
        palabra = arrayDeCadenas[i];
        if(palabra === item.word){
          console.log("Palabra encontrada: " + item.word);
          level = item.level
          encontroPalabra = true;
        }
      }
    }

    if(encontroPalabra){
      const newObj = {
        id: generateId(10),
        question: obj.question,
        option1:  obj.option1,
        option2:  obj.option2,
        option3:  obj.option3,
        idCorrect: obj.idCorrect,
        level: level,
      }
      saveClassifierQuestion(newObj);
    } else {
      console.log('NO se clasificó ninguna pregunta!');
    }
  }

  async function saveClassifierQuestion(obj){
    console.log(obj);
    const docRef = await addDoc(collection(db, "ClassifierQuestion"), obj);
    console.log("Pregunta clasificada con ID: ", docRef.id);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Preguntas Generales - Sin Clasificar  {' '} 
                  <Button onClick={() => setOpenModal(true)} color="info">
                    <i className="tim-icons icon-simple-add" style={{marginRight: 20, fontWeight: 'bold', fontSize: 16,}}/> Crear Pregunta
                  </Button>
                </CardTitle>
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

        <Modal isOpen={openModal} toggle={toggle} size={'lg'}>
          <ModalHeader toggle={toggle}>Crear nueva pregunta sin Clasificar</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm={12}>
                <Input
                  defaultValue={question || ""}
                  placeholder="Escribe la pregunta"
                  type="text"
                  onChange={(ev) => setQuestion(ev.target.value)}
                  style={{color: 'black'}}
                />
              </Col>
              <br /><br />
              <Col sm={4}>
                <Input
                  defaultValue={option1 || ""}
                  placeholder="Escribe la opción 1"
                  type="text"
                  onChange={(ev) => setOption1(ev.target.value)}
                  style={{color: 'black'}}
                />
              </Col>
              <Col sm={4}>
                <Input
                  defaultValue={option2 || ""}
                  placeholder="Escribe la opción 2"
                  type="text"
                  onChange={(ev) => setOption2(ev.target.value)}
                  style={{color: 'black'}}
                />
              </Col>
              <Col sm={4}>
                <Input
                  defaultValue={option3 || ""}
                  placeholder="Escribe la opción 3"
                  type="text"
                  onChange={(ev) => setOption3(ev.target.value)}
                  style={{color: 'black'}}
                />
              </Col>
              <br /><br />
              <Col sm={8}>
                <Input
                  defaultValue={idCorrect || ""}
                  placeholder="Escribe el id la opción correcta (1, 2, 3)"
                  type="text"
                  onChange={(ev) => setIdCorrect(ev.target.value)}
                  style={{color: 'black'}}
                />
              </Col>
            </Row>

          </ModalBody>
          <ModalFooter style={{padding: 25,}}>
            <Button onClick={createQuestion} color="info">
              <i className="tim-icons icon-simple-add" style={{marginRight: 20, fontWeight: 'bold', fontSize: 16,}}/> Guardar
            </Button>
            <Button onClick={toggle} color="danger">
              <i className="tim-icons icon-simple-remove" style={{marginRight: 20, fontWeight: 'bold', fontSize: 16,}}/> Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default GeneralQuestions;

function generateId(n) {
  var add = 1, max = 10 - add;

  if (n > max) {
      return generateId(max) + generateId(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}