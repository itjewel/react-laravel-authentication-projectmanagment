import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';


function App() {
  document.title = `${process.env.REACT_APP_API_NAME}`;
  const {getToken} = AuthUser();
  if(!getToken()){
    return <Guest />
  }
  return (
     <>   
      <Auth />    
     </>
  );
}

export default App;
