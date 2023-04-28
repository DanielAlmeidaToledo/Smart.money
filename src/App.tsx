import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

import './styles/main.scss';

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="__content-and-sidebar-wrapper">
        <Sidebar />
        <div className="__app-content">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
