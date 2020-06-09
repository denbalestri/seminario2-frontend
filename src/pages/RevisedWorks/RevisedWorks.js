import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import List from '../../components/List';
import MainLayout from '../../components/Layout';
import { SERVIDOR } from '../../constants/URIs';

const RevisedWork = () => {
  const [revisedWorks, setRevisedWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.user);
  const notification = useSelector(state => state.notifications.notification);

  useEffect(() => {
    //notifications
  }, [notification]);

  useEffect(() => {
    setLoading(true);
    fetch(SERVIDOR.CORRECCIONES_URL(user.username), {
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
          usernameProfessional: work.profesional,
          description: `Novela llamada ${work.nombreObra} del g\u00E9nero ${work.genero}`,
          content: work.mensajeCorreccion,
        }));
        setRevisedWorks(parsedWorks);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {loading ? (
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
            <p
              style={{
                fontSize: 35,
                marginTop: 50,
                fontFamily: 'Pangolin, cursive',
              }}
            >
              Tus Correcciones
            </p>
            <List listRevisedWorks={revisedWorks} />
          </section>
        )}
      </section>
    </MainLayout>
  );
};

export default RevisedWork;
