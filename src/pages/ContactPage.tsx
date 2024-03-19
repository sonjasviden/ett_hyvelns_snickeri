import { Button, Form, Image } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";

const ContactPage = () => {
  const isMobileView = useResponsiveView();

  return (
    <div className="contactPage">
      <h1>Kontakt</h1>

      <div className="desktop-flex">
        <Form className="form">
          <div className="first-last-name">
            <Form.Group className="mb-3 form-group" controlId="firstName">
              <Form.Label>Förnamn</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="mb-3 form-group" controlId="lastName">
              <Form.Label>Efternamn</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </div>

          <div className="email-subject">
            <Form.Group className="mb-3 form-group" controlId="email">
              <Form.Label>E-post</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3 form-group" controlId="subject">
              <Form.Label>Ämne</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Meddelande</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button>Skicka</Button>
        </Form>

        <div className="custom-order">
          <h4>Vill du göra en beställning?</h4>
          <p>
            Vid intresse av att lägga en beställning på en produkt eller ett
            projekt, stor som liten, hör av dig via kontaktformuläret bredvid
            med ämnet "Beställning". Vi återkopplar så fort vi kan!
          </p>
        </div>
      </div>

      <div className="purple-blob">
        {isMobileView ? (
          <Image src="/images/contact-purple-blob.png" />
        ) : (
          <Image src="/images/desktop-purple-blob.png" />
        )}

        <div className="info-box">
          <div className="info address">
            <Image src="/images/address.png" />
            <p>
              Kalkbruksgatan 4B <br />
              417 70 Göteborg
            </p>
          </div>
          <div className="info contact">
            <Image src="/images/email.png" />
            <p>hyvelnssnickeri@gmail.com</p>
          </div>
          <div className="info phoneNr">
            <Image src="/images/phoneNr.png" />
            <p>+46 72 850 30 55</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
