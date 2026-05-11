'use client'

import { useState } from 'react'

export default function Home() {

  const wheel = [
    0,32,15,19,4,21,2,25,17,34,6,27,
    13,36,11,30,8,23,10,5,24,16,33,
    1,20,14,31,9,22,18,29,7,28,12,
    35,3,26
  ]

  const [number, setNumber] = useState('')
  const [history, setHistory] = useState([])

  const addNumber = () => {

    const num = parseInt(number)

    if (isNaN(num) || num < 0 || num > 36) {
      return
    }

    const updated = [num, ...history].slice(0, 30)

    setHistory(updated)

    setNumber('')
  }

  const getHotNumbers = () => {

    const scores = {}

    history.forEach((num) => {

      const index = wheel.indexOf(num)

      for (let i = -2; i <= 2; i++) {

        const neighborIndex =
          (index + i + wheel.length) % wheel.length

        const neighbor = wheel[neighborIndex]

        scores[neighbor] = (scores[neighbor] || 0) + 1
      }
    })

    return Object.entries(scores)
      .sort((a,b) => b[1] - a[1])
      .slice(0,8)
  }

  const hot = getHotNumbers()

  return (

    <main style={{
      minHeight:'100vh',
      background:'#0a0a0a',
      color:'white',
      padding:'30px',
      fontFamily:'Arial'
    }}>

      <h1 style={{
        fontSize:'42px',
        marginBottom:'10px'
      }}>
        Lightning Roulette Tracker
      </h1>

      <p style={{
        color:'#999',
        marginBottom:'30px'
      }}>
        Analyze wheel regions and hot sectors
      </p>

      <div style={{
        display:'flex',
        gap:'10px',
        marginBottom:'30px'
      }}>

        <input
          value={number}
          onChange={(e)=>setNumber(e.target.value)}
          placeholder='0-36'
          style={{
            padding:'14px',
            borderRadius:'10px',
            border:'none',
            width:'120px',
            fontSize:'18px'
          }}
        />

        <button
          onClick={addNumber}
          style={{
            background:'#16a34a',
            color:'white',
            border:'none',
            borderRadius:'10px',
            padding:'14px 20px',
            cursor:'pointer',
            fontWeight:'bold'
          }}
        >
          ADD
        </button>

      </div>

      <h2>Last 30 Numbers</h2>

      <div style={{
        display:'flex',
        flexWrap:'wrap',
        gap:'10px',
        marginBottom:'40px'
      }}>

        {history.map((n,i)=>(

          <div
            key={i}
            style={{
              width:'50px',
              height:'50px',
              background:'#222',
              borderRadius:'10px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              fontWeight:'bold'
            }}
          >
            {n}
          </div>

        ))}

      </div>

      <h2>Hot Regions</h2>

      <div style={{
        display:'grid',
        gap:'12px',
        maxWidth:'400px'
      }}>

        {hot.map(([num,score],i)=>(

          <div
            key={i}
            style={{
              background:'#1f1f1f',
              padding:'16px',
              borderRadius:'12px',
              display:'flex',
              justifyContent:'space-between'
            }}
          >
            <span>Number {num}</span>
            <span style={{
              color:'#22c55e',
              fontWeight:'bold'
            }}>
              Score {score}
            </span>
          </div>

        ))}

      </div>

    </main>
  )
}
