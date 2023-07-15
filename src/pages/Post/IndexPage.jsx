import React, { useEffect, useState } from "react";
import Post from "./Post";
import Loading from "../../components/loading";
import { getAllPost } from "../../services/Api";


const IndexPage = () => {
  const [postAll, setPostAll] = useState([]);
  const [loading, setShowLoading] = useState(true);
  const [post, setPost] = useState([]);
  useEffect(() => {
    getAllPost().then((response) => {
      response.json().then((posts) => {
        setPostAll(posts);
        setPost(posts);
        setShowLoading(false);
      });
    });
  }, []);

  const cat = [
    "International",
    "Education",
    "Politics",
    "Economy",
    "Buisness",
    "Fashion",
    "Entertainment",
    "Sport",
    "Technology",
    "Other",
  ];

    const [searchTerm, setSearchTerm] = useState(null);

    

    // Handle search term change
    const handleSearchTermChange = (event) => {
      const searchTerm = event.target.value;
      setSearchTerm(searchTerm);
      filterData(event.target.value);
    };

    // Filter data based on search term
    const filterData = (searchTerm) => {
      if (searchTerm === "") {
        setPost(postAll);
      } else {
        const filteredData = post.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPost(filteredData);
      }
    };

    const handleSearch = (event) => {
      if (event.key === "Backspace" || event.keyCode === 8) {
        setSearchTerm(searchTerm);
        filterData(searchTerm);
        console.log(searchTerm.toLowerCase());
      }
    };

    function filterProduct(value) {
      if (value === "All") {
        setPost(postAll);
      } else {
        setPost(postAll);
        console.log(value);
        const updatedList = post.filter((curentElement) => {
          return curentElement.category === value;
        });
        setPost(updatedList);
      }
    }

  
  return (
    <div className="indexPage">
      <div className="categoryboxhome">
        <div className="categoryHome">
          {cat &&
            cat.map((value, index) => (
              <div
                className="categoryChooserHome"
                value={value}
                onClick={() => filterProduct(value)}
                key={index}
              >
                {value}
              </div>
            ))}
          <div
            className="categoryChooserHome"
            onClick={() => filterProduct("All")}
          >
            All
          </div>
        </div>
        <div className="Searchhome">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => handleSearchTermChange(event)}
            onKeyDown={handleSearch}
            placeholder="Search..."
          />
        </div>
      </div>
      {loading ? <Loading /> : <Post post={post} />}
    </div>
  );
};

export default IndexPage;
