import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AuthUser from '../components/AuthUser';

const SearchData = () => {
    const {http} = AuthUser();
    const [search, setSearch] = useState('');
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const navigate = useNavigate();
    const projectDetails = (id)=>{
        navigate(`/project-details/${id}`);
    }
    // Get Project List 
    const getprojectList = async () => {
        try {
            const response = await http.get('/getproject');        
            setProjects(response.data);
            setFilteredProjects(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getprojectList();
    },[])

    useEffect(()=>{
        const result = projects.filter((project)=>{
            return project.title.toLowerCase().match(search.toLowerCase());
        })
        setFilteredProjects(result)
    },[search])

  return (
    <div>
        <div className='mt-5'>
            <h2>Project List </h2>
            <input type="text" className="w-25 form-control float-end" placeholder='Search project title'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
        </div>
         <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task Heading</th>
                  <th scope="col">Details</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
              {filteredProjects && filteredProjects.map((project)=>{
                return <tr key={project.id}>
                  <th scope="row">{project.id}</th>
                  <td>{project.title}</td>
                  <td>{project.descriptions}</td>
                  <td><button className='btn btn-info' onClick={()=>projectDetails(project.id)}>Details</button></td>
                </tr>
                })}               
              </tbody>
         </table>
    </div>
  )
}

export default SearchData