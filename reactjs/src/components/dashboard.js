import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';

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

    function renderElement(){
        if(userdetail){
            return <div>
                <h4>Hi-{userdetail.name}</h4>
                {/* <h4>Email-{userdetail.email}</h4> */}
                <h2>Project list Here</h2>
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