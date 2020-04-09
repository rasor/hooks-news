import React, { useContext, useEffect, useState } from "react";

import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";
import { LINKS_PER_PAGE } from "../../utils";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const isNewPage = props.location.pathname.includes("new");
  const isTopPage = props.location.pathname.includes("top");
  const page = Number(props.match.params.page);
  const linksRef = firebase.db.collection("links");

  useEffect(() => {
    const unsubscribe = getLinks();
    return unsubscribe;
  }, [isTopPage, page]);

  function getLinks() {
    setLoading(true);
    const hasCursor = Boolean(cursor);
    if (isTopPage)
      return linksRef
        .orderBy("voteCount", "desc")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    if (page === 1)
      return linksRef
        .orderBy("created", "desc")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    if (hasCursor)
      return linksRef
        .orderBy("created", "desc")
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    const offset = (page - 1) * LINKS_PER_PAGE;
    fetch(
      // From https://console.firebase.google.com/project/hooks-news-rasor/functions/list
      `https://us-central1-hooks-news-rasor.cloudfunctions.net/linksPagination?offset=${offset}`
    )
      .then(response => response.json())
      .then(links => {
        setLinks(links);
        setCursor(links[links.length - 1]);
        setLoading(false);
      })
      .catch(e => console.log("error", e));
    return () => {};
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLinks(links);
    const lastLink = links[links.length - 1];
    setCursor(lastLink);
    setLoading(false);
  }

  function visitPreviousPage() {
    if (page > 1) props.history.push(`/new/${page - 1}`);
  }
  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE)
      props.history.push(`/new/${page + 1}`);
  }
  if (!links || links.length === 0) return <div>No Links</div>;

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;
  return (
    <div style={{ opacity: loading ? 0.25 : 1 }}>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          {...link}
          showCount={true}
          index={index + pageIndex}
        />
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>
            Previous
          </div>
          <div className="pointer" onClick={visitNextPage}>
            Next
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkList;
