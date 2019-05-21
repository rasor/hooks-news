import React, { useContext, useEffect, useState } from "react";

import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, linksSet] = useState([]);
  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db.collection("links").onSnapshot(handleSnapshot);
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
