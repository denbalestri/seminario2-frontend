/** @format */

import React, { useState, useEffect } from "react";
import RecivedWorkCard from "../../components/RecivedWorkCard";
import MainLayout from "../../components/Layout";
import Modal from "../../components/Modal";

const recivedWorkList = [
  {
    title: "La chica en la oscuridad",
    autor: "Sebastian Rios",
    description:
      "Realizada por el Autor Sebastian, esta obra es del genero drama que cuenta de una chica que busca en su pasado mas oscuro, su verdadera identidad",
  },
  {
    title: "La chica en la oscuridad",
    autor: "Luciana Martinez",
    description:
      "Realizada por el Autor Sebastian, esta obra es del genero drama que cuenta de una chica que busca en su pasado mas oscuro, su verdadera identidad",
  },
  {
    title: "La chica en la oscuridad",
    autor: "Maria Luz",
    description:
      "Realizada por el Autor Sebastian, esta obra es del genero drama que cuenta de una chica que busca en su pasado mas oscuro, su verdadera identidad",
  },
];
const RecivedWork = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [autor, setAutor] = useState("");
  useEffect(() => {
    // get all works
  }, []);

  const onCancel = () => {
    setVisible(false);
  };
  const onSendMessage = () => {
    setVisible(false);
    //send data to backend
  };

  const openModal = (autor) => {
    setAutor(autor);
    setVisible(true);
  };
  return (
    <MainLayout>
      {recivedWorkList.map((work, index) => {
        const recivedWorkProps = {
          key: index,
          openModal: openModal,
          ...work,
        };
        return <RecivedWorkCard {...recivedWorkProps} />;
      })}
      <Modal
        visible={visible}
        autor={autor}
        onCancel={onCancel}
        onSendMenssage={onSendMessage}
      />
    </MainLayout>
  );
};

export default RecivedWork;
