/** @format */

import React, { useState, useEffect } from "react";
import RecivedWorkCard from "../../components/RecivedWorkCard";
import MainLayout from "../../components/Layout";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { OBRAS_SINCORREGIR_URL } from "../../constants/URIs";

const RecivedWork = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [recivedWork, setRecivedWork] = useState("");
  const [autor, setAutor] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getWorks();
  }, []);

  const getWorks = () => {
    fetch(OBRAS_SINCORREGIR_URL(user.username), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onSendFeedback = (feedback) => {
    setVisible(false);
    console.log(feedback);
    //send data to backend
  };

  const openModal = (autor) => {
    setAutor(autor);
    setVisible(true);
  };
  return (
    <MainLayout>
      {recivedWork ? (
        recivedWork.map((work, index) => {
          const recivedWorkProps = {
            key: index,
            openModal: openModal,
            title: work.nombreObra,
            nameWork: work.nombreObra,
            author: `${work.nombreAutor} ${work.apellidoAutor}`,
            description: `El genero de esta obra es ${work.genero}`,
          };
          return <RecivedWorkCard {...recivedWorkProps} />;
        })
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
        onSendFeedback={onSendFeedback}
      />
    </MainLayout>
  );
};

export default RecivedWork;
