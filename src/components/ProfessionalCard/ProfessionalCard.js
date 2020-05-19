import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SERVIDOR } from '../../constants/URIs';
import { getBase64 } from '../../constants/base64';
import ModalSendWork from '../ModalSendWork';
import 'antd/dist/antd.css';
import { notification } from 'antd';
import statuses from '../../constants/Notification';

const openNotification = type => {
  notification[type]({
    message: statuses.statusesProfessional[type].message,
    description: statuses.statusesProfessional[type].description,
  });
};

const ProfessionalCard = ({
  professional,
  avatar,
  description,
  userProfessional,
}) => {
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const user = useSelector(state => state.user);

  const onClickCard = () => {
    setVisibleModal(true);
  };

  const onSubmit = ({ form, file }) => {
    getBase64(file.originFileObj).then(encodedFile => {
      const body = JSON.stringify({
        contenido: encodedFile,
        genero: form.genre,
        nombreObra: form.nameWork,
        nombreUsuarioAutor: user.username,
        nombreUsuarioProfesional: userProfessional,
        formatoArchivodeObra: file.type,
      });

      setLoading(true);

      fetch(SERVIDOR.OBRAS_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })
        .then(response => {
          if (response.status === 200) {
            openNotification('success');
          } else {
            openNotification('error');
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false);
          setVisibleModal(false);
        });
    });
  };

  const onCancelModal = () => {
    setVisibleModal(false);
  };

  return (
    <>
      <Card style={{ width: '80vw' }} hoverable onClick={onClickCard}>
        <section style={{ display: 'flex' }}>
          <Avatar size={100} src={avatar} icon={<UserOutlined />} />
          <aside style={{ marginLeft: 10, marginTop: 10 }}>
            <p>{professional}</p>
            <p>{description}</p>
          </aside>
        </section>
      </Card>
      <ModalSendWork
        visible={visibleModal}
        onSendWork={onSubmit}
        onCancel={onCancelModal}
        professional={professional}
        loading={loading}
      />
    </>
  );
};

export default ProfessionalCard;
