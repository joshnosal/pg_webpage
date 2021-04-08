import React, { useState, useRef, useCallback } from 'react' 
import { makeStyles } from '@material-ui/core/styles'
import { TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Collapse, Button } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import CloseIcon from '@material-ui/icons/Close'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import AttachFileIcon from '@material-ui/icons/AttachFile'

import './FeedStyles.css'
import { getAllByPlaceholderText } from '@testing-library/dom'

const useStyles = makeStyles({
  header: {
    color: '#005091',
    fontWeight: '600',
    padding: '10px 0',
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default function Feed(props){
  const cl = useStyles()
  const [data, setData] = useState([])
  const [item, setItem] = useState({
    title: '',
    comment: '',
    author: '',
    attachment: undefined,
    attachmentName: undefined,
    category: '',
    industry: undefined
  })
  const [open, setOpen] = useState(true)
  const link = useRef(null)
  let objectURL

  const industries = ['Tech', 'Finance', 'Healthcare', 'Energy', 'Manufacturing']
  const categories = ['Annual Report', 'Business Development', 'Case Law', 'JW Update', 'Legal Research', 'News Article',  'Fun Fact']

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.onload = () => {
      setItem({...item, attachment: reader.result, attachmentName: acceptedFiles[0].name})
    }
    reader.readAsArrayBuffer(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({maxFiles: 1, noClick: item.attachment ? true : false, onDrop})

  const submitItem = () => {
    if (!item.title) return alert('Title is required')
    if (!item.comment) return alert('Description is required')
    if (!item.author) return alert('Author is required')
    if (!item.category) return alert('Please select a category')
    if (!item.industry) return (alert('Please select an industry'))
    let dataClone = [...data]
    let objectURL
    dataClone.unshift({
      ...item,
      date: new Date()
    })
    setData(dataClone)
    setItem({
      title: '',
      comment: '',
      author: '',
      attachment: undefined,
      attachmentName: undefined,
      category: '',
      industry: ''
    })
  }

  const getDate = (date) => {
    date = new Date(date)
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '20px', overflow: 'hidden'}}>
      <div style={{display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '20px'}}>
        <div className={cl.header}>
          <div>New Submission</div>
          <div style={{flexGrow: '1'}}/>
          <IconButton size='small' onClick={()=>setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </div>
        <Collapse style={{display: 'flex', flexDirection: 'column', paddingBottom: open ? '10px' : null}} in={open} timeout='auto'>
          <div style={{display: 'flex', padding: '0 10px 0 10px'}}>
            <TextField
              size='small'
              margin='dense'
              value={item.title}
              onChange={e=>setItem({...item, title: e.target.value})}
              variant='outlined'
              className='text-input'
              placeholder='Title'
              style={{flexGrow: '1'}}
            />
            <div style={{width: '10px'}}/>
            <TextField
              size='small'
              margin='dense'
              value={item.author}
              onChange={e=>setItem({...item, author: e.target.value})}
              variant='outlined'
              className='text-input'
              placeholder='Author'
              style={{flexGrow: '1'}}
            />
          </div>
          <div style={{display: 'flex', padding: '10px 10px 0 10px'}}>
            <TextField
              size='small'
              margin='dense'
              value={item.comment}
              onChange={e=>setItem({...item, comment: e.target.value})}
              variant='outlined'
              className='text-input'
              placeholder='Description'
              multiline={true}
              fullWidth={true}
              rowsMax={4}
            />
          </div>
          <div 
            className='drop-zone' 
            style={{margin: '10px 10px 0 10px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            {...getRootProps()}
          >
            <input {...getInputProps()}/>
            { item.attachment ? (
              <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{width: '70%'}}>{item.attachmentName}</div>
                <IconButton
                  children={<CloseIcon/>}
                  size='small'
                  onClick={()=>setItem({...item, attachment: undefined, attachmentName: undefined})}
                />
              </div>
            ) : isDragActive ? <p>Drop the files here...</p> : <p>Drag 'n' drop some files here</p>}
          </div>
          <div style={{display: 'flex', padding: '10px'}}>
            <FormControl variant='standard' style={{flexGrow: '1'}}>
              <InputLabel id='category-label'>Category</InputLabel>
              <Select
                labelId='category-label'
                value={item.category}
                onChange={e=>setItem({...item, category: e.target.value})}
                className='input-select'
                autoWidth={true}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {categories.map((cat,i)=>(
                  <MenuItem value={cat} key={i}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{width: '10px'}}/>
            <FormControl variant='standard' style={{flexGrow: '1'}}>
              <InputLabel id='industry-label'>Industry</InputLabel>
              <Select
                labelId='industry-label'
                value={item.industry}
                onChange={e=>setItem({...item, industry: e.target.value})}
                className='input-select'
                autoWidth={true}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {industries.map((ind,i)=>(
                  <MenuItem value={ind} key={i}>{ind}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', padding: '10px 10px 3px 10px'}}>
            <Button variant='contained' onClick={submitItem}>Submit</Button>
          </div>
        </Collapse>
      </div>
      <div style={{height: '10px'}}/>
      <div style={{display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '20px', flexGrow: '1', overflow: 'hidden', paddingBottom: '10px'}}>
        <div className={cl.header} style={{height: '30px', alignItems: 'center', borderBottom: '1px solid #005091'}}>
          Archive
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1', overflowY: 'overlay', padding: '10px 10px', overflowX: 'hidden'}}>
          {data.map((thing, i)=>(
            <div style={{display: 'flex', flexDirection: 'row', overflowX: 'hidden', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '10px'}}>
              <div style={{display: 'column', overflowX: 'hidden', flexGrow: '1'}}>
                <div style={{color: 'rgba(0,0,0,0.8)', fontWeight: '600', fontSize: '14px', lineHeight: '20px'}}>{thing.title}</div>
                <div style={{color: 'rgba(0,0,0,0.8)', fontWeight: '400', fontSize: '12px', lineHeight: '20px', whiteSpace: 'nowrap', textOverflow: 'ellipsis',overflow: 'hidden'}}>{thing.comment}</div>
                <div style={{color: 'rgba(0,0,0,0.6)', fontWeight: '400', fontSize: '12px', lineHeight: '20px', fontStyle: 'italic'}}>{getDate(thing.date) + '  ' + thing.author}</div>
              </div>
              <div style={{minWidth: '48px'}}>
                {thing.attachment ? (
                  <IconButton onClick={()=>{
                    const blob = new Blob([thing.attachment])
                    objectURL = URL.createObjectURL(blob)
                    link.current.href = objectURL
                    link.current.download = thing.attachmentName
                    link.current.click()
                  }}>
                    <AttachFileIcon/>
                  </IconButton>
                ) : null}
              </div>
            </div>
          ))}
          <a ref={e=>{link.current = e}} style={{display: 'none'}} download/>
        </div>
      </div>
    </div>
  )
}