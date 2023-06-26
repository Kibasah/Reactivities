import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homepage';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

useEffect(() => {

  if (commonStore.token) {
    userStore.getUser().finally(() => commonStore.setAppLoaded())
  } else {
    commonStore.setAppLoaded()
  }

}, [commonStore, userStore])


if (!commonStore.appLoaded) return <LoadingComponent content='Loading'/>

  return (
    <Fragment>
      <ModalContainer/>
      {location.pathname === '/' ? <HomePage/>: (
        <>
          <NavBar/>
      <Container style ={{marginTop: '7em'}}>
        <Outlet/>
      </Container>
        
        </>

      ) }
      

    </Fragment>
      
      
    
  );
}

export default observer(App);

