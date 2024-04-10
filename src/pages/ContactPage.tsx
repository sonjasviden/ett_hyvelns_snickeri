import { Button, Form, Image } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";
import { useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const isMobileView = useResponsiveView();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      axios.post(
        "https://formsubmit.co/ajax/c86343f26c1594f85fe68065d228ac2e",
        {
          Namn: `${firstName} ${lastName}`,
          Email: email,
          Ämne: subject,
          Meddelande: message,
        }
      );
      setTimeout(() => {
        console.log("success!");
        setShowThankYou(true);
      }, 4000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setShowThankYou(false);
    }
  };

  return (
    <div className="contactPage">
      {showThankYou ? (
        <div className="thankYou-page">
          <h1>Tack för ditt meddelande!</h1>
          <p>Vi återkopplar till dig så fort vi kan. Vanligtvis inom 24h. </p>

          <div className="goBack-btn">
            <Link to="/">
              <Button>Gå till startsidan</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h1>Kontakt</h1>

          <div className="desktop-flex">
            <Form className="form" method="POST" onSubmit={handleSubmit}>
              <div className="first-last-name">
                <Form.Group
                  className="mb-3 form-group firstName"
                  controlId="firstName"
                >
                  <Form.Label>Förnamn</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>

                <input type="hidden" name="_subject" value="Nytt meddelande!" />

                <Form.Group className="mb-3 form-group" controlId="lastName">
                  <Form.Label>Efternamn</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>

              <div className="email-subject">
                <Form.Group className="mb-3 form-group email" controlId="email">
                  <Form.Label>E-post</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 form-group" controlId="subject">
                  <Form.Label>Ämne</Form.Label>
                  <Form.Control
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    name="subject"
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
                  name="message"
                  required
                />
              </Form.Group>

              <Button type="submit">
                {isLoading ? "Skickar..." : "Skicka"}
              </Button>
            </Form>

            <div className="custom-order">
              <h4>Vill du göra en beställning?</h4>
              <p>
                Vid intresse av att lägga en beställning på en produkt eller ett
                projekt, stor som liten, hör av dig via kontaktformuläret
                bredvid med ämnet "Beställning". Vi återkopplar så fort vi kan!
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
          <Footer />
        </>
      )}
    </div>
  );
};

export default ContactPage;
