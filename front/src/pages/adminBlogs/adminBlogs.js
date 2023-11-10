import React, { useState, useEffect } from "react";
import "./adminBlogs.css"
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminBlogs = () => {

    const[refreshBlogs,setRefreshBlogs]=useState("");
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({
      title: "",
      image: null,
      author:"",
      content:"",
      date:Date.now()
    });
  
    const [editedBlog, setEditedBlog] = useState({
        title: "",
        image: null,
        author:"",
        content:"",
        date:""
    });
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/blogs");
          if (response.ok) {
            const json = await response.json();
            setBlogs(json);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchBlogs();
    }, [refreshBlogs]);
  
    const handleAddBlog = async (e) => {
      e.preventDefault();
  
      try {
        const formData = new FormData();
        formData.append("title", newBlog.title);
        formData.append("image", newBlog.image);
        formData.append("author", newBlog.author);
        formData.append("content", newBlog.content);
        formData.append("date", newBlog.date);


  
        const response = await fetch("http://localhost:4000/api/Blogs", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const newBlogData = await response.json();
          setBlogs((prevBlogs) => [...prevBlogs, newBlogData]);
          setNewBlog({
            title: "",
            image: null,
            author:"",
            content:"",
            date:Date.now()
          });
          console.log("Blog added successfully");
        } else {
          console.error("Failed to add Blog");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const handleUpdateBlog = async (e) => {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this Blog?"
      );
      e.preventDefault();
  
      if (confirmUpdate) {
        try {
          const formData = new FormData();
          if (editedBlog.title) {
            formData.append("title", editedBlog.title);
          }
          if (editedBlog.image) {
            formData.append("image", editedBlog.image);
          }
          if (editedBlog.author) {
            formData.append("author", editedBlog.author);
          }
          if (editedBlog.content) {
            formData.append("content", editedBlog.content);
          }
          if (editedBlog.image) {
            formData.append("date", editedBlog.date);
          }
  
          const response = await fetch(
            `http://localhost:4000/api/blogs/${editedBlog._id}`,
            {
              method: "PATCH",
              body: formData,
            }
          );
  
          if (response.ok) {
            const updatedBlog = await response.json();
            setBlogs((prevBlogs) =>
              prevBlogs.map((Blog) =>
                Blog._id === updatedBlog._id ? updatedBlog : Blog
              )
            );
  
            console.log("Blog updated successfully");
          } else {
            console.error("Failed to update Blog");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        setIsBlogModalOpen(false);
        setRefreshBlogs(refreshBlogs+"refresh");
      }
    };
  
    const handleDeleteBlog = async (BlogId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Blog?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/blogs/${BlogId}`,
            {
              method: "DELETE",
            }
          );
  
          if (response.ok) {
            setBlogs((prevBlogs) =>
              prevBlogs.filter((Blog) => Blog._id !== BlogId)
            );
            console.log("Blog deleted successfully");
          } else {
            console.error("Failed to delete Blog");
          }
        } catch (error) {
          console.error("Error:", error);
        }
  
      }
    };
  
    const handletitleChange = (e) => {
      setNewBlog({
        ...newBlog,
        title: e.target.value,
      });
    };
  
    const handleimageChange = (e) => {
      setNewBlog({
        ...newBlog,
        image: e.target.files[0],
      });
    };

    const handleAuthorChange = (e) => {
        setNewBlog({
          ...newBlog,
          author: e.target.value,
        });
      };

      const handleContentChange = (e) => {
        setNewBlog({
          ...newBlog,
          content: e.target.value,
        });
      };

      const handleDateChange = (e) => {
        setNewBlog({
          ...newBlog,
          date: e.target.value,
        });
      };
  
    return (
      <div className="adminBlogView">
        <SideNavbar
          blogs={true}
       
        />
  
        <div className="adminBlogMain">
          <h1 className="adminBlog">Admin Blog</h1>
  
          <div className="add-Blog">
            <div>
              <h2>Add New Blog</h2>
            </div>
            <hr />
            <form className="addBlogform" onSubmit={handleAddBlog}>
              <div className="forminputs-add-Blog">
                <label htmlFor="title">Blog Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newBlog.title}
                  onChange={handletitleChange}
                  required
                />
              </div>
              <br />
  
              <div className="forminputs-add-Blog">
                <label htmlFor="image">Blog Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleimageChange}
                  required
                />
              </div>
  
              <br />

              <div className="forminputs-add-Blog">
                <label htmlFor="author">Author Name:</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={newBlog.author.name}
                  onChange={handleAuthorChange}
                  required
                />
              </div>
              <br />

              <div className="forminputs-add-Blog">
                <label htmlFor="content">Blog Content:</label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={newBlog.content}
                  onChange={handleContentChange}
                  required
                />
              </div>
              <br />
              <div className="forminputs-add-Blog">
                <label htmlFor="date">Blog Date:</label>
                <input
                className="blogdateadmin"
                  type="date"
                  id="date"
                  name="date"
                  value={newBlog.date}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <br />
  
              <button type="submit">Add Blog</button>
            </form>
          </div>
  
          <div className="Blog-list">
            {blogs.map((Blog) => (
              <div className="Blog" key={Blog._id}>
                <img
                  src={`http://localhost:4000/${Blog.image}`}
                  alt={Blog.title}
                />
                <div className="Blog-info">
                  <h2>{Blog.title.toUpperCase()}</h2>
                  <div className="Blog-actions">
                    <button
                      onClick={() => {
                        setEditedBlog(Blog);
                        setIsBlogModalOpen(true);
                        console.log(editedBlog);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteBlog(Blog._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="testModal">
            <div className={`modal ${isBlogModalOpen ? "open" : ""}`}>
              <div className="modal-content">
                <span
                  className="close"
                  onClick={() => setIsBlogModalOpen(false)}
                >
                  &times;
                </span>
                <h2>Edit</h2>
  
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Blog Title:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editedBlog.title}
                      onChange={(e) =>
                        setEditedBlog({
                          ...editedBlog,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Blog Image:</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={(e) =>
                        setEditedBlog({
                          ...editedBlog,
                          image: e.target.files[0],
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Blog Author:</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={editedBlog.author}
                      onChange={(e) =>
                        setEditedBlog({
                          ...editedBlog,
                          author: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label  htmlFor="date">Blog Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={editedBlog.date}
                      onChange={(e) =>
                        setEditedBlog({
                          ...editedBlog,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Blog Content:</label>
                    <input
                    className="text"
                      type="text"
                      id="content"
                      name="content"
                      value={editedBlog.content}
                      onChange={(e) =>
                        setEditedBlog({
                          ...editedBlog,
                          content: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="modalbuttons">
                    <button onClick={(e) => handleUpdateBlog(e)}>Save</button>
                    <button onClick={() => setIsBlogModalOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdminBlogs