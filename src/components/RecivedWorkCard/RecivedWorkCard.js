/** @format */

import React from "react";
import { Skeleton, Card, Avatar } from "antd";
import { EditOutlined, FileTextTwoTone, UserOutlined } from "@ant-design/icons";

import Button from "../../components/Button";
const { Meta } = Card;
const RecivedWorkCard = ({ loading, title, description, openModal, autor }) => {
  const onClickDownload = () => {
    //download the file
  };
  const onClickSendMessage = () => {
    openModal(autor);
  };
  return (
    <Card
      style={{ width: "80vw", marginTop: 20 }}
      title={title}
      actions={[
        <Button type="" onClick={onClickSendMessage}>
          {" "}
          Enviar Mensaje
          <EditOutlined />
        </Button>,
        <Button type="" onClick={onClickDownload}>
          {" "}
          Descargar obra literaria
          <FileTextTwoTone />
        </Button>,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={<Avatar icon={<UserOutlined />} size="large" />}
          title={autor}
          description={description}
        />
      </Skeleton>
    </Card>
  );
};

export default RecivedWorkCard;
