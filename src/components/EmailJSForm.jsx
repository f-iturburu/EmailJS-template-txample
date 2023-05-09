import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import emailjs from "@emailjs/browser";
import { template_id, public_key, service_id } from "./credentials";

function FormEmailJS() {
  const refForm = useRef();
  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();
  const refMessage = useRef();
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState()

  const messages = {
    error: (
      <p className="text-danger">
        Lo sentimos, ha ocurrido un error, intentelo nuevamente.
      </p>
    ),
    success: (
      <p className="text-success">Su mensaje ha sido enviado correctamente</p>
    ),
  };

  const handleSubmit = (e) => {

    e.preventDefault();
   
    setLoading(true);

    const sendObject = {
      email: refEmail.current.value,
      first_name: refFirstName.current.value,
      last_name: refLastName.current.value,
      message: refMessage.current.value,
    };
    
    emailjs.send(service_id, template_id, sendObject, public_key).then(
      (result) => {
        setMessage(messages.success)
        setLoading(false);
        refForm.current.reset()
      },
      (error) => {
        setMessage(messages.error)
        setLoading(false);
      }
    );
  };

  return (
    <>
      <section className="w-100 mt-5 pt-5">
        <h3 className="text-center">EmailJS Form</h3>
        <Form
          className="m-auto"
          style={{ width: "45vw" }}
          ref={refForm}
          onSubmit={handleSubmit}
        >
          <Form.Group
            className="mb-3 mt-4 d-flex justify-content-between"
            controlId="formBasicEmail"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: John"
                ref={refFirstName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Doe"
                ref={refLastName}
              />
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ej: john-doe@gmail.com"
              ref={refEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} ref={refMessage} />
          </Form.Group>
          <div className="">
           {message ?  message : <p className="text-dark">.</p>}
          </div>

          <div className="d-flex">
            <Button
              variant="primary"
              type="submit"
              className="ms-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  {" "}
                  <Spinner animation="border" variant="light" size="sm" />{" "}
                  Enviando
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
}

export default FormEmailJS;
