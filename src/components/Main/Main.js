import React from 'react';
import $ from 'jquery';
import './main.scss';

const Main = () => {
  $('.txt').html(function(i, html) {
    var chars = $.trim(html).split('');

    return '<span>' + chars.join('</span><span>') + '</span>';
  });
  return (
    <>
      <div class="container">
        <span id="logo" class="txt anim-text-flow">
          Bienvenido a revisiones literarias!
        </span>
      </div>
    </>
  );
};
export default Main;
