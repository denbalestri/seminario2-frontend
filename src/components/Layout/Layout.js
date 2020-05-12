/** @format */

import React, { useState, useEffect } from "react";
import { SEARCHPROFESSIONAL_URL } from "../../constants/URIs";
import { useDispatch } from "react-redux";
import { setProfessionals } from "../../redux/actions/professionals";
import { Input } from "antd";
import { debounce } from "lodash";
import { PROFESSIONALS_PATH } from "../../constants/PathNames";
const { Search } = Input;

const MainLayout = ({ children }) => {
  const [placeholder, setPlaceholder] = useState("");
  const [searchHide, setSearchHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const checkPath = () => {
    if (window.location.pathname === PROFESSIONALS_PATH) {
      setPlaceholder("Busqueda por profesional");
    } else {
      setSearchHide(true);
    }
  };

  useEffect(() => {
    checkPath();
  }, []);

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
        {!searchHide ? (
          <Search
            placeholder={placeholder}
            onSearch={(professional) => onSearch(professional)}
            style={{ width: 400 }}
            loading={loading}
            onChange={onChange}
          />
        ) : (
          ""
        )}
      </nav>
      {children}
    </main>
  );
};

export default MainLayout;
