import React, {useState} from 'react'
import ModalView from "../components/ModalView"

const ViewProject = () => {
  
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-5">
          <h3>Title  One</h3>
          <p>Project Description</p>

          <hr className="mt-5"/>
          <h6>Assign Project</h6>
          <div>
          <div className='form-check'>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label" for="inlineRadio1">Jewel Farazi</label>
            </div>
          </div>
          <div className='form-check'>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
            <label className="form-check-label" for="inlineRadio2">Kamal Farazi</label>
          </div>
          </div>

          </div>
        </div>
        <div className="col">
        <ModalView />
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task Heading</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
               
              </tbody>
              </table>
        </div>

      </div>
      
    </div>
  )
}

export default ViewProject