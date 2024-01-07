import React, { useState, useEffect } from "react";
import axios from "axios";
import "./blogs.css";
import Navbar from "../../components/Navbar/Navbar";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blog");
        if (response.status == 200) {
          const json = response.data;
          setBlogs(json);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="adminBlogView">
      <Navbar blogs={true} />

      <div className="adminBlogMain">
        <h1 className="adminBlog">Blog</h1>
        <div className="Blog-list">
          {blogs.map((Blog) => (
            <div className="Blog" key={Blog.id}>
              <img
                src={`http://localhost:8000/${Blog.image}`}
                alt={Blog.title}
              />
              <div className="Blog-info">
                <h2>{Blog.title.toUpperCase()}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
