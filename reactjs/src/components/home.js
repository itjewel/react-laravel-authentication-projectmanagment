import {useEffect,useState} from 'react'
export default function Home() {
    const [userdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const intervalId = setInterval(() => { 
        setLoading(true);
        try {
        //    Random device/users show api after 5sec later 
           fetch('http://35.201.2.209:8000/devices')
            .then(response => response.json())
            .then((data)=>{
                setUserdata(data.devices)
                setLoading(true);
            });
            } catch (error) {  
                setLoading(true);              
            }

        }, 5000)

        return () => clearInterval(intervalId);
    },[])
    return(<>
        <h1>Random Users/Devices</h1>
            <ul>
                {!loading && <h3>Loading..........</h3>}
                {userdata &&  userdata.map((value,index)=>{
                    return(<span key={value.id}>
                    <li>{value.name}</li>
                    </span>                    )
                })}
                
            </ul>
        </>
    )
}