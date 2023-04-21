import Chatline from "./Chatline";
import Rolleduser from "./Rolleduser";
import Settings from "./Settings";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Content = ({ chatMessages, eligibleUsers, onDelete, setKeyword, onChangeStreamer, picked, onReroll }) => {
  return (
    <>
      <Settings onAddKeyword={setKeyword} picked={picked} onChangeStreamer={onChangeStreamer} onReroll={onReroll} />
      <Row className="maincontent">
        <Col lg>
          <p className="sectiontitle">Eligible users</p>
          <div className="chats">
            {eligibleUsers.map((rolleduser) => (
              <Rolleduser key={rolleduser.id} rolleduser={rolleduser} onDelete={onDelete} />
            ))}
          </div>
        </Col>
        <Col lg>
          <p className="sectiontitle">Chat</p>
          <div className="chats">
            {chatMessages.map((chatline) => (
              <Chatline key={chatline.id} chatline={chatline} />
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Content;
