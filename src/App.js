
import React, {useState, useEffect} from 'react';
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import Modal from "./Modal"
import Page from "./Page"
import RepoModal from './RepoModal'

function App() {
  const [memberModal, setMemberModal] = useState("")
  const [repo, setRepo] = useState("")

  function closeMemberModal(){
    setMemberModal("");
  }
  function selectMemberModal(member){
    setMemberModal(member);
  }
  function selectRepo(repo){
    setRepo(repo);
  }
  function closeRepoModal(){
    setRepo("");
  }





  return (
    <>
    { memberModal && <Modal member={memberModal} onClose = {closeMemberModal}></Modal>}
    {repo && <RepoModal url={repo} onClose = {closeRepoModal}></RepoModal>}
      
     <Page selectMember={selectMemberModal} selectRepo={selectRepo}></Page>
    </>
  );
}

export default App;
