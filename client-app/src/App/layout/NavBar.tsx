import React from 'react';
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import virus from './virus.png';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed='top' borderless>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src={virus} alt="logo" style={{ marginRight: '12px', height: '35px' }} />
                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>MyGovEA</span>
                </Menu.Item>

                <Menu.Item as={NavLink} to='/activities' name='Pemantauan Pembangunan EA' />
                <Menu.Item as={NavLink} to='/pemantauan' name='Repositori & Port' />
                <Menu.Item as={NavLink} to='/kesedaran' name='Program Kesedaran' />

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to={`/profiles/${user?.username}`} text='Profil' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
})
