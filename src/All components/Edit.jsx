import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const notify = () =>
    toast.success("data updated successfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const { id } = useParams();
  const reairect = useNavigate();
  const [Data, SetData] = useState({
    fname: "",
    lname: "",
    number: "",
  });

  const OnChangInput = (e) => {
    SetData({ ...Data, [e.target.name]: e.target.value });
  };

  const OnSubmited = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/updated", Data)
      .then(function (response) {
        console.log(response.data);
        reairect("/");
        notify();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadeData();
  }, []);

  const loadeData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/show/${id}`)
      .then(function (response) {
        SetData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mt-5">
        <Link className="btn btn-danger" to="/">
          Back
        </Link>
        <div className="mt-3 d-flex justify-content-center bg-success p-4 text-dark bg-opacity-25">
          <form className="col-6" onSubmit={(e) => OnSubmited(e)}>
            <div className="mb-3">
              <label className="form-label">Fname</label>
              <input
                type="text"
                className="form-control"
                name="fname"
                value={Data.fname}
                onChange={(e) => OnChangInput(e)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Lname</label>
              <input
                type="text"
                className="form-control"
                name="lname"
                value={Data.lname}
                onChange={(e) => OnChangInput(e)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Number</label>
              <input
                type="text"
                className="form-control"
                name="number"
                value={Data.number}
                onChange={(e) => OnChangInput(e)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
