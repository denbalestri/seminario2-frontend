import React from 'react';
import MainLayout from '../../components/Layout';
const NotFound = () => {
  return (
    <MainLayout>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <p
          style={{
            fontSize: 30,
            marginTop: 20,
          }}
        >
          Oh no! La pagina buscada no existe!
        </p>
        <img src="../../../images/notFoundPage404.gif" alt="notFoundPage" />
      </section>
    </MainLayout>
  );
};

export default NotFound;
