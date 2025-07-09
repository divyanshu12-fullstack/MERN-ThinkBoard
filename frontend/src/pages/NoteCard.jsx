import { Link } from "react-router";

const NoteCard = ({ note }) => {
  return <Link to={`/note/${note._id}`}></Link>;
};
export default NoteCard;
