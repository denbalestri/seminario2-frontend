import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const UI_Button = ({ children, loading, type, size, ...props }) => {
  return (
    <Button loading={loading} size={size} type={type} {...props}>
      {children}
    </Button>
  );
};

UI_Button.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.number,
};

UI_Button.defaultProps = {
  type: 'primary',
};

export default UI_Button;
