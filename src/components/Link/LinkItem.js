import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { getDomain } from "../../utils";
import FirebaseContext from "../../firebase/context";

function LinkItem(props) {
  const { firebase, user } = useContext(FirebaseContext);

  const {
    description,
    url,
    showCount,
    index,
    votes,
    postedBy,
    created,
    id,
    comments,
    history
  } = props;
  function handleVote(e) {
    if (!user) return history.push("/login");
    const voteRef = firebase.db.collection("links").doc(id);
    voteRef.get().then(doc => {
      if (doc.exists) {
        const previousVotes = doc.data().votes;
        const vote = { votedBy: { id: user.uid, name: user.displayName } };
        const updatedVotes = [...previousVotes, vote];
        voteRef.update({ votes: updatedVotes });
      }
    });
  }
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
          {description}
          <span className="link">({getDomain(url)})</span>
        </div>
        <div className="f6 lh-copy gra">
          {votes.length} votes by {postedBy.name}{" "}
          {distanceInWordsToNow(created)} |{" "}
          <Link to={`link/${id}`}>
            {comments.length > 0 ? `${comments.length} comments` : "discuss"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
