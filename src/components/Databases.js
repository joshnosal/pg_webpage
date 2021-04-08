import React, { useState, useRef } from 'react' 
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Collapse, List, ListItem, ListItemText, Divider, ButtonBase, IconButton } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import Kellog from '../assets/Kellog.png'
import GE from '../assets/GE.png'
import Bluestar from '../assets/Bemis.png'
import NorthFace from '../assets/NorthFace.png'

const useStyles = makeStyles({
  header: {
    fontWeight: '600',
    fontSize: '16px',
    background: '#005091',
    opacity: '0.8',
    lineHeight: '30px',
    padding: '0 20px',
    color: 'white',
    width: '100%',
    textAlign: 'left'
  },
  collapseContainer: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden'
  }
})

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const deals = [{
  title: 'Kellog acquires GE',
  description: "Kellog acquires GE for the first trillion dollar acquisition in history. No one knows why. And they certainly don't know how...",
  price: 6000000000000,
  icon: Kellog,
  date: '01-30-2021',
  team: ['Steve Jones', 'Davy Crockett', 'Michael Scott']
}, {
  title: 'GE takes over Kellog',
  description: 'GE buys Kellog in 363 sale.',
  icon: GE,
  price: 1,
  date: '02-10-2021',
  team: ['Bruce Lee']
},{
  title: 'North Face acquires Solar World',
  description: 'Nothing new',
  icon: NorthFace,
  price: 123456789,
  date: '03-12-2021',
  team: ['Jim', 'Jim 2']
},{
  title: "I can't come up with more names",
  description: 'descriptions are even harder',
  icon: Bluestar,
  price: 89347238,
  date: '05-01-2021',
  team: ['Back To', 'The Future']
}]

