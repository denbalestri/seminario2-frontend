import React, { useState } from 'react';
import { SERVIDOR } from '../../constants/URIs';
import Modal from '../../components/Modal';
import { getBase64 } from '../../constants/base64';
import { notification } from 'antd';
import statuses from '../../constants/Notification';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import SendIcon from '@material-ui/icons/Send';
import useStyles from './styles';

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
  description,
  nameWork,
  author,
  userAuthor,
  username,
  synopsis,
  date,
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const user = useSelector(state => state.user.user);
  const classes = useStyles();
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

        fetch(SERVIDOR.CORRECCIONESPROFESIONAL_URL, {
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
    <section>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="obras-corregir"
            height="140"
            image="../../images/corrector.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="p">
              {nameWork} creado por {author}
            </Typography>
            {date ? (
              <Typography
                gutterBottom
                variant="body1"
                component="p"
                className={classes.date}
              >
                Fecha Limite: {date}
              </Typography>
            ) : (
              ''
            )}
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {synopsis}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            onClick={onClickSendMessage}
            endIcon={<SendIcon />}
          >
            Enviar Mensaje
          </Button>
          <Button
            size="small"
            onClick={onClickDownload}
            startIcon={<GetAppIcon />}
          >
            Descargar obra
          </Button>
        </CardActions>
      </Card>
      <Modal
        visible={visible}
        author={author}
        onCancel={onCancel}
        loading={loadingFeedback}
        onSendFeedback={onSendFeedback}
      />
    </section>
  );
};

export default RecivedWorkCard;
