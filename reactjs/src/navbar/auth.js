import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import Dashboard from '../components/dashboard';
import AuthUser from '../components/AuthUser';
import AddProject from '../components/AddProject'
import ViewProject from '../components/ViewProject';
import SearchData from '../components/SearchData';
function Auth() {
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                    </li>
                </ul>
            </nav>
            <div className="container">
                {/* All are route here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-project" element={<AddProject />} />
                    <Route path="/project-details/:id" element={<ViewProject />} />
                    <Route path="/search-data" element={<SearchData />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;
