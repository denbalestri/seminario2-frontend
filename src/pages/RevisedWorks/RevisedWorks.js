import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import List from '../../components/List';
import { SERVIDOR } from '../../constants/URIs';

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
          title: `${work.nombreProfesional} ${work.apellidoProfesional}`,
          avatar: '../../../images/person3.jpg',
          description: `Novela llamada ${work.nombreObra} del genero ${work.genero}`,
          content: work.mensajeCorreccion,
        }));
        setRevisedWorks(parsedWorks);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Spin tip="Cargando..." size="large" />
  ) : (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <List listRevisedWorks={revisedWorks} />
    </section>
  );
};

export default RevisedWork;
