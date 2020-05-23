import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import MainLayout from '../../components/Layout';
import { useSelector } from 'react-redux';
import List from '../../components/List';
import { SERVIDOR } from '../../constants/URIs';

const listRevisedWorks = [
  {
    title: `Nicolas Fuentes`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Novela llamada El Paraiso del genero Romantico',
    content:
      'Aqui te escribo sobre mi devolucion con respecto a la novela que escribiste. Me gusto mucho la idea, mejoraria el desenlace del final.',
  },
  {
    title: `Silvia Carrozo`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Novela llamada La chica en la oscuridad del genero Suspenso',
    content: 'Mejoraria en el tema de los conflictos entre los personajes.',
  },
];

const RevisedWork = () => {
  const [revisedWorks, setRevisedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetch(SERVIDOR.CORRECCIONES_URL + '?nombreUsuario=' + user.username, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const parsedWorks = response.map(work => ({
          title: work.profesional,
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          description: `Novela llamada ${work.nombreObra} del genero ${work.genero}`,
          content: work.mensajeCorreccion,
        }));
        setRevisedWorks(parsedWorks);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  });

  return (
    <MainLayout>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
        }}
      >
        {true ? (
          <Spin tip="Cargando..." size="large" />
        ) : (
          <List listRevisedWorks={revisedWorks} />
        )}
      </section>
    </MainLayout>
  );
};

export default RevisedWork;
