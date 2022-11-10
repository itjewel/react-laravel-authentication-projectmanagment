import React from 'react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import AuthUser from '../components/AuthUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const {http} = AuthUser();
  const initialValues = {
    title: '',
    descriptions: '',
}
const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Please enter project title."),
  descriptions: Yup.string().required('Please enter project description')});

const onSubmit =  async (data) =>{
  try {
    const response = await http.post('/addproject',data);
    toast.success("Project added success");
     navigate('/dashboard')
  
  
} catch (error) {
  toast.error("Project added failed")
    // console.log(error)
}

}

  return (<div className="col-8 offset-md-2">
         <Link to="/dashboard">Project List</Link>
          <h1 className="text-center">Add Project</h1>
           <Formik initialValues={initialValues} validationSchema={SignupSchema}  onSubmit={onSubmit}>
          {({ errors, touched }) => (
              <Form autoComplete="off">
                <div className="form-group mt-3">
        <label>Title:</label>
          <Field 
              type="text"
              className="form-control"
              name="title"
              placeholder="Project Title" autoComplete="off"/>
              <div className='text-danger'> {errors.title && touched.title ? (
                  <div>{errors.title}</div>
              ) : null}</div>
      </div>
      <div className="form-group mt-3">
        <label>Description:</label>     
          <Field 
              component="textarea"
              className="form-control"
              name="descriptions"
              placeholder="Project Description" autoComplete="off"/>
              <div className='text-danger'> {errors.descriptions && touched.descriptions ? (
                  <div>{errors.descriptions}</div>
              ) : null}</div>

          
          </div>
          <button type="submit" className="btn btn-primary mt-4">Add Project</button>
      </Form>
      )}
     
      </Formik>
      <ToastContainer />
   </div>)
}

export default AddProject