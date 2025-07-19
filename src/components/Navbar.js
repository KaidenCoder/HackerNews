import { useTab } from "../context/context"
import { FaNewspaper, FaQuestion, FaEye, FaSuitcase} from 'react-icons/fa';
export default function Navbar(){
    const {tab, setTab} = useTab()
    return (
        <nav className="navbar">
            <header className="navbar-header">
                <div><img src="/logo.svg" id="logo" alt="Hacker News Logo" className="logo" /></div>
                <h2>Hacker News</h2>
            </header>
            <ul className="nav-links">
                <li onClick={() => setTab('news')} className={`tab ${tab == "news" && 'tab-active'}`}><FaNewspaper />{' '}News</li>
                <li onClick={() => setTab('ask')}  className={`tab ${tab == "ask" && 'tab-active'}`}><FaQuestion/>{' '}Ask</li>
                <li onClick={() => setTab('show')}  className={`tab ${tab == "show" && 'tab-active'}`}><FaEye/>{' '}Show</li>
                <li onClick={() => setTab('jobs')}  className={`tab ${tab == "jobs" && 'tab-active'}`}><FaSuitcase/>{' '}Jobs</li>
            </ul>
        </nav>
    )
}