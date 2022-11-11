import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import ProjectList from '../components/ProjectList';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    let navigate = useNavigate(); 
    const {http,logout} = AuthUser();
    const [userdetail,setUserdetail] = useState('');

    useEffect(()=>{
        fetchUserDetail();
    },[]);

    // Check for authentication 
    const fetchUserDetail = async () =>{
        try {
           await http.post('/me').then((res)=>{
                setUserdetail(res.data);
            }); 
        } catch (error) {
            logout();
        }       
    }

    const routeChange = () =>{ 
        navigate('/add-project');
    }
    const routeSearchData = () =>{ 
        navigate('/search-data');
    }
    function renderElement(){
        if(userdetail){
            return <div className='mt-5'>
                <h4 className='float-end'>Hi-{userdetail.name}</h4>
                <div style={{"clear":"both"}}></div>
                
                <button className='btn btn-primary float-start' onClick={routeSearchData} >Without Datatable Search Table</button>
                <button className='btn btn-primary float-end' onClick={routeChange} >Add Project</button>
                <ProjectList />
            </div>
        }else{
            return <p>Loading.....</p>
        }
    }

    return(
        <div>
            { renderElement() }
        </div>
    )
}