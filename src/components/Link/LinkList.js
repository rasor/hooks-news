import React, { useContext, useEffect, useState } from "react";

import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, linksSet] = useState([]);
  const isNewPage = props.location.pathname.includes("new");

  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    linksSet(links);
  }

  function renderLinks() {
    if (isNewPage) return links;
    return links.slice().sort((l1, l2) => l2.votes.length - l1.votes.length);
  }

  if (!links || links.length === 0) return <div>No Links</div>;
  return (
    <div>
      {renderLinks().map((link, index) => (
        <LinkItem key={link.id} {...link} showCount={true} index={index + 1} />
      ))}
    </div>
  );
}

export default LinkList;
