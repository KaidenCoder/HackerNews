import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useTab } from './context/context';
import New from './components/New';
import Ask from './components/Ask';
import Show from './components/Show';
import Jobs from './components/Jobs';

function App() {
  const {tab} = useTab()
  return (
    <div className='main-container'>
      <section className='navbar-container'>
      <Navbar/>
      </section>
      <section className='content-container'>
        {tab === 'news' && <New/>}
        {tab === 'ask' && <Ask/>}
        {tab === 'show' && <Show/>}
        {tab === 'jobs' && <Jobs/>}
      </section>
    </div>
  );
}

export default App;
