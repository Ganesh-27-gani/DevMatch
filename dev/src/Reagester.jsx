import React from 'react';
import register from "./assets/images/register1.png";
import "./Register.css";

function Register() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">

        <div className="col-md-8">
          <div className="card p-4 register-card">
            <div className="row align-items-center">

              {/* LEFT – FORM */}
              <div className="col-md-6 form-animate">
                <h2 className="mb-4 text-center fw-bold">Register</h2>

                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Phone Number</label>
                    <input type="number" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control" />
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Check me out</label>
                  </div>

                  <button className="btn btn-primary w-100 fw-bold">
                    Submit
                  </button>
                </form>
              </div>

              {/* RIGHT – IMAGE */}
              <div className="col-md-6 image-animate text-center">
                <img
                  src={register}
                  alt="Register"
                  className="img-fluid"
                  style={{ maxHeight: "300px" }}
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
