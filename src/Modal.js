import React, {useState, useEffect} from 'react';
import {createPortal} from "react-dom"


export default function Modal({member,  onClose}){
    const [info, setInfo] = useState({})
    useEffect(()=>{
        fetchAPI().then((response)=>{
            return response.json();
        }).then(response=>{
            setInfo(response);
        })
    })
    function fetchAPI(){
        return fetch(`https://api.github.com/users/${member}`, {
          headers: {
            Authorization: 'token 31830d17e83cee43166324aaa35c93d6444e083a',
            Accept: "application/json",
          },
        });
      }
    return createPortal(
        <>
        <div className="modal-backdrop show"></div>
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Member Profile</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Name: {info.name}</p>
                <p>Company: {info.company || "None"}</p>
                <p>following: {info.following || "None"}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>,
        document.getElementById("root")
    )
}