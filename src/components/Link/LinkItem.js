import React from "react";
import { Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { getDomain } from "../../utils";

function LinkItem(props) {
  const {
    description,
    url,
    showCount,
    index,
    votes,
    postedBy,
    created,
    id,
    comments
  } = props;
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button">▲</div>
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

export default LinkItem;
