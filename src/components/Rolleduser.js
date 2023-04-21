import { FaTimes } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa";

const Rolleduser = ({ rolleduser, onDelete }) => {
  return (
    <div className="rolleduser">
      <p key={rolleduser.id}>
        {(rolleduser.isSub && <FaStar />) || (!rolleduser.isSub && <FaRegStar />)}
        <span className="rolledtext">{rolleduser.username}</span>
        <FaTimes
          className="removebtn"
          title="Remove user"
          style={{ cursor: "pointer" }}
          onClick={() => onDelete(rolleduser.id)}
        />
      </p>
    </div>
  );
};

export default Rolleduser;
