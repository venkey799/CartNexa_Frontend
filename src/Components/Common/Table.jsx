import React from 'react'

import './Table.css'
export default function Table({headings, children}) {
  return (
    <table className='common_table'>
        <thead>
            {
                headings.map((item, index) =><th key={index}>{item}</th>)
            }
        </thead>
        {children}
    </table>
  )
}
