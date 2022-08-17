import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const notify = () =>
    toast.error("Data Delete Successfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const [user, setUser] = useState([]);
  const loadeUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/data")
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    loadeUser();
  }, []);

  const deleted = (id) => {
    axios
      .get(`http://127.0.0.1:8000/api/deleted/${id}`)
      .then(function (response) {
        loadeUser();
        notify();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mt-5">
        <ToastContainer />
        <Link to="/add" className="btn btn-info m-3">
          Add User
        </Link>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Fname</th>
              <th scope="col">Lname</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((row, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{row.fname}</td>
                <td>{row.lname}</td>
                <td>{row.number}</td>
                <td>
                  <Link to={`/edit/${row.id}`} className="btn btn-success mx-3">
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <Link
                    to
                    className="btn btn-danger"
                    onClick={() => deleted(row.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
