import React, { useState } from 'react';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';
import Layout from './Layout';
import { useSelector, useDispatch } from "react-redux";
import { Database } from '../models/database';
import { RootState } from '../features/store';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { addDbThunk, deleteDb } from '../features/data/dataSlice';
import { NewDatabaseRequestBody } from '../models/api';

// -------- main component ---------- //
const Databases = (props) => {  
  
  const databases = useSelector((state: RootState) => state.data.databases );

  const [modalVisible, setModalVisible] = useState(false);
  
  const dispatch = useDispatch();

  const handleDbAdd = (formData: NewDatabaseRequestBody) => {
    dispatch(addDbThunk(formData));
  }

  const handleDbDelete = (id: number) => {
    dispatch(deleteDb(id));
  }

  return (
    <Layout>
      <div className='content-box'>
        <nav className='card-header'>
          <h4>Databases</h4>
        </nav>
      </div>
      <div>
        <DatabaseGroup className='content-box database-group'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>My Databases</h4>
            <AiOutlinePlusCircle  onClick={() => { setModalVisible(!modalVisible) }}/>
          </div>
          {Object.values(databases).map((db : Database, i) => {
            return <DatabaseCard
              key={i}
              database={db}
              id={db.id}
              label={db.label}
              isConnected={true}
              deleteDbFunc={handleDbDelete}
              // database={db.pgDatabaseName} 
              port={db.port} 
              ssl={db.sslMode}
              latency = {db.latency}
            />
          })}
        </DatabaseGroup>
      </div>
      { modalVisible  && 
        <NewDatabaseWindow toggleWindowFunc={() => { setModalVisible(!modalVisible) }} addDbFunc={handleDbAdd}/>
      }
    </Layout>
  )
}

// ----------- styling ---------- // 
const StyledContainer = styled.div`
  display: flex; 
  height: 100%; 
  background-color: red;
  // flex-wrap: nowrap;
`;


const DatabaseGroup = styled.div`
  // background-color: rgb(220, 220 ,220); 
  // width: 100%;
  // padding: 1em 2em;
  // overflow-y: scroll;
`;

export default Databases;