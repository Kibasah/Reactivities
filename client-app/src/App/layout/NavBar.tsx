import React from 'react';
import { Button, Container, Menu, MenuItem, Image, Dropdown } from 'semantic-ui-react';
import virus from './virus.png';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { text } from 'stream/consumers';
import { observer } from 'mobx-react-lite';

interface Props{
    openForm: () => void;
}

export default observer(function NavBar(){
const {userStore: {user, logout}} = useStore();

    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item as = {NavLink} to = '/' header>
                    <img src={virus} alt="logo" style={{ marginRight: '10px' }} />
                    Pemantauan Pelaksanaan MyGovEA
                </Menu.Item>
                
                <Menu.Item as = {NavLink} to = '/activities' name = 'Peringkat'>
                    <a>Pemantauan Pembangunan EA </a>
                </Menu.Item>
                <Menu.Item as = {NavLink} to = '/pemantauan' name = 'Activities'>
                    <a>Pemantauan Repositori dan Port</a>
                </Menu.Item>
                <Menu.Item as = {NavLink} to = '/kesedaran' name = 'Activities'>
                    <a>Program Kesedaran</a>
                </Menu.Item>                  
                
                <MenuItem position='right'>
                    <Image src = {user?.image || '/assets/user.png'} avatar spaced = 'right'/>
                    <Dropdown pointing= 'top left' text = {user?.displayName}>
                        <Dropdown.Menu>
                        <Dropdown.Item as= {NavLink} to = {`/profiles/${user?.username}`} text = 'Profil' icon = 'user'/>
                        <Dropdown.Item onClick={logout} text = 'logout' icon = 'power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
})