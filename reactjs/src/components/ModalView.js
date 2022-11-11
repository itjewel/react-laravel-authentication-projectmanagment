import React,{useState, useEffect} from 'react'
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
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
  },
};

const ModalView = ({proId}) => {
  let subtitle;
  const {http} = AuthUser();
  const initialValues = {
    projectId: proId,
    title: '',
    descriptions: '',
  }
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#055160';
  }
  function closeModal() {
    setIsOpen(false);
  }

  const SignupSchema = Yup.object().shape({
    projectId:Yup.number(),
    title: Yup.string().required("Please enter task title."),
    descriptions: Yup.string().required('Please enter task description')});
  
  // form submit method 
  const onSubmit =  async (data) =>{
    try {
      const response = await http.post('/add-task',data);
      setTasks([...tasks, response.data.data]);
      toast.success("Task added success");     
      closeModal()    
    
    } catch (error) {
      toast.error("Task added failed");
    }  
  }

  // Task information get 
  const getTaskInformation = async (id) => {  
    try {
      const responseTask = await http.get(`/gettaskInfo/${id}`); 
      setTasks(responseTask.data);
        
    } catch (error) {
        console.log(error)
    }
  }
  
  useEffect(()=>{  
    getTaskInformation(proId);  
  },[proId])

 
  return (
    <div>
    <button className='btn btn-primary float-end' onClick={openModal}>Add Task</button>
         <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <button onClick={closeModal} className="float-end btn-danger">X</button>
        <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Add Task</h3>
        
              <Formik initialValues={initialValues} validationSchema={SignupSchema}  onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form autoComplete="off">
                      <div className="form-group">
                        <Field type="hidden" name="projectId" value={proId} />
                    <label>Title:</label>
                      <Field 
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Task Title" autoComplete="off"/>
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
                          placeholder="Task Description" autoComplete="off"/>
                          <div className='text-danger'> {errors.descriptions && touched.descriptions ? (
                              <div>{errors.descriptions}</div>
                          ) : null}</div>

                      
                      </div>
                      <button type="submit" className="btn btn-primary mt-4">Add Task</button>
                  </Form>
            )}
          
            </Formik>
          {/* Modal component view here */}
         </Modal>
         <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task Heading</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
              {tasks && tasks.map((task)=>{
                return <tr key={task.id}>
                  <th scope="row">{task.id}</th>
                  <td>{task.title}</td>
                  <td>{task.descriptions}</td>
                </tr>
                })}
               
              </tbody>
              </table>
      <ToastContainer />
    </div>
  )
}

export default ModalView