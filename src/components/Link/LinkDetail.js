import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkDetail(props) {
  const linkId = props.match.params.linkId;

  const { firebase, user } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState("");
  const linkRef = firebase.db.collection("links").doc(linkId);

  useEffect(() => {
    getInitialLinks();
  }, []);

  async function getInitialLinks() {
    const doc = await linkRef.get();
    setLink({ ...doc.data(), id: doc.id });
  }

  const handleAddComment = async () => {
    if (!user) return props.history.push("/login");
    const doc = await linkRef.get();
    if (doc.exists) {
      const previousComments = doc.data().comments;
      const comment = {
        postedBy: { id: user.uid, name: user.displayName },
        created: Date.now(),
        text: commentText
      };
      const updatedComments = [...previousComments, comment];
      linkRef.update({ comments: updatedComments });
      setLink(prevState => ({ ...prevState, comments: updatedComments }));
      setCommentText("");
    }
  };

  return (
    <div>
      {!link ? (
        <div>Loading...</div>
      ) : (
        <div>
          <LinkItem key={link.id} {...link} showCount={false} index={0} />
          <textarea
            rows={6}
            cols={60}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <div>
            <button className="button" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
          {link.comments.map((comment, idx) => (
            <div key={idx}>
              <p className="comments-author">
                {comment.postedBy.name} |{" "}
                {distanceInWordsToNow(comment.created)}
              </p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withRouter(LinkDetail);
