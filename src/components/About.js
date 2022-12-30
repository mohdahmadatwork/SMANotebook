// import React,{useContext, useEffect} from 'react'
import React from 'react'
// import NotesContext from '../context/notes/NotesContext'
export default function About(props) {
  // const a = useContext(NotesContext)
  // useEffect(()=>{
  //   a.update()
  // },[])
  return (
    <div>
      <div className="container my-5" style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? '#212529' : 'white' }} >
        <h1 className="my-2 p-2">About Us</h1>
        <div className="accordion my-2 p-4" id="accordionExample">
          <div className="accordion-item" >
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? 'grey' : 'white' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                About TextUtils
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body" style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? 'black' : 'white' }}>
                <strong>SMANotebook</strong> is a Notebook which can be used to store your notes in the cloud.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? 'grey' : 'white' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Technology Used
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body" style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? 'black' : 'white' }}>
                <strong>Technologies used:- </strong>
                <li>React JS</li>
                <li>Express</li>
                <li>Node js</li>
                <li>MongoDB</li>
                <li>Bootstrap</li>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? 'grey' : 'white' }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Features
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? 'grey' : 'white' }} className="accordion-body">
                <strong>Features Of TextUtils:-</strong>
                <li>Keep your notes in the cloud</li>
                <li>Access your notes anywhere</li>
                <li>Keep your notes private</li>
                <li>Fast</li>
                <li>Secure</li>
                <li>Safe</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
