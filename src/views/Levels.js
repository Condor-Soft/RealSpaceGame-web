import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Button,
    Input,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function Levels(props) {
    const [levelList, setLevelList] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);

    const [bloom, setBloom] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [number, setNumber] = React.useState(null);
    const [time, setTime] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const list = [];
            const querySnapshot = await getDocs(collection(db, "Level"));
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setLevelList(list);
        }
        fetchData();
    }, []);

    const toggle = () => setOpenModal(!openModal);
    const toggleCreate = () => setOpenCreateModal(!openCreateModal);

    const createLevel = async () => {

    }

    const saveLevel = async () => {

    }

    return (
        <div className="content">
            <Button onClick={() => setOpenCreateModal(true)} color="info">
                <i className="tim-icons icon-simple-add" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Crear nuevo Nivel
            </Button>
            <br></br><br></br>
            <Row>
                {
                    levelList.map((q) =>
                        <Col lg="4" key={q.id} onClick={function gatData() {
                            setOpenModal(true);
                            setBloom(q.bloom);
                            setDescription(q.description);
                            setId(q.id);
                            setNumber(q.number);
                            setTime(q.time);
                        }}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <center>
                                        <p style={{ fontSize: 20, }}>NIVEL {q.number}</p>
                                        <CardTitle tag="h3">
                                            <i className="tim-icons icon-app text-info" style={{ fontSize: 30, }} />
                                        </CardTitle>
                                    </center>
                                </CardHeader>
                                <CardBody>
                                    <center>
                                        <p style={{ fontSize: 16, }}>{q.bloom}</p>
                                    </center>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                }
            </Row>

            <Modal isOpen={openModal} toggle={toggle} size={'lg'}>
                <ModalHeader toggle={toggle}>
                    <p hidden>{id}</p>
                    <h3 style={{ color: 'black' }}>Detalle de Nivel {number}</h3>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={3}>
                            <Label for="number">
                                Número de nivel
                            </Label>
                            <Input
                                id="number"
                                defaultValue={number || ""}
                                placeholder="Número de nivel"
                                type="text"
                                onChange={(ev) => setNumber(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={5}>
                            <Label for="time">
                                Duración del nivel (en segundos)
                            </Label>
                            <Input
                                id="time"
                                defaultValue={time || ""}
                                placeholder="Duración del nivel (en segundos)"
                                type="number"
                                onChange={(ev) => setTime(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Label for="bloom">
                                Nivel Cognitivo de Bloom
                            </Label>
                            <Input
                                id="bloom"
                                defaultValue={bloom || ""}
                                placeholder="Nivel Cognitivo de Bloom"
                                type="text"
                                onChange={(ev) => setBloom(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <br></br><br></br><br></br><br></br>
                        <Col sm={12}>
                            <Label for="description">
                                Objetivo del nivel
                            </Label>
                            <Input
                                id="description"
                                defaultValue={description || ""}
                                placeholder="Objetivo del nivel"
                                type="textarea"
                                onChange={(ev) => setDescription(ev.target.value)}
                                style={{ color: 'black', padding: 10 }}
                            />
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter style={{ padding: 25, }}>
                    <Button onClick={saveLevel} color="info">
                        <i className="tim-icons icon-simple-add" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Guardar
                    </Button>
                    <Button onClick={toggle} color="danger">
                        <i className="tim-icons icon-simple-remove" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openCreateModal} toggle={toggleCreate} size={'lg'}>
                <ModalHeader toggle={toggleCreate}>
                    <h3 style={{ color: 'black' }}>Crear nuevo Nivel</h3>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={3}>
                            <Label for="number">
                                Número de nivel
                            </Label>
                            <Input
                                id="number"
                                defaultValue={""}
                                placeholder="Número de nivel"
                                type="text"
                                onChange={(ev) => setNumber(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={5}>
                            <Label for="time">
                                Duración del nivel (en segundos)
                            </Label>
                            <Input
                                id="time"
                                defaultValue={""}
                                placeholder="Duración del nivel (en segundos)"
                                type="number"
                                onChange={(ev) => setTime(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Label for="bloom">
                                Nivel Cognitivo de Bloom
                            </Label>
                            <Input
                                id="bloom"
                                defaultValue={""}
                                placeholder="Nivel Cognitivo de Bloom"
                                type="text"
                                onChange={(ev) => setBloom(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <br></br><br></br><br></br><br></br>
                        <Col sm={12}>
                            <Label for="description">
                                Objetivo del nivel
                            </Label>
                            <Input
                                id="description"
                                defaultValue={""}
                                placeholder="Objetivo del nivel"
                                type="textarea"
                                onChange={(ev) => setDescription(ev.target.value)}
                                style={{ color: 'black', padding: 10 }}
                            />
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter style={{ padding: 25, }}>
                    <Button onClick={createLevel} color="info">
                        <i className="tim-icons icon-simple-add" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Crear
                    </Button>
                    <Button onClick={toggleCreate} color="danger">
                        <i className="tim-icons icon-simple-remove" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Levels;
