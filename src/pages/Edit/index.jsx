import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../utils/axios";
import { Button, Form, Input } from "antd";
import { User } from "../Users";
import { useDataFetch } from "../../components/hooks/getData";
import { useDataEdit } from "../../components/hooks/editData";

const Container = styled.div`
  width: min(100% - 20px, 800px);
  margin: 50px auto;
  label {
    font-size: 16px !important;
  }
  input {
    border-color: #909090;
    ::placeholder {
      color: #909090;
    }
  }
`;

const Edit = () => {
  const formRef = useRef(null);
  const { id } = useParams();

  const editMut = useDataEdit(`users/${id}`);

  const { data: user, isLoading } = useDataFetch(["user", id], `/users/${id}`, {
    enabled: !!id,
  });

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const onFinish = (values) => {
    editMut.mutate(
      { ...values },
      {
        onSuccess: () => onReset(),
      }
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <Form
          ref={formRef}
          layout="vertical"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 32,
          }}
          style={{
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          fields={[
            {
              name: ["first_name"],
              value: user?.data?.first_name,
            },
            {
              name: ["last_name"],
              value: user?.data?.last_name,
            },
            {
              name: ["email"],
              value: user?.data?.email,
            },
            {
              name: ["avatar"],
              value: user?.data?.avatar,
            },
          ]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input your image URL!",
              },
            ]}
          >
            <Input placeholder='Please write with "https://" ' />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size={window.innerWidth > 600 && "large"}
              style={{ boxShadow: "none", marginRight: 20 }}
            >
              Submit
            </Button>

            <Button
              htmlType="button"
              onClick={onReset}
              size="large"
              style={{ boxShadow: "none" }}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      )}
      {editMut.isSuccess && <User user={editMut.variables} />}
    </Container>
  );
};

export default Edit;
