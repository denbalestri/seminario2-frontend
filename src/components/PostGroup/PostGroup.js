import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Input, Avatar } from 'antd';
import { Upload } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '../Button';
import { SERVIDOR } from '../../constants/URIs';
import { getBase64 } from '../../constants/base64';
import { notification } from 'antd';
import statuses from '../../constants/Notification';

const { TextArea } = Input;

const openNotification = type => {
  notification[type]({
    message: statuses.statusesGroupPosts[type].message,
    description: statuses.statusesGroupPosts[type].description,
  });
};

const PostGroup = ({ idGrupo }) => {
  const [file, setFile] = useState(undefined);
  const [fileList, setFileList] = useState('');
  const [post, setPost] = useState('');
  const user = useSelector(state => state.user.user);
  const handleUpload = info => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: 'obra',
    listType: 'picture',
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0),
    fileList,
    onChange: handleUpload,
  };

  const onChange = e => {
    const post = e.target.value;
    setPost(post);
  };
  const onSubmit = () => {
    //send to backend the post and file and then get all the new comments
    if (file) {
      getBase64(file.originFileObj).then(encodedFile => {
        const body = JSON.stringify({
          nombreUsuarioAutor: user.username,
          comentario: post,
          idGrupo,
          documento: encodedFile,
        });
        fetch(SERVIDOR.PUBLICAR_GRUPO, {
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
          .catch(error => console.log(error));
      });
    } else {
      const body = JSON.stringify({
        nombreUsuarioAutor: user.username,
        comentario: post,
        idGrupo,
      });
      fetch(SERVIDOR.PUBLICAR_GRUPO, {
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
        .catch(error => console.log(error));
    }
  };
  return (
    <Paper>
      <section style={{ display: 'flex', marginTop: 15 }}>
        <Avatar
          src="../../images/person5.jpg"
          alt="persona"
          size="large"
          style={{ marginLeft: 10, marginRight: 20, width: 60, height: 60 }}
        />
        <TextArea
          rows={4}
          onChange={onChange}
          name="post"
          value={post}
          placeholder="Publica algo interesante..."
          style={{ borderRadius: '1em', height: 50, width: 1100 }}
        />
      </section>
      <section style={{ display: 'flex' }}>
        <Upload {...uploadProps} onChange={handleUpload}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FileCopyIcon />{' '}
            <p style={{ fontSize: 13, marginLeft: 5 }}>Archivos</p>
          </IconButton>
        </Upload>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Button style={{ marginTop: 10, width: 400 }} onClick={onSubmit}>
            Publicar
          </Button>
        </div>
      </section>
    </Paper>
  );
};

export default PostGroup;