export default function Databases(props){
  const cl = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState({
    resources: true,
    databases: true,
    clientDev: false,
    deals: false,
  })
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = deals.length
  const linkRef = useRef(null)

  const goToLink = (address) => {
    linkRef.current.href = address
    linkRef.current.click()
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const getPrice = (val) => {
    return '$'+ val.toString().replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")
  }

  return(
    <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
      <a ref={e=>{linkRef.current = e}} style={{display: 'none'}}/>
      <Collapse collapsedHeight={'80px'} in={open.deals} timeout='auto' style={{border: '3px solid #005091', borderRadius: '20px', background: 'white', position: 'relative'}}>
        <ButtonBase  disableRipple={true} onClick={()=>setOpen({...open, deals: !open.deals})} style={{width: '100%'}}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={5000}
            style={{}}
          >
            {deals.map((deal, index)=>(
              <div key={index} style={{display: 'flex', flexDirection: 'column', padding: '0 20px'}}>
                <div style={{height: '80px', display: 'flex', alignItems: 'center', width: '100%'}}>
                  <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1', alignItems: 'flex-start'}}>
                    <div style={{fontWeight: '700', fontSize: '24px'}}>{deal.title}</div>
                    <div style={{lineHeight: '24px'}}>{getPrice(deal.price)}</div>
                  </div>
                  <div style={{width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={deal.icon} style={{height: '60px'}}/>
                  </div>
                </div>
                <div style={{alignSelf: 'flex-start', display: 'flex', justifyContent: 'flex-start'}}>
                  <div style={{fontWeight: '600', width: '100px', textAlign: 'left'}}>{'Description:  '}</div>
                  <div style={{textAlign: 'left', marginLeft: '10px'}}>{deal.description}</div>
                </div>
                <div style={{alignSelf: 'flex-start', display: 'flex', justifyContent: 'flex-start', padding: '10px 0'}}>
                  <div style={{fontWeight: '600', width: '100px', textAlign: 'left'}}>{'Team:  '}</div>
                  <div style={{textAlign: 'left', marginLeft: '10px'}}>{deal.team.join(', ')}</div>
                </div>
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </ButtonBase>
        {activeStep > 0 ? (
        <ButtonBase 
          style={{position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center'}}
          onClick={handleBack}
          disabled={activeStep === 0 ? true : false}
        >
          <ChevronLeftIcon/>
        </ButtonBase>
        ) : null}
        {activeStep < deals.length-1 ? (
        <ButtonBase 
          style={{position: 'absolute', right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center'}}
          onClick={handleNext}
        >
          <ChevronRightIcon/>
        </ButtonBase>
        ) : null}
      </Collapse>
      <div style={{minHeight: '10px'}}/>
      <div className={cl.collapseContainer}>
        <ButtonBase style={{width: '100%'}} onClick={()=>setOpen({...open, resources: !open.resources})}>
          <div className={cl.header}>Resources</div>
        </ButtonBase>
        <Collapse style={{}} component='div' in={open.resources} timeout='auto'>
          <div style={{display: 'flex'}}>
            <div style={{flexGrow: '1'}}>
              <List style={{}} dense={true}>
                <ListItem button onClick={()=>goToLink('http://jwconnect.jw.com/jwresources/')} dense={true}>
                  <ListItemText primary='JW Resources'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('http://jwconnect.jw.com/txlawnewsletters/')} dense={true}>
                  <ListItemText primary='News Letters'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('http://jwconnect.jw.com/practices/corporate-securities/Pages/resources.aspx')} dense={true}>
                  <ListItemText primary='Research Links'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('http://pdc-webapp03/conxions2/home/result?groupid=20350')} dense={true}>
                  <ListItemText primary='PG Members'/>
                </ListItem>
              </List>
            </div>
            <div style={{flexGrow: '1'}}>
              <List style={{}} dense={true}>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Client Alerts'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='CLE Schedule'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Deal Point Studies'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('http://pdc-webapp04/myrateinquiry')} dense={true}>
                  <ListItemText primary='My Billing Rate'/>
                </ListItem>
                <Divider/>
              </List>
            </div>
          </div>
        </Collapse>
      </div>
      <div style={{minHeight: '10px'}}/>
      <div className={cl.collapseContainer}>
        <ButtonBase style={{width: '100%'}} onClick={()=>setOpen({...open, databases: !open.databases})}>
          <div className={cl.header}>Databases</div>
        </ButtonBase>
        <Collapse style={{}} component='div' in={open.databases} timeout='auto'>
          <div style={{display: 'flex'}}>
            <div style={{flexGrow: '1'}}>
              <List style={{}} dense={true}>
                <ListItem button onClick={()=>goToLink('http://pdc-spapp01/sites/atracker/_layouts/15/start.aspx#/SitePages/Home.aspx')} dense={true}>
                  <ListItemText primary='Outside Firm Forms'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='PE Firms'/>
                </ListItem>
              </List>
            </div>
            <div style={{flexGrow: '1'}}>
              <List style={{}} dense={true}>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Banker Engagement Letters'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Corporate Success News Letters'/>
                </ListItem>
              </List>
            </div>
          </div>
        </Collapse>
      </div>
      <div style={{minHeight: '10px'}}/>
      <div className={cl.collapseContainer}>
        <ButtonBase style={{width: '100%'}} onClick={()=>setOpen({...open, clientDev: !open.clientDev})}>
          <div className={cl.header}>Client Development</div>
        </ButtonBase>
        <Collapse style={{}} component='div' in={open.clientDev} timeout='auto'>
          <div style={{display: 'flex'}}>
            <div style={{flexGrow: '1'}}>
              <List style={{}} dense={true}>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Talking Points (JW & PG)'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Talking Points (Diversity & GLobalaw)'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='PG Brochures'/>
                </ListItem>
              </List>
            </div>
            <div style={{flexGrow: '1'}}>
              <List style={{}} dense={true}>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Team Sheets/Placemats'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('http://pdc-webapp05.jwllp.com/matteriq')} dense={true}>
                  <ListItemText primary='MatterIQ'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={()=>goToLink('#')} dense={true}>
                  <ListItemText primary='Pitches by Industry'/>
                </ListItem>
              </List>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}