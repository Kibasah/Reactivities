import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import virus from './virus.png';
import { NavLink } from 'react-router-dom';

interface Props{
    openForm: () => void;
}

export default function NavBar(){


    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item as = {NavLink} to = '/' header>
                    <img src={virus} alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                
                <Menu.Item as = {NavLink} to = '/activities' name = 'Activities'>
                    <a>Activities</a>
                </Menu.Item>                  
                <Menu.Item>
                    <Button as = {NavLink} to = '/createActivity' positive content='Create Activity'/>
                </Menu.Item> 
            </Container>
        </Menu>
    )
}