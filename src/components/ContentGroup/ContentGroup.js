import React from 'react';
import CommentGroup from '../CommentGroup';
import PostGroup from '../PostGroup';

const ContentGroup = ({
  titleGroup,
  postItems,
  idGrupo,
  descriptionGroup,
  literaryType,
  genreGroup,
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
          <PostGroup idGroupo={idGrupo} />
          {postItems.map((post, index) => {
            return (
              <CommentGroup
                key={index}
                avatar={post.avatar}
                post={post.post}
                username={`${post.firstName} ${post.lastName}`}
                userType={post.userType}
              />
            );
          })}
        </aside>
      </section>
    </section>
  );
};

export default ContentGroup;
