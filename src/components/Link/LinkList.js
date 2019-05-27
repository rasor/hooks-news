import React, { useContext, useEffect, useState } from "react";

import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, linksSet] = useState([]);
  const isNewPage = props.location.pathname.includes("new");
  const isTopPage = props.location.pathname.includes("top");

  useEffect(() => {
    const unsubscribe = getLinks();
    return unsubscribe;
  }, [isTopPage]);

  function getLinks() {
    if (isTopPage)
      return firebase.db
        .collection("links")
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapshot);
    return firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    linksSet(links);
  }

  if (!links || links.length === 0) return <div>No Links</div>;
  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} {...link} showCount={true} index={index + 1} />
      ))}
    </div>
  );
}

export default LinkList;
