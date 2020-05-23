import React from 'react';

const NotFound = () => {
  return (
    <>
      <p
        style={{
          fontSize: 30,
          marginTop: 20,
          fontFamily: 'Pangolin, cursive',
        }}
      >
        Oh no! La pagina buscada no existe!
      </p>
      <img src="../../../images/notFoundPage404.gif" alt="notFoundPage" />
    </>
  );
};

export default NotFound;
