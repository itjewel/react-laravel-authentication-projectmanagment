import React,{useState} from 'react'
import Modal from 'react-modal';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import AuthUser from './AuthUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
  },
};

const ModalView = () => {
    let subtitle;
  const navigate = useNavigate();
  const {http} = AuthUser();
  const initialValues = {
    title: '',
    descriptions: '',
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
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
  return (
    <div>
    <button className='btn btn-primary float-end' onClick={openModal}>Add Task</button>
         <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="float-end btn-danger">X</button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        
              <Formik initialValues={initialValues} validationSchema={SignupSchema}  onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form autoComplete="off">
                      <div className="form-group">
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
      </Modal>
    </div>
  )
}

export default ModalView