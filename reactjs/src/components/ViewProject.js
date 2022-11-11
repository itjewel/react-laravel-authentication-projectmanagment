import React, {useState, useEffect} from 'react'
import ModalView from "../components/ModalView"
import { Link, useParams} from 'react-router-dom';
import AuthUser from '../components/AuthUser';

const ViewProject = () => {
  const { id } = useParams();
  const {http} = AuthUser();
const [projects, setProject] = useState([]);
const [users, setUsers] = useState([]);
const [assign, setAssign] = useState([]);


const getprojectInformation = async (id) => {  
  // console.log("Jewel",id);
  try {
    // get individual Project
      const response = await http.get(`/getprojectInfo/${id}`); 
      setProject(response.data);

      // get User Liste
      const users = await http.get(`/get-users`); 
      setUsers(users.data);

       // get User Liste
       const assignRes = await http.get(`/get-assign/${id}`); 
       setAssign(assignRes.data);
      //  console.log(assignRes)
      
  } catch (error) {
      console.log(error)
  }
}

useEffect(()=>{  
  getprojectInformation(id);
  // console.log(assign)
},[id])

let assignHandeler = async (event) =>{
  const userId = event.target.value;
  // console.log('testt')
  const data = {'userId': userId, 'projectId':id};
  if (event.target.checked) {
    const response = await http.post('/assign-task',data);
    // console.log(response)
  } else {
    const responseUn = await http.post('/unassign-task',data);
    // console.log('nothing')
  }
}


  return (
    <div className="container text-center mt-5">
      <div className="row">
       <Link to="/dashboard" className='float-end'>Project List</Link>
        <div className="col-5">
          {projects && projects.map((project)=>{
         return <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.descriptions}</p>
          </div>
        })}

          <hr className="mt-5"/>
          <h6>Assign Project</h6>
          <div>

          {users && users.map((user)=>{
          const assignObject = assign.find((value) =>value.userId === user.id);
           const assignCheck = assignObject ? true: false;
         return <div key={user.id}>
         <div className='form-check float-start'>
            <div className="form-check form-check-inline">              
              {assignCheck && assignCheck ?
              <input className="form-check-input" defaultChecked type="checkbox" onClick={assignHandeler}  value={user.id} />
              :
              <input className="form-check-input" type="checkbox" onClick={assignHandeler} value={user.id} />
              }
              <label className="form-check-label" >{user.name}</label>
            </div>
          </div>
          </div>
        })}
          </div>
        </div>
        <div className="col">
        <ModalView proId={id}/>
            
        </div>

      </div>
      
    </div>
  )
}

export default ViewProject