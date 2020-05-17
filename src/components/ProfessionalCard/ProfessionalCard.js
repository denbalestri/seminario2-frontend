import React, { useState } from "react";
import { Avatar, Card, Upload } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import Button from "../Button";
import { useSelector } from "react-redux";
import { SERVIDOR } from "../../constants/URIs";
import "antd/dist/antd.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ProfessionalCard = ({
  firstName,
  lastName,
  avatar,
  description,
  username,
}) => {
  const [file, setFile] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handleChange = (info) => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: "obra",
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0),
    fileList,
    onChange: handleChange,
  };

  const onSubmit = () => {
    getBase64(file.originFileObj).then((encodedFile) => {
      const body = JSON.stringify({
        contenido: encodedFile,
        genero: "Romantico",
        nombreObra: file.name,
        nombreUsuarioAutor: user.username,
        nombreUsuarioProfesional: username,
        formatoArchivodeObra: file.type,
      });

      setLoading(true);

      fetch(SERVIDOR.OBRAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      })
        .then((response) => response.json())
        .then((success) => console.log(success))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    });
  };

  return (
    <Card style={{ width: "80vw" }}>
      <section style={{ display: "flex" }}>
        <Avatar size={100} src={avatar} icon={<UserOutlined />} />
        <aside style={{ marginLeft: 10, marginTop: 10 }}>
          <p>{`${firstName} ${lastName}`}</p>
          <p>{description}</p>
        </aside>
      </section>
      <section
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Upload {...uploadProps} onChange={handleChange}>
          <Button type="">
            <UploadOutlined /> Elegir archivo
          </Button>
        </Upload>
        <Button
          size={100}
          disabled={!fileList.length}
          onClick={onSubmit}
          loading={loading}
        >
          Enviar obra
        </Button>
      </section>
    </Card>
  );
};

export default ProfessionalCard;
