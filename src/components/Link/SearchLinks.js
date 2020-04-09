import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext);
  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    getInitialLinks();
  }, []);

  async function getInitialLinks() {
    const snapshot = await firebase.db.collection("links").get();
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLinks(links);
  }
  const handleSearch = e => {
    e.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter(
      link =>
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
    );
    setFilteredLinks(matchedLinks);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search{" "}
          <input value={filter} onChange={e => setFilter(e.target.value)} />
          <button>OK</button>
        </div>
      </form>
      {filteredLinks.map((link, index) => (
        <LinkItem key={link.id} {...link} showCount={false} index={index} />
      ))}
    </div>
  );
}

export default SearchLinks;
