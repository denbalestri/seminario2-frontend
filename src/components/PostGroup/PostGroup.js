import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Input, Avatar } from 'antd';
import { Upload } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '../Button';
const { TextArea } = Input;

const PostGroup = () => {
  const [file, setFile] = useState('');
  const [fileList, setFileList] = useState('');
  const [post, setPost] = useState('');
  const handleUpload = info => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: 'obra',
    listType: 'picture',
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0),
    FileList,
    onChange: handleUpload,
  };

  const onChange = e => {
    const post = e.target.value;
    setPost(post);
  };
  const onSubmit = () => {
    //send to backend the post and file and then get all the new comments
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
