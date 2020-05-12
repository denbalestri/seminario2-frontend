/** @format */

import React, { useState } from "react";
import { SEARCHPROFESSIONAL_URL } from "../../constants/URIs";
import { useDispatch } from "react-redux";
import { setProfessionals } from "../../redux/actions/professionals";
import { Input } from "antd";
import { debounce } from "lodash";
const { Search } = Input;

const MainLayout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSearch = (professional) => {
    setLoading(true);
    fetch(SEARCHPROFESSIONAL_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: professional,
    })
      .then((response) => {
        const professionals = response.data;
        dispatch(setProfessionals(professionals));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const onChange = debounce((professional) => {
    if (professional !== "") onSearch(professional);
  }, 1000);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "stretch",
        flexDirection: "column",
      }}
    >
      <nav
        style={{
          height: 50,
          padding: 10,
          width: "100%",
          backgroundColor: "#CCC",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Search
          placeholder="Busqueda por profesional"
          onSearch={(professional) => onSearch(professional)}
          style={{ width: 400 }}
          loading={loading}
          onChange={onChange}
        />
      </nav>
      {children}
    </main>
  );
};

export default MainLayout;
