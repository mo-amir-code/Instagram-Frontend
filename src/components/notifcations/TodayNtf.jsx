import React from 'react'
import LikeNtf from './LikeNtf'
import CmtNtf from './CmtNtf'

const TodayNtf = () => {
  return (
    <section className='flex flex-col text-text-primary px-6 space-y-2 border-b border-hover-primary' >
        <h4 className='text-base font-bold' >Today</h4>
        {/* notifications */}
        <div className='flex flex-col' >
            {[1, 2].map((el, idx)=>(
                <LikeNtf key={idx} />
            ))}
            <CmtNtf />
        </div>    
    </section>
  )
}

export default TodayNtf


