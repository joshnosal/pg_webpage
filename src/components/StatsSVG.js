import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import { withSize } from 'react-sizeme'
import { line } from 'd3'

const useStyle = makeStyles({
  dataLabel: {
    color: 'white',
    fontSize: '12px',
    fontWeight: '500',
    fontStyle: 'italic',
    marginRight: '20px',
    width: '80px',
    textAlign: 'right'
  },
  dataValue: {
    color: 'white',
    fontSize: '12px',
    fontWeight: '500',
    fontStyle: 'italic'
  }
})

function StatsSVG(props){
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data1 = [
    {month: 0, deals: 12, value: 6},
    {month: 1, deals: 6, value: 5},
    {month: 2, deals: 9, value: 4.5},
    {month: 3, deals: 5, value: 2},
    {month: 4, deals: 8, value: 9},
    {month: 5, deals: 7, value: 3},
    {month: 6, deals: 6, value: 7},
    {month: 7, deals: 13, value: 12},
    {month: 8, deals: 9, value: 14},
    {month: 9, deals: 14, value: 18},
    {month: 10, deals: 16, value: 15},
    {month: 11, deals: 21, value: 19},
  ]
  const data2 = [
    {month: 0, deals: 10, value: 7},
    {month: 1, deals: 9, value: 6},
    {month: 2, deals: 5, value: 3},
    {month: 3, deals: 7, value: 8},
    {month: 4, deals: 12, value: 6},
    {month: 5, deals: 6, value: 14},
    {month: 6, deals: 8, value: 12},
    {month: 7, deals: 13, value: 9},
  ]
  const [details, setDetails] = useState({
    lastDeals: null,
    thisDeals: null,
    lastVol: null, 
    thisVol: null,
  })
  const d3Container = useRef(null)
  let margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = props.size.width - margin.left - margin.right,
      height = props.size.height - margin.top - margin.bottom

  useEffect(()=>{

    const xBarScale = d3.scaleBand().domain(data1.map(i=>(i.month))).range([0, width]).paddingInner(0.2)
    const xLineScale = d3.scaleLinear().domain([0, 11]).range([0, width])
    const yValScale = d3.scaleLinear().domain([0, 22]).range([height, 0])
    const yScale = d3.scaleLinear().domain([0, 30]).range([height, 0])

    let svg = d3.select(d3Container.current).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let line = d3.line().x(d=>(xBarScale(d.month) + (xBarScale.bandwidth() / 2))).y(d=>yScale(d.value))
    
    svg.selectAll('bar')
      .data(data1).enter().append('rect')
      .style("fill", "rgba(0,0,0,0.3)")
      .attr("x", d=>xBarScale(d.month))
      .attr("width", xBarScale.bandwidth()/2)
      .attr("y", d=>yScale(d.deals))
      .attr("height", d=>(height - yScale(d.deals)))

    svg.selectAll('bar')
      .data(data2).enter().append('rect')
      .style("fill", "rgba(255,255,255,0.3)")
      .attr("x", d=>xBarScale(d.month)+xBarScale.bandwidth() / 2)
      .attr("width", xBarScale.bandwidth()/2)
      .attr("y", d=>yScale(d.deals))
      .attr("height", d=>(height - yScale(d.deals)))
    
    svg.selectAll('bar')
      .data(data1).enter().append('rect')
      .style("fill", "transparent")
      .attr("x", d=>xBarScale(d.month))
      .attr("width", xBarScale.bandwidth())
      .attr("y", 0)
      .attr("height", d=>height)
      .on('mouseover', enterRect)
      .on('mouseout', exitRect)

    svg.selectAll('points')
      .data(data1).enter().append('circle')
      .attr('cx', d=>(xBarScale(d.month) + xBarScale.bandwidth() / 2))
      .attr('cy', d=>yScale(d.value))
      .attr('r', 5)
      .style('fill', 'black')

    svg.append('path')
      .attr('d', line(data1))
      .style('stroke', 'black')
      .style('stroke-width', 1)
      .style('fill', 'none')
    
    svg.selectAll('points')
      .data(data2).enter().append('circle')
      .attr('cx', d=>(xBarScale(d.month) + xBarScale.bandwidth() / 2))
      .attr('cy', d=>yScale(d.value))
      .attr('r', 5)
      .style('fill', 'white')

    svg.append('path')
      .attr('d', line(data2))
      .style('stroke', 'white')
      .style('stroke-width', 1)
      .style('fill', 'none')

    function enterRect(d,i){
      let data = {
        lastDeals: i.deals,
        thisDeals: null,
        lastVol: i.value, 
        thisVol: null,
      }
      if (data2[i.month]) {
        data.thisDeals = data2[i.month].deals
        data.thisVol = data2[i.month].value
      }
      setDetails(data)
    }
    function exitRect(d,i){
      setDetails({
        lastDeals: null,
        thisDeals: null,
        lastVol: null, 
        thisVol: null,
      })
    }

    svg.append('text')
      .attr('text', 'string')

  }, [d3Container.current])
  


  const getChange = (then, now) => {
    let val = Math.round(((now - then) / then) * 100)
    if (isNaN(val) || val === Infinity || now === null) return ''
    return '  ('+val+'%)'
  }

  const getVolume = (val) => {
    if (val === null) return ''
    val = val * 1000000
    return '$'+ val.toString().replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")
  }

  const cl = useStyle()
  return(
    <div ref={e=>{d3Container.current=e}} style={{width: '100%', height: '100%', position: 'relative'}}>
      <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', padding: '10px'}}>
        <div style={{fontSize: '20px', textTransform: 'uppercase', color: 'white', fontWeight: '400', paddingBottom: '10px'}}>Corporate & Securities</div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <span className={cl.dataLabel}>2020 Deals</span>
          <span className={cl.dataValue}>{details.lastDeals || '--'}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <span className={cl.dataLabel}>2021 Deals</span>
          <span className={cl.dataValue}>{(details.thisDeals || '') + getChange(details.lastDeals, details.thisDeals) || '--'}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <span className={cl.dataLabel}>2020 Volume</span>
          <span className={cl.dataValue}>{getVolume(details.lastVol) || '--'}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <span className={cl.dataLabel}>2021 Volume</span>
          <span className={cl.dataValue}>{getVolume(details.thisVol) + getChange(details.lastVol, details.thisVol) || '--'}</span>
        </div>
      </div>
    </div>
    
  )
}

export default withSize({monitorHeight: true})(StatsSVG)