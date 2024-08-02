import React, { memo, useEffect, useState } from "react";
import "./form.scss";
import { useCreateUserMutation } from "../../context/api/userApi";

const initialState = {
  fname: "",
  lname: "",
  username: "",
  password: "",
  age: "",
  gender: "",
  budget: "",
};

const Form = ({ close }) => {
  const [user, setUser] = useState(initialState);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const [create, { isSuccess, isLoading }] = useCreateUserMutation();

  const handleCreate = (e) => {
    e.preventDefault();

    create(user);
  };

  useEffect(() => {
    if (isSuccess) {
      close(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div onClick={() => close(false)} className="overflow"></div>
      <form onSubmit={handleCreate} action="" className="form">
        <h3>Create user</h3>
        <input
          required
          onChange={handleChange}
          name="fname"
          type="text"
          placeholder="FirstName"
        />
        <input
          onChange={handleChange}
          name="lname"
          type="text"
          placeholder="LastName"
        />
        <input
          required
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
        />
        <input
          required
          onChange={handleChange}
          minLength={8}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          required
          onChange={handleChange}
          name="age"
          type="number"
          placeholder="Age"
        />
        <select required onChange={handleChange} name="gender" id="">
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          required
          onChange={handleChange}
          name="budget"
          type="number"
          placeholder="Budget"
        />
        <div className="form__btns">
          <button>cancel</button>
          <button>{isLoading ? "Loading..." : "Create"}</button>
        </div>
      </form>
    </>
  );
};

export default memo(Form);
