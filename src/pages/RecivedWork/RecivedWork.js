import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecivedWorkCard from '../../components/RecivedWorkCard';
import MainLayout from '../../components/Layout';
import { SERVIDOR } from '../../constants/URIs';

const RecievedWorkList = ({ works }) => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'scroll',
      }}
    >
      <p
        style={{
          fontSize: 40,
          marginTop: 30,
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        Obras a corregir
      </p>
      {works.map((work, index) => {
        const recivedWorkProps = {
          key: index,
          title: work.nombreObra,
          nameWork: work.nombreObra,
          userAuthor: work.userAutor,
          avatar: '',
          author: `${work.nombreAutor} ${work.apellidoAutor}`,
          username: work.userAutor,
          description: `El g\u00E9nero de esta obra es ${work.genero} y su nivel de cr\u00EDtica pedida es: ${work.nivelCritica}. 
          ${work.descripcion}
          `,
        };
        return <RecivedWorkCard {...recivedWorkProps} />;
      })}
    </section>
  );
};

const RecivedWork = () => {
  const [loading, setLoading] = useState(false);
  const [recivedWork, setRecivedWork] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    getWorks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWorks = () => {
    setLoading(true);
    fetch(SERVIDOR.OBRAS_SINCORREGIR_URL(user.username), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const recivedWork = response;
        if (recivedWork === []) setRecivedWork('');
        else setRecivedWork(recivedWork);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <MainLayout>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {recivedWork.length > 0 ? (
          <RecievedWorkList works={recivedWork} />
        ) : loading ? (
          <Spin tip="Cargando..." size="large" />
        ) : (
          <section>
            <p
              style={{
                fontSize: 30,
                marginTop: 20,
              }}
            >
              Nuestro autor esta escribiendo obras estupendas, intente
              nuevamente!
            </p>
            <img src="../../../images/author.gif" alt="Sin resultados"></img>
          </section>
        )}
      </section>
    </MainLayout>
  );
};

export default RecivedWork;
