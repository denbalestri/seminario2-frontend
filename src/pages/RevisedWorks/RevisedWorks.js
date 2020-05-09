/** @format */

import React, { useState } from "react";
import MainLayout from "../../components/Layout";
import List from "../../components/List";
const listRevisedWorks = [
  {
    title: `Nicolas Fuentes`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "Novela llamada El Paraiso del genero Romantico",
    content:
      "Aqui te escribo sobre mi devolucion con respecto a la novela que escribiste. Me gusto mucho la idea, mejoraria el desenlace del final.",
  },
  {
    title: `Silvia Carrozo`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "Novela llamada La chica en la oscuridad del genero Suspenso",
    content: "Mejoraria en el tema de los conflictos entre los personajes.",
  },
];

const RevisedWork = () => {
  const [pagination, setPagination] = useState(0);
  const [openComments, setOpenComments] = useState(0);

  const onClickComment = () => {
    setOpenComments(!openComments);
  };
  return (
    <MainLayout>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        <List
          openComments={openComments}
          listRevisedWorks={listRevisedWorks}
          onClickComment={onClickComment}
        />
        ;
      </section>
    </MainLayout>
  );
};

export default RevisedWork;
