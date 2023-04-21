import { FaTimes } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa";
const Pickedperson = ({ pickedperson, onReroll }) => {
  return (
    <div className="pickedperson">
      <p key={pickedperson.id} style={{ color: pickedperson.color }}>
        &nbsp;{(pickedperson.isSub && <FaStar />) || (!pickedperson.isSub && <FaRegStar />)} {pickedperson.username}{" "}
        &nbsp;
        <FaTimes
          className="removebtn"
          title="Remove user"
          style={{ cursor: "pointer" }}
          onClick={() => onReroll(pickedperson.id)}
        />
      </p>
    </div>
  );
};

export default Pickedperson;
