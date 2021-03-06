import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SERVIDOR } from '../../constants/URIs';
import Rating from '@material-ui/lab/Rating';
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
  quantityReviews,
  descriptionProfessional,
  rating,
}) => {
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const user = useSelector(state => state.user.user);

  const onClickCard = () => {
    setVisibleModal(true);
  };

  const onSubmit = ({ form, date, file }) => {
    getBase64(file.originFileObj).then(encodedFile => {
      const body = JSON.stringify({
        contenido: encodedFile,
        genero: form.genre,
        nombreObra: form.nameWork,
        nombreUsuarioAutor: user.username,
        nombreUsuarioProfesional: userProfessional,
        formatoArchivodeObra: file.type,
        nivelDeCritica: form.review,
        descripcionObra: form.description,
        fechaLimite: date,
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
      <Card
        style={{
          minWidth: 600,
          marginTop: 20,
          marginRight: 20,
          marginLeft: 40,
        }}
        hoverable
        onClick={onClickCard}
      >
        <section style={{ display: 'flex' }}>
          <Avatar
            size={200}
            src={avatar}
            icon={<UserOutlined />}
            style={{ minWidth: 200, minHeight: 200 }}
          />
          <aside
            style={{ marginLeft: 10, marginTop: 15, fontFamily: 'Ubuntu' }}
          >
            <p style={{ fontWeight: 700, fontSize: 22 }}>{professional}</p>
            <p style={{ fontSize: 17 }}>{description}</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Rating
                name="half-rating-read"
                defaultValue={rating}
                precision={0.5}
                readOnly
              />
              <p>({quantityReviews} opiniones)</p>

              <p style={{ maxWidth: 350 }}>{descriptionProfessional}</p>
            </div>
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
