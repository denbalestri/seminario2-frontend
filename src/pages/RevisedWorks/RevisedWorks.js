/** @format */

import React from "react";
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
        <List listRevisedWorks={listRevisedWorks} />;
      </section>
    </MainLayout>
  );
};

export default RevisedWork;
