import React, {useState, useEffect} from 'react';
import {fetchFollowers, addFollower, unFollow} from "./Api.js"
export default function Page({selectMember, selectRepo}){
    const [page, setPage] = useState([]);
    const [followers, setFollowers] = useState([]);


    function onFollow(elements){
        const newId = elements.id;
        const newElement = {
            id : newId,
            name : elements.login,
        };
        const found = followers.find(element=>{
            return element.id === Number(newId);
        })
        if (found){
            const newFollowers = followers.filter(element=>{
                return element.id !== Number(newId);
            })
            unFollow(newId);
            setFollowers(newFollowers);
        }else{
            const newFollowers = followers.concat(newElement);
            addFollower(newElement);
            setFollowers(newFollowers);
        }
    }
    function fetchAPI(){
        return fetch(`https://api.github.com/orgs/emberjs/members`, {
          headers: {
            Authorization: 'token 31830d17e83cee43166324aaa35c93d6444e083a',
            Accept: "application/json",
          },
        });
      }
    
      useEffect(()=>{
        getFollowers().then(()=>{
            renderPage();
            }
        )
        
      }, [getFollowers, renderPage])

      function getFollowers(){
          return fetchFollowers().then(response=>{
              setFollowers(response);
          })
      }

      function displayFollow(id){
          const found = followers.find(element=>{
              return element.id === Number(id);
          })
          if (found){
              return (<>
                  Unfollow
              </>)
          }
          return <>Follow</>
      }

      function renderPage(){
        fetchAPI().then(response=>{
          return response.json();
        }).then(response=>{
          setPage(response);
        //   console.log(response)
        })
      }

      function mapElements(data, handleEach){
        // console.log(data)
        return data.map(element=>{
          return handleEach(element);
        })
      }
    
      function formatElement(element){
        return (
 
            <li key={element.id} className="list-group-item">
                <div className="row ml-4 mb-4">
                    <img className = " col-2 p-3 rounded-circle pointer" src={element.avatar_url} onClick={()=>selectMember(element.login)}></img>
                    <div className ="">
                        <h4 className = "m-3 pointer" onClick={()=>selectMember(element.login)}>{element.login}</h4>
                        <div className = " p-3">
                            <button className ="btn btn-info" onClick={()=>selectRepo(element.repos_url)}>Repository</button>
                        </div>        
                        <div className = " p-3">
                            <button className = "btn btn-light" onClick={()=>onFollow(element)}>{displayFollow(element.id)}</button>
                        </div>      
                    </div>
                
                </div>
            </li>
            
                  

        )
      }

      return (<div>
        {mapElements(page, formatElement)}
      </div>)

}