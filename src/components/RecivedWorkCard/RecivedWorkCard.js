import React, { useState, Fragment } from 'react';
import { Skeleton, Card, Avatar } from 'antd';
import { EditOutlined, FileTextTwoTone, UserOutlined } from '@ant-design/icons';
import { SERVIDOR } from '../../constants/URIs';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { getBase64 } from '../../constants/base64';
import { notification } from 'antd';
import statuses from '../../constants/Notification';
import { useSelector } from 'react-redux';
const { Meta } = Card;

const openNotification = type => {
  notification[type]({
    message: statuses.statusesRecivedWork[type].message,
    description: statuses.statusesRecivedWork[type].description,
  });
};

function base64ToBlob(file) {
  // extract content type and base64 payload from original string
  var pos = file.indexOf(';base64,');
  var type = file.substring(5, pos);
  var base64 = file.substr(pos + 8);

  // decode base64
  var fileContent = atob(base64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(fileContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (var n = 0; n < fileContent.length; n++) {
    view[n] = fileContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  var blob = new Blob([buffer], { type: type });

  return blob;
}
const downloadFile = (blob, fileName) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

const RecivedWorkCard = ({
  title,
  description,
  nameWork,
  author,
  userAuthor,
  username,
  avatar,
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const user = useSelector(state => state.user.user);

  const onClickDownload = () => {
    setLoading(true);
    fetch(SERVIDOR.OBRAS_CONTENIDO_URL(nameWork, username), {
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
        const file = response.contenido;
        const nameWork = response.nombreObra;
        const fileConverted = base64ToBlob(file);
        downloadFile(fileConverted, `Archivo-${nameWork}`);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const onSendFeedback = feedback => {
    setLoadingFeedback(true);
    const file = feedback.file;
    if (file) {
      getBase64(file.originFileObj).then(encodedFile => {
        const body = JSON.stringify({
          contenidoCorreccion: encodedFile,
          nombreObra: nameWork,
          nombreUsuarioAutor: userAuthor,
          mensajeCorreccion: feedback.message,
          nombreUsuarioProfesional: user.username,
        });

        fetch(SERVIDOR.CORRECCIONES_URL, {
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
            setLoadingFeedback(false);
            setVisible(false);
          });
      });
    }
  };

  const openModal = () => {
    setVisible(true);
  };

  const onClickSendMessage = () => {
    openModal();
  };
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      <Card
        style={{
          width: '80vw',
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        title={title}
        actions={[
          <Button type="" onClick={onClickSendMessage}>
            {' '}
            Enviar Mensaje
            <EditOutlined />
          </Button>,
          <Button type="" onClick={onClickDownload} loading={loading}>
            {' '}
            Descargar obra literaria
            <FileTextTwoTone />
          </Button>,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={
              <Avatar icon={<UserOutlined />} src={avatar} size="large" />
            }
            title={author}
            description={description}
          />
        </Skeleton>
      </Card>
      <Modal
        visible={visible}
        author={author}
        onCancel={onCancel}
        loading={loadingFeedback}
        onSendFeedback={onSendFeedback}
      />
    </Fragment>
  );
};

export default RecivedWorkCard;
