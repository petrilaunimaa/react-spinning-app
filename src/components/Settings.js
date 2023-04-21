import { useState } from "react";
import Pickedperson from "./Pickedperson";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FaUserAlt, FaPen } from "react-icons/fa";

const Settings = ({ onAddKeyword, onChangeStreamer, picked, onReroll }) => {
  const [keyword, setKeyword] = useState("");
  const [streamer, setStreamer] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!keyword) {
      alert("Please input a keyword");
      return;
    }

    onAddKeyword({ keyword });
  };

  const onSubmitStreamer = (e) => {
    e.preventDefault();

    if (!streamer) {
      alert("Please input a streamer");
      return;
    }

    onChangeStreamer({ streamer });
  };

  return (
    <>
      <Row className="keyword-input">
        <Col lg className="forms">
          <form className="" onSubmit={onSubmit}>
            <InputGroup className="mb-3">
              <FormControl placeholder="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <Button variant="secondary" type="submit">
                Set keyword&nbsp;
                <FaPen />
              </Button>
            </InputGroup>
          </form>
        </Col>
        <Col lg className="forms">
          <form className="" onSubmit={onSubmitStreamer}>
            <InputGroup className="mb-3">
              <FormControl placeholder="streamer" value={streamer} onChange={(e) => setStreamer(e.target.value)} />
              <Button variant="secondary" type="submit">
                Set streamer&nbsp;
                <FaUserAlt />
              </Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      {picked.length !== 0 && (
        <Row>
          <Col className="pickedpeeps">
            Picked:{" "}
            {picked.map(
              (pickedperson) =>
                pickedperson !== undefined && (
                  <Pickedperson key={pickedperson.id} pickedperson={pickedperson} onReroll={onReroll} />
                )
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Settings;
