import { Container, Header, Segment, Button } from "semantic-ui-react";
import React, { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../App/stores/store";
import { observer } from "mobx-react-lite";
import modalStore from "../../App/stores/modalStore";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";



export default observer(function HomePage() {
  const {userStore, modalStore} = useStore();
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  let btn = document.querySelectorAll<HTMLButtonElement>(".btn");


  btn.forEach((btn) => {
    btn.onclick = function(e: MouseEvent){
      console.log('Button clicked!', e);


      let x = e.pageX - ((e.target as HTMLElement)?.offsetLeft || 0);
      let y = e.pageY - ((e.target as HTMLElement)?.offsetTop || 0);
      

      let color = '#' + Math.floor( Math.random() * 0xfffff).toString(16);

      let ripples = document.createElement("span");
      ripples.style.left = x + "px";
      ripples.style.top = y + "px";
      ripples.style.borderColor = color;

      setTimeout(() => {
        ripples.remove();
      }, 2000);
      console.log('Ripple effect code executed!');
    }
  })

  useEffect(() => {
    const handleParallaxScroll = () => {
      const parallaxContainer = parallaxContainerRef.current;
      
      if (parallaxContainer) {
        const parallaxElements = parallaxContainer.getElementsByClassName('parallax-element');
    
        for (let i = 0; i < parallaxElements.length; i++) {
          const element = parallaxElements[i] as HTMLElement;
          const rect = element.getBoundingClientRect();
          const yPos = window.pageYOffset * 0.5; // Adjust this value to control the parallax effect intensity
    
          element.style.transform = `translate3d(0px, ${yPos - rect.top}px, 0px)`;
        }
      }
    };
    

    window.addEventListener('scroll', handleParallaxScroll);

    return () => {
      window.removeEventListener('scroll', handleParallaxScroll);
    };
  }, []);

  const handleButtonClick = () => {
    // Your button click logic here
    console.log('Button clicked!');
  };

  return (
    <Segment
      inverted
      textAlign="center"
      style={{
        minHeight: 700,
        padding: '1em 0em',
        background: 'linear-gradient(to bottom, #072D57, #033f79, #005AA7)',
        overflow: 'hidden',
      }}
      vertical
      id="parallax-container"  
      ref={parallaxContainerRef} 
    >
      <Container text style={{ height: '100%', overflow: 'auto' }}>
        <Header
          as="h1"
          content="Pemantaun Pelaksanaan MyGovEA"
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        />
        
        {userStore.isLoggedIn ? (
          <>
          
          <Link to="/activities">
          <Button className = 'btn' as={Link} to='/activities' secondary size="massive" onClick={handleButtonClick}>
            Masuk
          </Button>
          </Link>
          </>

        ) : (
          <>
          <Button onClick={() => modalStore.openModal(<LoginForm />)} secondary size="massive" >
            Log Masuk
          </Button>

          <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
            Daftar Pengguna
          </Button>
          </>
        )}
        
        
      </Container>
    </Segment>
  );
})
