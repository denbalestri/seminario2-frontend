import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
const UI_Select = ({ placeholder, optionItems, valueSelected, onChange }) => {
  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      allowClear
      value={valueSelected}
    >
      {optionItems.map((item, index) => {
        return (
          <Option value={item} key={index}>
            {item}
          </Option>
        );
      })}
    </Select>
  );
};

export default UI_Select;
