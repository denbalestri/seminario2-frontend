import React, { createElement, useState } from 'react';
import { Avatar, Tooltip } from 'antd';
//import Avatar from '@material-ui/core/Avatar';
import {
  LikeOutlined,
  LikeFilled,
  StarOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
const CommentGroup = ({ avatar, post, username, userType }) => {
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);
  const [likesProfessional, setLikesProfessional] = useState(0);
  const like = () => {
    setLikes(1);
    setAction('liked');
    //send to backend your like, it  will return quantity total + 1
  };

  const onClickDownloadFile = () => {
    //get content file
    //send to backend id comment and it will return content file
  };
  return (
    <Paper style={{ marginTop: 40 }}>
      <section style={{ display: 'flex' }}>
        <div>
          <Avatar
            src={avatar}
            alt="persona"
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              width: '3vw',
              height: '3vw',
            }}
          />
        </div>
        <aside>
          <section style={{ display: 'flex' }}>
            <p style={{ fontWeight: 500, marginRight: 10, marginTop: 20 }}>
              {username}{' '}
            </p>
            {userType === 2 ? (
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ marginTop: 25 }}
              />
            ) : (
              ''
            )}
          </section>
          <p style={{ marginTop: 10 }}>{post}</p>
          <div>
            <span key="like" style={{ width: 20, marginRight: 20 }}>
              <Tooltip title="Me gusta">
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
                  onClick: like,
                })}
                <span className="comment-action">{likes}</span>
              </Tooltip>
            </span>
            <span key="like-profesional" style={{ width: 20 }}>
              <Tooltip title="Excelente">
                <StarOutlined />
                <span className="comment-action">{likesProfessional}</span>
              </Tooltip>
            </span>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={onClickDownloadFile}
            >
              <DescriptionIcon fontSize="small" />
              <p style={{ fontSize: 13, marginLeft: 5, marginTop: 10 }}>
                Descargar obra
              </p>
            </IconButton>
          </div>
        </aside>
      </section>
    </Paper>
  );
};

export default CommentGroup;
