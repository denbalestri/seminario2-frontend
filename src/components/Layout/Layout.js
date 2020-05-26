import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setProfessionals } from '../../redux/actions/professionals';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { SERVIDOR, CLIENTE } from '../../constants/URIs';
import SideBar from '../Sidebar';

const { Search } = Input;

const MainLayout = ({ children }) => {
  const [placeholder, setPlaceholder] = useState('');
  const [searchHide, setSearchHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location.pathname;

  useEffect(() => {
    if (location === CLIENTE.PROFESIONALES_URL) {
      setSearchHide(false);
      setPlaceholder('B\u00FAsqueda por profesional');
    } else {
      setSearchHide(true);
    }
  }, [location]);

  const onSearch = debounce(professional => {
    if (professional === '') return;

    setLoading(true);
    fetch(SERVIDOR.SEARCHPROFESSIONAL_URL(professional), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const professionals = response;
        dispatch(setProfessionals(professionals));
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, 500);

  const onChange = e => {
    const professional = e.target.value;
    onSearch(professional);
  };

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch',
        flexDirection: 'column',
      }}
    >
      <div className="sidebar">
        <SideBar />
      </div>
      <nav
        style={{
          height: 50,
          padding: 10,
          width: '100%',
          backgroundColor: '#40a9ff',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {!searchHide && (
          <Search
            placeholder={placeholder}
            onSearch={professional => onSearch(professional)}
            style={{ width: 400 }}
            loading={loading}
            onChange={onChange}
          />
        )}
      </nav>
      <div
        className="mainContent"
        style={{ height: '100%', width: '100%', overflow: 'scroll' }}
      >
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
