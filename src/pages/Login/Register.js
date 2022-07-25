/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, CardHeader, CardBody, FormGroup, Input, CardFooter} from "reactstrap";
import { isEmpty, size } from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authentication, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
//import { validateEmail } from '../../utils/validations.js';
import { addDoc, collection } from "firebase/firestore";
import Logo from '../../assets/img/logo.png';

function Register({auth, history}) {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [repassword, setRePassword] = React.useState();
  
  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        console.log(user);
        history.push('/admin');
      } else {
        history.push('/register');
      }
    });
  }, []);

  const register = () => {
    if(isEmpty(name)){
      toast.info("Ingrese el nombre!", {autoClose: 5000});
    } else if(isEmpty(email)){
      toast.info("Ingrese el correo electrónico!", {autoClose: 5000});
    } else if(isEmpty(password)){
      toast.info("Ingrese la contraseña!", {autoClose: 5000});
    } else if(isEmpty(repassword)){
      toast.info("Reingrese la contraseña!", {autoClose: 5000});
    } else if (password !== repassword) {
      toast.info("Las contraseñas deben ser iguales!", { autoClose: 5000 });
    } else if (size(password) < 6) {
      toast.info("La contraseña debe tener al menos 6 caracteres.", { autoClose: 5000 });
    } else {
      createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(authentication.currentUser, {
          displayName: name, 
        });
        const docRef = addDoc(collection(db, "Users"), {
          id: user.uid,
          name: name,
          state: 1,
          email: email,
          profile: 1,
        });
        console.log(user, docRef.id);
        history.push('/admin');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        if (error.code === "auth/user-not-found") {
          toast.error("Upsss! Usuario no encontrado. Por favor regístrate.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/wrong-password") {
          toast.error("Upsss! Contraseña incorrecta.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/user-disabled") {
          toast.error("Upsss! Tu cuenta se encuentra inhabilitada!.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/internal-error") {
          toast.error("Error interno, por favor comuniquese con el administrador del sistema!.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Error en la red, por favor intente más tarde!.", { position: toast.POSITION.TOP_RIGHT });
        } else {
          console.log(error);
        }
      });
    }
  }

  return (
    <Container className="mt-5">
      <ToastContainer />
      <center>
        <Card
          className="my-2"
          color="info"
          inverse
          style={{
            width: '30rem'
          }}
        >
          <CardHeader>
            <img src={Logo} alt="Logo juego" width={130}/>
            <h4>Registro</h4>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Input
                id="name"
                name="name"
                placeholder="Ingrese el Nombre Completo"
                type="text"
                onChange={(ev) => setName(ev.target.value)}
              />
            </FormGroup>
            {' '}
            <FormGroup>
              <Input
                id="email"
                name="email"
                placeholder="Ingrese el correo electrónico"
                type="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </FormGroup>
            {' '}
            <FormGroup>
              <Input
                id="password"
                name="password"
                placeholder="Ingrese la contraseña"
                type="password"
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </FormGroup>
            {' '}
            <FormGroup>
              <Input
                id="repassword"
                name="repassword"
                placeholder="Ingrese nuevamente la contraseña"
                type="password"
                onChange={(ev) => setRePassword(ev.target.value)}
              />
            </FormGroup>
            <Button
              color="dafault"
              onClick={register}
            >
              Crear Cuenta
            </Button>
          </CardBody>
          <CardFooter>
            <p style={{marginTop: 10,}}>
              Ya tienes una cuenta <Link to="/login" style={{color: '#000'}}>Inicia Sesión</Link>
            </p>
          </CardFooter>
        </Card>
      </center>
    </Container>
  );
}
export default Register;
