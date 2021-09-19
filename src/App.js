import './App.css';
import TopBar from './components/navigations/topbar/TopBar';
import SideBar from './components/navigations/sidebar/SideBar'

function App() {
  return (
    <div id="wrapper">
      <SideBar/>

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <TopBar/>
        </div>
      </div>
    </div>
  );
}

export default App;
