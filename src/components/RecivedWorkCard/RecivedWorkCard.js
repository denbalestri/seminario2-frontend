/** @format */

import React from "react";
import { Skeleton, Card, Avatar } from "antd";
import { EditOutlined, FileTextTwoTone, UserOutlined } from "@ant-design/icons";

import Button from "../../components/Button";
const { Meta } = Card;
const RecivedWorkCard = ({
  loading,
  title,
  description,
  openModal,
  author,
}) => {
  const onClickDownload = () => {
    //download the file
  };
  const onClickSendMessage = () => {
    openModal(author);
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
          title={author}
          description={description}
        />
      </Skeleton>
    </Card>
  );
};

export default RecivedWorkCard;
