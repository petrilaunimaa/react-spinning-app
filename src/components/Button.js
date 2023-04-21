import PropTypes from "prop-types";
import { Button as Btn } from "react-bootstrap";

const Button = ({ color, text, onClick }) => {
  return (
    <Btn onClick={onClick} style={{ backgroundColor: color }} className="btn">
      {text}
    </Btn>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
