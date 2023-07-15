import React, { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./table.css";
import { useCookies } from "react-cookie";
import { deletedPost } from "../../services/Api";

const Tables = ({ posted }) => {
  const [post, setPost] = useState([...posted]);

  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);

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
      setPost(posted);
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



  const handleChange = async (id) => {
    // navigate (`/profile/${cookies.access_token.id}`)
    // const userid = cookies?.access_token?.id;
    // const response = deletedPost(id, userid);

    console.log("handleChange");
    // if (response.ok) {
    //   toast.success("Status Updated");
    //   setStatus(true);
    // } else {
    //   toast.error("error ");
    // }
  };

  return (
    <>
      <div className="containertable">
        <input
          type="text"
          value={searchTerm}
          onChange={(event)=>handleSearchTermChange(event)}
          onKeyDown={handleSearch}
          placeholder="Search..."
        />
        <Row>
          <section className="col mt-0">
            <Card className="shsadow">
              <Table className="align-items-center">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th style={{ width: "100px" }}>Image</th>
                    <th
                      style={{
                        width: "50%",
                      }}
                    >
                      Title
                    </th>
                    <th style={{ width: "400px" }}>Created</th>
                    <th>Category</th>
                    <th style={{ width: "100px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {post.length > 0
                    ? post.map((post, index) => {
                        const { _id, title, createdAt, image, category } = post;
                        return (
                          <tr
                            key={_id}
                            style={{
                              height: "40px",
                              overFlow: "hiiden",
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>
                              <img src={image} alt="" />
                            </td>
                            <td className="table_height_adjust">{title}</td>
                            <td>{createdAt.slice(0, 10)}</td>
                            <td>{category}</td>
                            <td>
                              {cookies?.access_token?.id === post.author ? (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "inline-block",
                                    }}
                                  >
                                    <NavLink
                                      to={`/post/${_id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-eye"
                                        style={{ color: "green" }}
                                      ></i>
                                    </NavLink>
                                  </div>
                                  <div
                                    style={{
                                      display: "inline-block",
                                    }}
                                  >
                                    <NavLink
                                      to={`/edit/${_id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-pen-to-square"
                                        style={{ color: "blue" }}
                                      ></i>
                                    </NavLink>
                                  </div>
                                  <div
                                    style={{
                                      display: "inline-block",
                                      marginLeft: "2px",
                                    }}
                                  >
                                    <NavLink
                                      onClick={() => {
                                        handleChange(_id);
                                        setRedirect(true);
                                      }}
                                      style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i
                                        className="fa-solid fa-trash"
                                        style={{ color: "red" }}
                                      ></i>
                                    </NavLink>
                                  </div>
                                </div>
                              ) : (
                                <NavLink
                                  to={`/post/${_id}`}
                                  className="text-decoration-none"
                                >
                                  <i
                                    className="fa-solid fa-eye"
                                    style={{ color: "green" }}
                                  ></i>
                                </NavLink>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    : "no"}
                </tbody>
              </Table>
            </Card>
          </section>
        </Row>

        <ToastContainer />
      </div>
    </>
  );
};

export default Tables;
