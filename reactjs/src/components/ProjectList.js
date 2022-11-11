import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import AuthUser from '../components/AuthUser';

const ProjectList = () => {
    const {http} = AuthUser();
    const [search, setSearch] = useState('');
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const navigate = useNavigate();
    const projectDetails = (id)=>{
        navigate(`/project-details/${id}`);
    }
    // Get Project Data 
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
    },[]);

    useEffect(()=>{
        const result = projects.filter((project)=>{
            return project.title.toLowerCase().match(search.toLowerCase());
        })
        setFilteredProjects(result)
    },[search]);

    // Column for Datatable
    const columns = [
        {
        name: "Title",
        selector: row => row.title,
        sortable:true,
        },
        {
        name: "Description",
        selector: row => row.descriptions,
        },
        {
        name: "Actions",
        selector: row => <button className='btn btn-info' onClick={()=>projectDetails(row.id)}>Details</button>,
        },
    
    ] 

 return (
    <DataTable title="Datatable Project list"  columns={columns} data={filteredProjects} 
     pagination
     fixedHeader 
     fixedHeaderScrollHeight="450px" 
     selectableRows 
     selectableRowsHighlight
     highlightOnHover
     subHeader
     subHeaderComponent={
        <input type="text" className="w-25 form-control" placeholder='Search project title'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
     }
     />     
  )
 }

export default ProjectList