import { Button, Form, Image } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";
import { useState } from "react";

const ContactPage = () => {
  const isMobileView = useResponsiveView();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="contactPage">
      <h1>Kontakt</h1>

      <div className="desktop-flex">
        <Form className="form" onSubmit={handleSubmit}>
          <div className="first-last-name">
            <Form.Group className="mb-3 form-group" controlId="firstName">
              <Form.Label>Förnamn</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 form-group" controlId="lastName">
              <Form.Label>Efternamn</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="email-subject">
            <Form.Group className="mb-3 form-group" controlId="email">
              <Form.Label>E-post</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 form-group" controlId="subject">
              <Form.Label>Ämne</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Meddelande</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">Skicka</Button>
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
