import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Main.css";

function Main() {
  const [post, setPosts] = useState(null);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5555/user").then((res) => setPosts(res.data));
  }, [reload]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const post = Object.fromEntries(formData);

    axios.post("http://localhost:5555/user", post).then((res) => {
      e.target.reset();
      setReload((prev) => !prev);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5555/user/${id}`).then((res) => {
      setReload((p) => !p);
    });
  };

  const handleEdit = (user) => {
    setEdit(user);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    axios
      .put(`http://localhost:5555/user/${edit.id}`, updatedData)
      .then((res) => {
        setReload((prev) => !prev);
        setEdit(null);
      });
  };

  return (
    <div className="main">
      <form action="" onSubmit={edit ? handleUpdate : handleCreatePost}>
        <div>
          <p>First Name</p>
          <input
            required
            type="text"
            name="fname"
            defaultValue={edit?.fname || ""}
          />
        </div>
        <div>
          <p>Last Name</p>
          <input
            required
            type="text"
            name="lname"
            defaultValue={edit?.lname || ""}
          />
        </div>
        <div>
          <p>Age</p>
          <input
            required
            type="text"
            name="age"
            defaultValue={edit?.age || ""}
          />
        </div>
        <div>
          <p>Proffecion</p>
          <input
            required
            type="text"
            name="prof"
            defaultValue={edit?.prof || ""}
          />
        </div>
        <button>{edit ? "Update" : "Create"}</button>
      </form>
      <div className="wrapper">
        {post?.map((posts) => (
          <div key={posts.id} className="user">
            <div className="img">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                alt=""
              />
            </div>
            <div>
              <p>Name:</p>
              <p>{posts.fname}</p>
            </div>
            <div>
              <p>Last Name:</p>
              <p>{posts.lname}</p>
            </div>
            <div>
              <p>Age:</p>
              <p>{posts.age}</p>
            </div>
            <div>
              <p>Proffecion:</p>
              <p>{posts.prof}</p>
            </div>
            <div className="btns">
            <button onClick={() => handleDelete(posts.id)}>Delete</button>
            <button onClick={() => handleEdit(posts)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
