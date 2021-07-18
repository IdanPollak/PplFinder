import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { React, useContext } from "react";
import Contex from "../../store/Context";

const UserModal = ({
  isOpen,
  img,
  fullName,
  age,
  gender,
  city,
  country,
  phone,
  email,
  setOpen,
}) => {
  const context = useContext(Contex);
  return (
    <>
      {isOpen && (
        <Card
          className="card"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "35%",
          }}
        >
          <CardActionArea style={{ cursor: "auto" }}>
            <CardMedia component="img" height="500px" image={img} />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {fullName}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Age: {age}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Gender: {gender}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                City: {city}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Country: {country}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Phone: {phone}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Email: {email}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="large" color="primary" onClick={() => setOpen(true)}>
              Send Message
            </Button>
            <Button size="large" color="primary" onClick={() => context.setModalUser([])}>
              Close
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default UserModal;
