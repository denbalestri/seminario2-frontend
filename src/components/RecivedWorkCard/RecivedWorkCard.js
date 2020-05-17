/** @format */

import React, { useState } from "react";
import { Skeleton, Card, Avatar } from "antd";
import { EditOutlined, FileTextTwoTone, UserOutlined } from "@ant-design/icons";
import { OBRAS_CONTENIDO_URL } from "../../constants/URIs";
import Button from "../../components/Button";

const { Meta } = Card;

function base64ToBlob(file) {
  // extract content type and base64 payload from original string
  var pos = file.indexOf(";base64,");
  var type = file.substring(5, pos);
  var base64 = file.substr(pos + 8);

  // decode base64
  var fileContent = atob(base64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(fileContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (var n = 0; n < fileContent.length; n++) {
    view[n] = fileContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  var blob = new Blob([buffer], { type: type });

  return blob;
}
const downloadFile = (blob, fileName) => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

const RecivedWorkCard = ({
  title,
  description,
  openModal,
  nameWork,
  author,
  username,
}) => {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const onClickDownload = () => {
    setLoading(true);
    fetch(OBRAS_CONTENIDO_URL(nameWork, username), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const file = response.contenido;
        const nameWork = response.nombreObra;
        const fileConverted = base64ToBlob(file);
        downloadFile(fileConverted, `file`);
        setFile(fileConverted);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
        <Button type="" onClick={onClickDownload} loading={loading}>
          {" "}
          Descargar obra literaria
          <FileTextTwoTone />
        </Button>,
      ]}
    >
      <Skeleton loading={false} avatar active>
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
