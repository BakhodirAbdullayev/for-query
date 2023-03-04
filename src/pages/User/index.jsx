import React from "react";
import styled from "styled-components";
import { api } from "../../utils/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { useDataFetch } from "../../components/hooks/getData";
import { useDelData } from "../../components/hooks/deleteData";

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;
const UserWrapper = styled.div`
  max-width: 500px;
  margin: 30px auto;
  border-radius: 10px;
  background-color: rgba(180, 200, 210, 0.5);
  padding: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 180px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
`;
const Body = styled.div`
  width: 95%;
  max-width: 500px;
  margin: 0 auto;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 16px;
    font-weight: 600;
    opacity: 0.9;
    text-transform: uppercase;
  }
  span {
    font-size: 26px;
    font-weight: 600;
    color: #005036;
  }
`;
const Btns = styled.div`
  width: 100%;
  margin-top: 20px;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Edit = styled.div`
  width: 50%;
  cursor: pointer;
  button {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    box-shadow: none;
  }
`;
const Delete = styled(Edit)``;

const User = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data: user, isLoading } = useDataFetch(["user", id], `/users/${id}`, {
    enabled: !!id,
  });

  const delMut = useDelData(`/users/${id}`);
  // console.log(delMut);

  const deleteUser = () => {
    delMut.mutate(
      {},
      {
        onSuccess: (d) => {
          console.log(d);
          nav(-1);
        },
      }
    );
  };

  return (
    <Container>
      {isLoading ? (
        "Loading"
      ) : (
        <UserWrapper>
          <Image src={user?.data?.avatar} />
          <Body>
            <Info>
              <p>First name:</p>
              <span>{user?.data?.first_name}</span>
            </Info>
            <Info>
              <p>Last name:</p>
              <span>{user?.data?.last_name}</span>
            </Info>
            <Info>
              <p>Email:</p>
              <span>{user?.data?.email}</span>
            </Info>
            <Btns>
              <Edit onClick={() => nav(`/users/${id}/edit`)}>
                <Button block={true} size="large" type="primary">
                  Edit
                </Button>
              </Edit>
              <Delete onClick={deleteUser}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#f00",
                    },
                  }}
                >
                  <Button block={true} size="large" type="primary">
                    Delete
                  </Button>
                </ConfigProvider>
              </Delete>
            </Btns>
          </Body>
        </UserWrapper>
      )}
    </Container>
  );
};

export default User;
