/** @format */

import React, { useState, useEffect } from "react";
import RecivedWorkCard from "../../components/RecivedWorkCard";
import MainLayout from "../../components/Layout";
import Modal from "../../components/Modal";
import { OBRAS_SINCORREGIR_URL } from "../../constants/URIs";

const RecivedWork = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [recivedWork, setRecivedWork] = useState([]);
  const [autor, setAutor] = useState("");
  useEffect(() => {
    getWorks();
  }, []);

  const getWorks = () => {
    fetch(OBRAS_SINCORREGIR_URL, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        const literaryWork = response.data;
        setRecivedWork(literaryWork);
      })
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
      {recivedWork.map((work, index) => {
        const recivedWorkProps = {
          key: index,
          openModal: openModal,
          title: work.nombreObra,
          author: `${work.nombreAutor} ${work.apellidoAutor}`,
          description: `El genero de esta obra es ${work.genero}`,
        };
        return <RecivedWorkCard {...recivedWorkProps} />;
      })}
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
