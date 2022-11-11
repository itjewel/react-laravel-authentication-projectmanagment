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
    try {
      // get individual Project
        const response = await http.get(`/getprojectInfo/${id}`); 
        setProject(response.data);

        // get User list
        const users = await http.get(`/get-users`); 
        setUsers(users.data);

        // get assign project list
        const assignRes = await http.get(`/get-assign/${id}`); 
        setAssign(assignRes.data);
        
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{  
    getprojectInformation(id);
  },[id])

  // This method for assign 
  let assignHandeler = async (event) =>{
    const userId = event.target.value;
    const data = {'userId': userId, 'projectId':id};
    if (event.target.checked) {
      // user assign project
      await http.post('/assign-task',data);
    } else {
      // user unassign project
      await http.post('/unassign-task',data);
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
          {/* Modal component view here  */}
        <ModalView proId={id}/>
            
        </div>
      </div>      
    </div>
  )
}

export default ViewProject