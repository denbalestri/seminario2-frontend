/** @format */

import React from "react";
import { Input } from "antd";

const { Search } = Input;

const MainLayout = ({ children }) => {
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
          placeholder="Busqueda por profesional o genero"
          onSearch={(value) => console.log(value)}
          style={{ width: 400 }}
        />
      </nav>
      <div class="mainContent">{children}</div>
    </main>
  );
};

export default MainLayout;
