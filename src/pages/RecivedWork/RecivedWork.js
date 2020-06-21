import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/Layout';
import Modal from '../../components/Modal';
import { SERVIDOR } from '../../constants/URIs';
import { getBase64 } from '../../constants/base64';
import statuses from '../../constants/Notification';
import { notification } from 'antd';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Email from '@material-ui/icons/Email';
import Download from '@material-ui/icons/GetApp';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Download: forwardRef((props, ref) => <Download {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Email: forwardRef((props, ref) => <Email {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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

const RecievedWorkList = ({ works }) => {
  const [visible, setVisible] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [nameWork, setNameWork] = useState('');
  const [userAuthor, setUserAuthor] = useState('');
  const [author, setAuthor] = useState('');

  const user = useSelector(state => state.user.user);
  const onClickDownload = (event, rowData) => {
    fetch(SERVIDOR.OBRAS_CONTENIDO_URL(rowData.nombreObra, rowData.userAutor), {
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
      .catch(error => console.log(error));
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

  const onClickSendMessage = (event, rowData) => {
    setUserAuthor(rowData.userAuthor);
    setNameWork(rowData.nameWork);
    setAuthor(`${rowData.nombreAutor} ${rowData.apellidoAutor}`);
    openModal();
  };
  const onCancel = () => {
    setVisible(false);
  };

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
      <MaterialTable
        icons={tableIcons}
        localization={{ header: { actions: 'Acciones' } }}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#51B0FA',
            color: '#FFF',
          },
          search: false,
        }}
        columns={[
          {
            field: 'url',
            title: 'Avatar',
            render: rowData => (
              <img
                alt="avatar"
                src=".../../images/person5.jpg"
                style={{ width: 50, borderRadius: '50%' }}
              />
            ),
          },
          { title: 'Título', field: 'nombreObra' },
          { title: 'Género', field: 'genero' },
          { title: 'Autor', field: 'fullName' },
          { title: 'Fecha Límite', field: 'fechaLimite' },
          { title: 'Descripción', field: 'descripcion' },
        ]}
        actions={[
          {
            icon: tableIcons.Email,
            tooltip: 'Enviar devolución',
            onClick: onClickSendMessage,
          },
          {
            icon: tableIcons.Download,
            tooltip: 'Descargar obra',
            onClick: onClickDownload,
          },
        ]}
        data={works}
        title="Obras a corregir"
      />
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
        else mapRecivedWork(recivedWork);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const mapRecivedWork = recivedWork => {
    const recivedworkWithFullName = recivedWork.map((work, index) => {
      return {
        ...work,
        fullName: `${work.nombreAutor} ${work.apellidoAutor}`,
      };
    });
    setRecivedWork(recivedworkWithFullName);
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
