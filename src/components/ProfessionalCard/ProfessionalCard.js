import React, { useState, Fragment } from "react";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { OBRAS_URL } from "../../constants/URIs";
import { getBase64 } from "../../constants/base64";
import ModalSendWork from "../ModalSendWork";
import "antd/dist/antd.css";

const ProfessionalCard = ({ professional, avatar, description, username }) => {
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const user = useSelector((state) => state.user);

  const onClickCard = () => {
    setVisibleModal(true);
  };

  const onSubmit = ({ nameWork, file }) => {
    getBase64(file.originFileObj).then((encodedFile) => {
      const body = JSON.stringify({
        contenido: encodedFile,
        genero: "Romantico",
        nombreObra: nameWork,
        nombreUsuarioAutor: user.username,
        nombreUsuarioProfesional: username,
        formatoArchivodeObra: file.type,
      });

      setLoading(true);

      fetch(OBRAS_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      })
        .then((response) => response.json())
        .then((success) => console.log(success))
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
          setVisibleModal(false);
        });
    });
  };

  const onCancelModal = () => {
    setVisibleModal(false);
  };

  return (
    <Fragment>
      <Card style={{ width: "80vw" }} hoverable onClick={onClickCard}>
        <section style={{ display: "flex" }}>
          <Avatar size={100} src={avatar} icon={<UserOutlined />} />
          <aside style={{ marginLeft: 10, marginTop: 10 }}>
            <p>{professional}</p>
            <p>{description}</p>
          </aside>
        </section>
      </Card>
      <ModalSendWork
        visible={visibleModal}
        onSendWork={onSubmit}
        onCancel={onCancelModal}
        professional={professional}
        loading={loading}
      />
    </Fragment>
  );
};

export default ProfessionalCard;
