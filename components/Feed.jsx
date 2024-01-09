"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// const Feed = () => {
//   const [searchText, setSearchtext] = useState("");
//   const [posts, setPosts] = useState([]);

//   const handleSearchChange = (e) => {};

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch("/api/prompt");
//       const data = await response.json();
//       setPosts(data);
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <section className="feed">
//       <form className="relative w-full flex-center">
//         <input
//           type="text"
//           placeholder="Search for a tag or a username"
//           value={searchText}
//           onChange={handleSearchChange}
//           required
//           className="search_input peer"
//         />
//       </form>

//       <PromptCardList data={posts} handleTagClick={() => {}} />
//     </section>
//   );
// };

// export default Feed;

const Feed = () => {
  const [searchText, setSearchtext] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Filter posts based on search term
    const filtered = posts.filter((post) => {
      const includesSearchTerm = (field) =>
        field && field.toLowerCase().includes(searchTerm);

      return (
        includesSearchTerm(post.prompt) ||
        includesSearchTerm(post.username) ||
        (post.tags &&
          Array.isArray(post.tags) &&
          post.tags.some(includesSearchTerm))
      );
    });

    setFilteredPosts(filtered);
    setSearchtext(searchTerm);
  };

  const handleBlur = () => {
    // Additional logic can be added here if needed
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          onBlur={handleBlur}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts.length ? filteredPosts : posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
