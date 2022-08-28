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
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";

function Planets(props) {
    const [planetList, setPlanetList] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);

    const [category, setCategory] = React.useState(null);
    const [composition, setComposition] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [gravity, setGravity] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [target, setTarget] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [radius, setRadius] = React.useState(null);
    const [rotationPeriod, setRotationPeriod] = React.useState(null);
    const [satellites, setSatellites] = React.useState(null);
    const [temperatureDay, setTemperatureDay] = React.useState(null);
    const [temperatureNight, setTemperatureNight] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const list = [];
            const querySnapshot = await getDocs(collection(db, "PlanetsInfo"));
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setPlanetList(list);
        }
        fetchData();
    }, []);

    const toggle = () => setOpenModal(!openModal);
    const toggleCreate = () => setOpenCreateModal(!openCreateModal);

    const createPlanet = async () => {
        if(!name || !category || !gravity || !radius || !rotationPeriod || !description || !temperatureDay || !temperatureNight || !satellites || !composition || !target){
            alert('Debe ingresar todos los campos!');
        } else {
            let idRef = generateId(10);
            const planet = {
                id: idRef,
                target: parseInt(target),
                category: category,
                composition: composition,
                description: description,
                gravity: gravity,
                name: name,
                radius: radius,
                rotationPeriod: rotationPeriod,
                satellites: satellites,
                temperatureDay: temperatureDay,
                temperatureNight: temperatureNight,
            };
        
            await setDoc(doc(db, "PlanetsInfo", idRef), planet);
            setOpenCreateModal(false);
        }
    }

    const savePlanet = async () => {
        if(!name || !category || !gravity || !radius || !rotationPeriod || !description || temperatureDay || !temperatureNight || !satellites || !composition || !target){
            alert('Debe ingresar todos los campos!');
        } else {
            const planet = {
                id: id,
                category: category,
                composition: composition,
                description: description,
                gravity: gravity,
                name: name,
                target: parseInt(target),
                radius: radius,
                rotationPeriod: rotationPeriod,
                satellites: satellites,
                temperatureDay: temperatureDay,
                temperatureNight: temperatureNight,
            };

            const planetsRef = doc(db, "PlanetsInfo", id);
            updateDoc(planetsRef, planet);
            setOpenModal(false);
        }
    }

    return (
        <div className="content">
            <Button onClick={() => setOpenCreateModal(true)} color="info">
                <i className="tim-icons icon-simple-add" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Crear nuevo Planeta
            </Button>
            <br></br><br></br>
            <Row>
                {
                    planetList.map((q) =>
                        <Col lg="3" key={q.id} onClick={function gatData() {
                            setOpenModal(true);
                            setCategory(q.category);
                            setComposition(q.composition);
                            setDescription(q.description);
                            setGravity(q.gravity);
                            setId(q.id);
                            setTarget(q.target);
                            setName(q.name);
                            setRadius(q.radius);
                            setRotationPeriod(q.rotationPeriod);
                            setSatellites(q.satellites);
                            setTemperatureDay(q.temperatureDay);
                            setTemperatureNight(q.temperatureNight);
                        }}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <center>
                                        <p style={{ fontSize: 20, }}>{q.target} {' '} {q.name}</p>
                                        <CardTitle tag="h3">
                                            <i className="tim-icons icon-planet text-info" style={{ fontSize: 30, }} />
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

            <Modal isOpen={openModal} toggle={toggle} size={'lg'} style={{marginTop: -80,}}>
                <ModalHeader toggle={toggle}>
                    <h3 style={{ color: 'black' }}>Planeta: {name} - {id}</h3>
                    <Input
                        id="target"
                        defaultValue={target || ""}
                        placeholder="Target"
                        type="number"
                        onChange={(ev) => setTarget(ev.target.value)}
                        style={{ color: 'black' }}
                    />
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={3}>
                            <Label for="name">
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                defaultValue={name || ""}
                                placeholder="Número de nivel"
                                type="text"
                                onChange={(ev) => setName(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="category">
                                Categoría
                            </Label>
                            <Input
                                id="category"
                                defaultValue={category || ""}
                                placeholder="Categoría"
                                type="text"
                                onChange={(ev) => setCategory(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="gravity">
                                Gravedad
                            </Label>
                            <Input
                                id="gravity"
                                defaultValue={gravity || ""}
                                placeholder="Gravedad"
                                type="text"
                                onChange={(ev) => setGravity(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="radius">
                                Radio
                            </Label>
                            <Input
                                id="radius"
                                defaultValue={radius || ""}
                                placeholder="Radio"
                                type="text"
                                onChange={(ev) => setRadius(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <br></br><br></br><br></br><br></br>
                        <Col sm={3}>
                            <Label for="rotationPeriod">
                                Periodo Rotación
                            </Label>
                            <Input
                                id="rotationPeriod"
                                defaultValue={rotationPeriod || ""}
                                placeholder="Periodo de Rotación"
                                type="text"
                                onChange={(ev) => setRotationPeriod(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="satellites">
                                Satelites
                            </Label>
                            <Input
                                id="satellites"
                                defaultValue={satellites || ""}
                                placeholder="Satelites"
                                type="text"
                                onChange={(ev) => setSatellites(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="temperatureDay">
                                Temp. en el día
                            </Label>
                            <Input
                                id="temperatureDay"
                                defaultValue={temperatureDay || ""}
                                placeholder="Temperatura en el día"
                                type="text"
                                onChange={(ev) => setTemperatureDay(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="temperatureNight">
                                Temp. en la noche
                            </Label>
                            <Input
                                id="temperatureNight"
                                defaultValue={temperatureNight || ""}
                                placeholder="Temperatura en la noche"
                                type="text"
                                onChange={(ev) => setTemperatureNight(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <br></br><br></br><br></br><br></br>
                        <Col sm={6}>
                            <Label for="description">
                                Descripción General
                            </Label>
                            <Input
                                id="description"
                                defaultValue={description || ""}
                                placeholder="Descripción General"
                                type="textarea"
                                onChange={(ev) => setDescription(ev.target.value)}
                                style={{ color: 'black', padding: 10 }}
                            />
                        </Col>
                        <Col sm={6}>
                            <Label for="composition">
                                Composición (separado por |)
                            </Label>
                            <Input
                                id="composition"
                                defaultValue={composition || ""}
                                placeholder="Composición"
                                type="textarea"
                                onChange={(ev) => setComposition(ev.target.value)}
                                style={{ color: 'black', padding: 10 }}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter style={{ padding: 25, }}>
                    <Button onClick={savePlanet} color="info">
                        <i className="tim-icons icon-simple-add" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Guardar
                    </Button>
                    <Button onClick={toggle} color="danger">
                        <i className="tim-icons icon-simple-remove" style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16, }} /> Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openCreateModal} toggle={toggleCreate} size={'lg'} style={{marginTop: -80,}}>
                <ModalHeader toggle={toggleCreate}>
                    <h3 style={{ color: 'black' }}>Crear nuevo Planeta</h3>
                    <Input
                        id="target"
                        placeholder="Target"
                        type="number"
                        onChange={(ev) => setTarget(ev.target.value)}
                        style={{ color: 'black' }}
                    />
                </ModalHeader>
                <ModalBody>
                <Row>
                        <Col sm={3}>
                            <Label for="name">
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                placeholder="Nombre"
                                type="text"
                                onChange={(ev) => setName(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="category">
                                Categoría
                            </Label>
                            <Input
                                id="category"
                                placeholder="Categoría"
                                type="text"
                                onChange={(ev) => setCategory(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="gravity">
                                Gravedad
                            </Label>
                            <Input
                                id="gravity"
                                placeholder="Gravedad"
                                type="text"
                                onChange={(ev) => setGravity(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="radius">
                                Radio
                            </Label>
                            <Input
                                id="radius"
                                placeholder="Radio"
                                type="text"
                                onChange={(ev) => setRadius(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <br></br><br></br><br></br><br></br>
                        <Col sm={3}>
                            <Label for="rotationPeriod">
                                Periodo Rotación
                            </Label>
                            <Input
                                id="rotationPeriod"
                                placeholder="Periodo de Rotación"
                                type="text"
                                onChange={(ev) => setRotationPeriod(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="satellites">
                                Satelites
                            </Label>
                            <Input
                                id="satellites"
                                placeholder="Satelites"
                                type="text"
                                onChange={(ev) => setSatellites(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="temperatureDay">
                                Temp. en el día
                            </Label>
                            <Input
                                id="temperatureDay"
                                placeholder="Temperatura en el día"
                                type="text"
                                onChange={(ev) => setTemperatureDay(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Label for="temperatureNight">
                                Temp. en la noche
                            </Label>
                            <Input
                                id="temperatureNight"
                                placeholder="Temperatura en la noche"
                                type="text"
                                onChange={(ev) => setTemperatureNight(ev.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Col>
                        <br></br><br></br><br></br><br></br>
                        <Col sm={6}>
                            <Label for="description">
                                Descripción General
                            </Label>
                            <Input
                                id="description"
                                placeholder="Descripción General"
                                type="textarea"
                                onChange={(ev) => setDescription(ev.target.value)}
                                style={{ color: 'black', padding: 10 }}
                            />
                        </Col>
                        <Col sm={6}>
                            <Label for="composition">
                                Composición (separado por |)
                            </Label>
                            <Input
                                id="composition"
                                placeholder="Composición"
                                type="textarea"
                                onChange={(ev) => setComposition(ev.target.value)}
                                style={{ color: 'black', padding: 10 }}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter style={{ padding: 25, }}>
                    <Button onClick={createPlanet} color="info">
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

export default Planets;

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