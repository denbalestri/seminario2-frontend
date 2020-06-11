import React from 'react';
import CommentGroup from '../CommentGroup';
import PostGroup from '../PostGroup';

const ContentGroup = ({ titleGroup, postItems }) => {
  return (
    <section style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="../../images/Essential-Books.jpg"
          style={{ width: 1200, height: 400 }}
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
        <aside
          style={{
            width: 1200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <PostGroup />
          {postItems.map((post, index) => {
            return (
              <CommentGroup
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
