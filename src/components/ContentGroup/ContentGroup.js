import React from 'react';
import CommentGroup from '../CommentGroup';
import PostGroup from '../PostGroup';
import CircularProgress from '@material-ui/core/CircularProgress';

const ContentGroup = ({
  titleGroup,
  postItems,
  idGroup,
  descriptionGroup,
  literaryType,
  genreGroup,
  getPosts,
  loading,
}) => {
  return (
    <section style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="../../images/Essential-Books.jpg"
          style={{ width: '60vw', height: 400 }}
          alt="grupo"
        ></img>
      </div>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <p style={{ fontSize: 30, fontWeight: 400 }}>{titleGroup}</p>
        <p style={{ fontSize: 20, fontWeight: 400 }}>{descriptionGroup}</p>
        <p style={{ fontSize: 20, fontWeight: 400 }}>
          Este grupo se especializa en el genero: {genreGroup} y el tipo
          literario es: {literaryType}
        </p>
        <aside
          style={{
            width: '70vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <PostGroup idGroup={idGroup} getPosts={getPosts} />
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            postItems.map((post, index) => {
              return (
                <CommentGroup
                  key={index}
                  avatar={post.avatar}
                  post={post.post}
                  username={`${post.firstName} ${post.lastName}`}
                  userType={post.userType}
                  file={post.document}
                />
              );
            })
          )}
        </aside>
      </section>
    </section>
  );
};

export default ContentGroup;
