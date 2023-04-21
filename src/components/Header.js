import { useState } from "react";
import { FaDice } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { GiClover } from "react-icons/gi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const Header = ({ onRoll, kwChange, smChange }) => {
  const [amount, setAmount] = useState(6);
  const [luckamount, setLuckAmount] = useState(2);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!amount || !luckamount) {
      alert("Please input a value");
      return;
    }

    onRoll({ amount, luckamount });
  };

  return (
    <Row className="header">
      <Col lg>
        <h3>
          <img width="30px" src={process.env.PUBLIC_URL + "/logo512.png"} alt="logo"></img> spinning app
        </h3>
      </Col>
      <Col lg className="kw">
        <p>
          Keyword: <span>{kwChange}</span>&nbsp; Streamer: <span>{smChange}</span>
        </p>
      </Col>
      <Col xxl>
        <form className="forms" onSubmit={onSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              Sub Luck&nbsp;
              <GiClover />
            </InputGroup.Text>
            <FormControl
              id="luckinput"
              title="Sub luck amount"
              className=""
              min="1"
              max="5"
              type="number"
              placeholder="2"
              value={luckamount}
              onChange={(e) => setLuckAmount(e.target.valueAsNumber)}
            />
            <InputGroup.Text>
              Rolls&nbsp;
              <HiRefresh />
            </InputGroup.Text>
            <FormControl
              id="rollinput"
              title="Amount of people to roll"
              className=""
              min="1"
              max="20"
              type="number"
              placeholder="6"
              value={amount}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
            <Button type="submit" variant="secondary" text="Roll">
              Roll <FaDice />
            </Button>
          </InputGroup>
        </form>
      </Col>
    </Row>
  );
};

export default Header;
