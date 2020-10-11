import React, {useState, useEffect} from 'react';
import {createPortal} from "react-dom"


export default function RepoModal({url,  onClose}){
    const [info, setInfo] = useState([])
    useEffect(()=>{
        fetchAPI().then((response)=>{
            return response.json();
        }).then(response=>{
            setInfo(response);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

   function fetchAPI(){
      console.log(url)
      return fetch(url, {
        headers: {
          Authorization: 'token 31830d17e83cee43166324aaa35c93d6444e083a',
          Accept: "application/json",
        },
      });
    }
  
      function mapElements(data, handleEach){
        // console.log(data)
        return data.map(element=>{
          return handleEach(element);
        })
      }
      function handleEach(element){
          return <>
          <div key = {element.id}>
            <div><a href={element.html_url} target="_blank" rel="noopener noreferrer">{element.name}</a></div> 

                    <div>description:{element.description || " none"}</div>
                    <br></br>
          </div>
                
          </>
      }
    return createPortal(
        <>










        <div className="modal-backdrop show"></div>
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Repo</h5>
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
              <div className="modal-body " style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                {mapElements(info, handleEach)}
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