import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import virus from './virus.png';
import { useStore } from '../stores/store';

interface Props{
    openForm: () => void;
}

export default function NavBar(){


const {activityStore} = useStore();

    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item header>
                    <img src={virus} alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item>
                    <a href="/">Home</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/about">About</a>
                </Menu.Item>                  
                <Menu.Item>
                    <a href="/contact" style={{ marginRight: '10px' }}>Contact</a>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity'/>
                </Menu.Item> 
            </Container>
        </Menu>
    )
}