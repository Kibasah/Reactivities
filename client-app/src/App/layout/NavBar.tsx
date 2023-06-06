import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import virus from './virus.png';

interface Props{
    openForm: () => void;
}

export default function NavBar({openForm} : Props){
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
                    <Button onClick={openForm} positive content='Create Activity'/>
                </Menu.Item> 
            </Container>
        </Menu>
    )
}