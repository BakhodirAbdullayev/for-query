import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { api } from "../../utils/axios";
import { Avatar, Dropdown, Button, Pagination } from "antd";
import { StarFilled, MoreOutlined } from "@ant-design/icons";
import { useDataFetch } from "../../components/hooks/getData";

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;
const Title = styled.h2`
  text-align: center;
  color: #2d033b;
`;

const UsersWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 350px));
  gap: 40px;
  @media screen and (max-width: 900px) {
    justify-content: center;
    grid-template-columns: repeat(2, minmax(240px, 350px));
  }
  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(1, minmax(240px, 350px));
  }
`;

const UserWrapeer = styled.div`
  width: 100%;
  margin-top: 50px;
  padding: 5px;
  background-color: rgba(229, 184, 244, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
const Top = styled.div`
  width: 100%;
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.button`
  font-size: 20px;
  color: ${(props) => (props.fav ? "#ffa534" : "#888")};
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
`;
const More = styled(Left)`
  color: #555;
  font-size: 26px;
`;
const Name = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  opacity: 0.7;
`;
const Details = styled(Link)`
  display: block;
  width: 80%;
  margin: 10px auto;
  button {
    box-shadow: none;
  }
`;

const PaginationWrap = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const User = ({ user }) => {
  const items = [
    {
      label: "Setting 1",
      key: "1",
    },
    {
      label: "Setting 2",
      key: "2",
    },
    {
      label: "Setting 3",
      key: "3",
    },
  ];

  return (
    <UserWrapeer>
      <Top>
        <Dropdown menu={{ items }} trigger={["click"]} placement={"bottomLeft"}>
          <More>
            <MoreOutlined />
          </More>
        </Dropdown>
      </Top>
      <Avatar size={128} src={user?.avatar} />
      <Name>{user?.first_name + " " + user?.last_name}</Name>
      <Details to={`/users/${user?.id}`}>
        <Button size={"middle"} type="primary" block={true}>
          Details
        </Button>
      </Details>
    </UserWrapeer>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
  };

  // const { data: users, isLoading } = useDataFetch(
  //   ["users"],
  //   `users?page=${current}`
  // );

  const getApi = () => {
    api.get(`users?page=${current}`).then((res) => {
      setUsers(
        res.data.data.map((i) => {
          return {
            ...i,
            fav: false,
          };
        })
      );
      setTotal(res.data.total);
    });
  };

  useEffect(() => {
    getApi();
  }, [current]);

  return (
    <Container>
      <Title>Users List</Title>
      <UsersWrapper>
        {users.map((user) => (
          <User key={user?.id} user={user} />
        ))}
      </UsersWrapper>
      <PaginationWrap>
        {users && (
          <Pagination
            defaultCurrent={1}
            total={total}
            defaultPageSize={6}
            onChange={onChange}
            current={current}
          />
        )}
      </PaginationWrap>
    </Container>
  );
};

export default Users;
