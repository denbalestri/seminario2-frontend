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

const PostGroup = ({ idGroup, getPosts }) => {
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
      const idGroupString = idGroup.toString();
      getBase64(file.originFileObj).then(encodedFile => {
        const body = JSON.stringify({
          nombreUsuarioAutor: user.username,
          comentario: post,
          idGrupo: idGroupString,
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
              getPosts(idGroup);
            } else {
              openNotification('error');
            }
          })
          .catch(error => console.log(error))
          .finally(() => {
            setPost('');
            setFileList('');
            setFile(undefined);
          });
      });
    } else {
      const idGroupString = idGroup.toString();
      const body = JSON.stringify({
        nombreUsuarioAutor: user.username,
        comentario: post,
        idGrupo: idGroupString,
        documento: '',
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
            getPosts(idGroup);
          } else {
            openNotification('error');
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setPost('');
          setFileList('');
          setFile(undefined);
        });
    }
  };

  return (
    <Paper>
      <section style={{ display: 'flex', marginTop: 15 }}>
        <Avatar
          src={user.avatar}
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
          style={{ borderRadius: '1em', height: 100, width: '70vw' }}
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
