import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { getDomain } from "../../utils";
import FirebaseContext from "../../firebase/context";

interface IProps {
  description: string;
  url: string;
  showCount: boolean;
  index: number;
  postedBy: any;
  created: string;
  id: string;
  comments: string;
  history: any;
  voteCount: string;
}
const LinkItem: React.FC<any> = (props) => {
  const { firebase, user } = useContext(FirebaseContext);

  const {
    description,
    url,
    showCount,
    index,
    postedBy,
    created,
    id,
    comments,
    history,
    voteCount
  } = props;

  function handleVote() {
    if (!user) return history.push("/login");
    const voteRef = firebase.db.collection("links").doc(id);
    voteRef.get().then(doc => {
      if (doc.exists) {
        const previousVotes = doc.data()!.votes;
        const vote = { votedBy: { id: user.uid, name: user.displayName } };
        const updatedVotes = [...previousVotes, vote];
        const voteCount = updatedVotes.length;
        voteRef.update({ votes: updatedVotes, voteCount });
      }
    });
  }

  function handleDeleteLink() {
    const linkRef = firebase.db.collection("links").doc(id);
    linkRef
      .delete()
      .then(() => console.log(`Document with ID ${id} deleted`))
      .catch(err => console.error("Error deleting document:", err));
  }
  const postedByAuthUser = user && user.uid === postedBy.id;

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote}>
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          <a href={url} className="black no-underline">
            {description}
          </a>
          <span className="link">({getDomain(url)})</span>
        </div>
        <div className="f6 lh-copy gra">
          {voteCount} votes by {postedBy.name} {distanceInWordsToNow(created)} |{" "}
          <Link to={`/link/${id}`}>
            {comments.length > 0 ? `${comments.length} comments` : "discuss"}
          </Link>
          {postedByAuthUser && (
            <>
              {" | "}
              <span className="delete-button" onClick={handleDeleteLink}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
