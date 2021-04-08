import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Image } from '@material-ui/core'
import BGImage from './assets/ignite-bg.png'
import JWConnect from './assets/jw-connect.png'
import TRCLogo from './assets/vtrc_logo_small.png'
import CAS from './assets/cas.jpg'
import './App.css'

import StatsSVG from './components/StatsSVG'
import Feed from './components/Feed'
import Databases from './components/Databases'

const useStyles = makeStyles(()=>({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgb(0,50,91)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${BGImage})`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 40px',
    flexGrow: '1',
    overflow: 'hidden',
    height: '100%',
  },
  menuItem: {
    color: 'white',
    zIndex: 10,
    textTransform: 'uppercase',
    fontSize: '14px',
    margin: '0 10px',
    textDecoration: 'none'
  },
  statsBackground: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundSize: '100% 100%',
    background: '#005091',
    opacity: '0.8',
    zIndex: '0'
  },
  statsBox: {
    position: 'relative',
    height: '350px',
    minHeight: '350px',
    width: '100%',
    borderRadius: '20px',
    overflow: 'hidden'
  }
  
}))

export default function App() {
  const cl = useStyles()

  return (
    <div className={cl.container}>
      <div className={cl.innerContainer}>      
        <div style={{
          display: 'flex', 
          flexDirection: 'row',
          background: 'rgba(0,0,0,0.5)',
          alignSelf: 'flex-start',
          padding: '5px 10px',
          borderRadius: '5px'
        }}>
          <div style={{color: 'white', fontSize: '11px', fontWeight: '600', marginRight: '5px'}}>
            After Hours Support: 1-877-594-3576
          </div>
          <img src={`${TRCLogo}`} alt='more nothingness' style={{height: '12px'}}/>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px 0'}}>
          <img src={`${JWConnect}`} alt='nothing useful' style={{height: '40px'}}/>
          <div style={{flexGrow: 1}}/>
          <a href='#' className={cl.menuItem}>Home</a>
          <a href='#' className={cl.menuItem}>Practices</a>
          <a href='#' className={cl.menuItem}>Departments</a>
          <a href='#' className={cl.menuItem}>Committees</a>
          <a href='#' className={cl.menuItem}>Offices</a>
          <a href='#' className={cl.menuItem}>MyConnect</a>
          <a href='#' className={cl.menuItem}>Feedback</a>
        </div>
        <div style={{display: 'flex', flexGrow: '1', overflow: 'hidden'}}>
          <div className='hiddenScroll' style={{width: '65%', display: 'flex', flexDirection: 'column', padding: '20px', flexGrow: '1', overflowY: 'overlay'}}>
            <div className={cl.statsBox}>
              <div className={cl.statsBackground}/>
              <StatsSVG />
            </div>
            <Databases/>
          </div>
          <div style={{width: '35%', padding: '20px', flexGrow: '1'}}>
            <Feed />
          </div>
        </div>
      </div>
    </div>
  );
}

