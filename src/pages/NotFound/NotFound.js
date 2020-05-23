/** @format */

import React from "react";
import MainLayout from "../../components/Layout";
const NotFound = () => {
  return (
    <MainLayout>
      <p
        style={{
          fontSize: 30,
          marginTop: 20,
          fontFamily: "Pangolin, cursive",
        }}
      >
        Oh no! La pagina buscada no existe!
      </p>
      <img src="../../../images/notFoundPage404.gif" alt="notFoundPage" />
    </MainLayout>
  );
};

export default NotFound;
