import React, {useState, useEffect} from 'react'
import ModalView from "../components/ModalView"
import { Link, useParams} from 'react-router-dom';
import AuthUser from '../components/AuthUser';

const ViewProject = () => {
  const { id } = useParams();
  const {http} = AuthUser();
const [projects, setProject] = useState([]);
const [users, setUsers] = useState([]);


const getprojectInformation = async (id) => {  
  // console.log("Jewel",id);
  try {
      const response = await http.get(`/getprojectInfo/${id}`); 
      setProject(response.data);

      const users = await http.get(`/get-users`); 
      setUsers(users.data);
      // console.log(users)
      
  } catch (error) {
      console.log(error)
  }
}

useEffect(()=>{  
  getprojectInformation(id);

},[id])

  
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
         return <div key={user.id}>
         <div className='form-check float-start'>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label" htmlFor="inlineRadio1">{user.name}</label>
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