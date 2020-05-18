/** @format */

import React, { useState, useEffect } from "react";
import RecivedWorkCard from "../../components/RecivedWorkCard";
import MainLayout from "../../components/Layout";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { Spin } from "antd";
import { getBase64 } from "../../constants/base64";
import { SERVIDOR } from "../../constants/URIs";

const RecivedWork = () => {
  const [loading, setLoading] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [visible, setVisible] = useState(false);
  const [recivedWork, setRecivedWork] = useState([]);
  const [autor, setAutor] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getWorks();
  }, []);

  const getWorks = () => {
    setLoading(true);
    fetch(SERVIDOR.OBRAS_SINCORREGIR_URL(user.username), {
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
        const recivedWork = response;
        if (recivedWork === []) setRecivedWork("");
        else setRecivedWork(recivedWork);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onSendFeedback = (feedback) => {
    setLoadingFeedback(true);
    const file = feedback.file;
    if (file) {
      getBase64(file.originFileObj).then((encodedFile) => {
        const body = JSON.stringify({
          contenido: encodedFile,
          nombreUsuarioAutor: autor,
          nombreUsuarioProfesional: user.username,
        });
      });
    }
  };

  const openModal = (autor) => {
    setAutor(autor);
    setVisible(true);
  };
  return (
    <MainLayout>
      {recivedWork.length > 0 ? (
        recivedWork.map((work, index) => {
          const recivedWorkProps = {
            key: index,
            openModal: openModal,
            title: work.nombreObra,
            nameWork: work.nombreObra,
            author: `${work.nombreAutor} ${work.apellidoAutor}`,
            username: work.userAutor,
            description: `El genero de esta obra es ${work.genero}`,
          };
          return <RecivedWorkCard {...recivedWorkProps} />;
        })
      ) : loading ? (
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spin tip="Cargando..." size="large" />
        </section>
      ) : (
        <section>
          <p
            style={{
              fontSize: 30,
              marginTop: 20,
              fontFamily: "Pangolin, cursive",
            }}
          >
            Nuestro autor esta escribiendo obras estupendas, intente nuevamente!
          </p>
          <img src="../../../images/author.gif" alt="Sin resultados"></img>
        </section>
      )}
      <Modal
        visible={visible}
        autor={autor}
        onCancel={onCancel}
        loading={loadingFeedback}
        onSendFeedback={onSendFeedback}
      />
    </MainLayout>
  );
};

export default RecivedWork;
