import React, { memo, useState } from "react";
import { useGetUsersQuery } from "../../context/api/userApi";
import Form from "../form/Form";
import Card from "../card/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./cards.scss";

const Cards = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = React.useState(1);
  const limit = 4;
  const { data, isLoading, isFetching } = useGetUsersQuery({
    limit,
    skip: page,
  });
  const handleChange = (event, value) => {
    setPage(value);
  };

  const count = Math.ceil(data?.total / limit) || 0;

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
      <div className="cards__pagination">
        <Stack spacing={2}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
      </div>

      {show ? <Form close={setShow} /> : <></>}
    </div>
  );
};

export default memo(Cards);
