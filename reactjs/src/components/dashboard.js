import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import ProjectList from '../components/ProjectList';
import { useNavigate } from "react-router-dom";
import AddProject from '../components/AddProject'

export default function Dashboard() {
    const {http} = AuthUser();
    const [userdetail,setUserdetail] = useState('');

    useEffect(()=>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = () =>{
        http.post('/me').then((res)=>{
            setUserdetail(res.data);
        });
    }

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        navigate('/add-project');
    }
    const routeSearchData = () =>{ 
        navigate('/search-data');
    }
    function renderElement(){
        if(userdetail){
            return <div>
                <h4>Hi-{userdetail.name}</h4>
                {/* <h4>Email-{userdetail.email}</h4> */}
                
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