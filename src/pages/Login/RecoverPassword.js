import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, FormGroup, Input, 
  Card, CardHeader, CardBody, CardFooter} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from "lodash";
import { validateEmail } from '../../utils/validations.js';
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../../config/firebase";
import Logo from '../../assets/img/logo.png';

function RecoverPassword({history}) {
  const [email, setEmail] = React.useState(null);

  const recover = () => {
    if (isEmpty(email)) {
      toast.info("Por favor, ingresa tu correo electrónico para restablecer tu contraseña.", { position: toast.POSITION.TOP_RIGHT });
    } else if (!validateEmail(email)) {
      toast.info("Por favor, ingresa una dirección de correo electrónico válida.", { position: toast.POSITION.TOP_RIGHT });
    } else {
      sendPasswordResetEmail(authentication, email)
      .then(() => {
        toast.info("Tu solicitud de restablecimiento de contraseña se ha generado, revisa tu correo.", { position: toast.POSITION.TOP_RIGHT });
        //history.push('/login');
        setEmail(null);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("Tu solicitud de restablecimiento de contraseña no pudo ser generada, intenta más tarde.", { position: toast.POSITION.TOP_RIGHT });
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
              <h4>Recuperar Contraseña</h4>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Input
                  id="email"
                  name="email"
                  placeholder="Ingrese el correo electrónico"
                  type="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={recover}
              >
                Recuperar Contraseña
              </Button>
            </CardBody>
            <CardFooter>
              <p style={{marginTop: 10,}}>
                <Link to="/login" style={{color: '#000'}}>Iniciar Sesión</Link>
              </p>
            </CardFooter>
          </Card>
        </center>
      </Container>
    );
}
export default RecoverPassword;
