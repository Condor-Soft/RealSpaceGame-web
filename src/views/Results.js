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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function Results() {
    const [userList, setUserList] = React.useState([]);
    const [userResultList, setUserResultList] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [name, setName] = React.useState(null);

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

    const toggle = () => setOpenModal(!openModal);

    const loadUserResults = async () => {
        const list = [];
        const querySnapshot = await getDocs(collection(db, "GameResults"));
        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });
        setUserResultList(list);
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h3">Resultados en Juego {' '}
                                    <Button color="info" onClick={function viewTopResults() {
                                        
                                    }}>
                                        <i className="tim-icons icon-chart-bar-32" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Ver Top
                                    </Button>
                                </CardTitle>
                                
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th hidden>#</th>
                                            <th className="text-center">Nombre</th>
                                            <th className="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userList.map((q) =>
                                                <tr key={q.id}>
                                                    <th scope="row" hidden>{q.id}</th>
                                                    <td className="text-center">{q.name}</td>
                                                    <td className="text-center">
                                                        <Button color="primary" onClick={function viewResults() {
                                                            setOpenModal(true);
                                                            setName(q.name);
                                                            loadUserResults();
                                                        }}>
                                                            <i className="tim-icons icon-spaceship" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Ver Resultados
                                                        </Button>
                                                    </td>
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
                    <ModalHeader toggle={toggle}>
                        <p hidden>{ }</p>
                        <h3 style={{ color: 'black' }}>Resultados de {name}</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th hidden>#</th>
                                    <th className="text-center" style={{color: 'black',}} hidden>Nombre</th>
                                    <th className="text-center" style={{color: 'black',}}>Nivel</th>
                                    <th className="text-center" style={{color: 'black',}}>Puntaje</th>
                                    <th className="text-center" style={{color: 'black',}}>Tiempo Restante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userResultList.map((q) =>
                                        <tr key={q.id}>
                                            <th scope="row" hidden>{q.id}</th>
                                            <td className="text-center" hidden><span style={{color: 'black',}}>{q.userName}</span></td>
                                            <td className="text-center"><span style={{color: 'black',}}>{q.level}</span></td>
                                            <td className="text-center"><span style={{color: 'black',}}>{q.score}</span></td>
                                            <td className="text-center"><span style={{color: 'black',}}>{Math.round(q.time)} s</span></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter style={{ padding: 25, }}>
                        <Button onClick={toggle} color="danger">
                            <i className="tim-icons icon-simple-remove" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Salir
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}

export default Results;
