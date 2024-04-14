import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="notFound-page">
      <h1>HTTP Error 404</h1>
      <h5>Sidan "{location.pathname}" kan inte hittas.</h5>
      <p>
        Det kan bero på ett stavfel, att sidan du sökt efter inte längre finns
        eller att den flyttats.
      </p>

      <div className="goBack-btn">
        <Link to="/">
          <Button>Gå till startsidan</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
