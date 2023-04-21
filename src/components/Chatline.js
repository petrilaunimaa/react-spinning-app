import { FaStar, FaRegStar } from "react-icons/fa";
const Chatline = ({ chatline }) => {
  return (
    <div className="chatline">
      <p key={chatline.id}>
        <span className="chatline-name" style={{ color: chatline.color }}>
          {(chatline.isSub && <FaStar />) || (!chatline.isSub && <FaRegStar />)} {chatline.username}:
        </span>{" "}
        {chatline.message}
      </p>
    </div>
  );
};

export default Chatline;
