import React, { memo, useState } from "react";
import { useGetUsersQuery } from "../../context/api/userApi";
import Card from "../card/Card";

import "./cards.scss";
import Form from "../form/Form";

const Cards = () => {
  const [show, setShow] = useState(false);
  const { data, isLoading, isFetching } = useGetUsersQuery();

  return (
    <div className="container cards__container">
      <div className="user__create-btn">
        <button onClick={() => setShow(true)}>Create</button>
      </div>
      <div className="cards">
        {data?.payload.map((user) => (
          <Card key={user._id} data={user} />
        ))}
      </div>

      {show ? <Form close={setShow} /> : <></>}
    </div>
  );
};

export default memo(Cards);
