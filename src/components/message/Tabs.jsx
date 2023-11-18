import React, { useState } from 'react'

const Tabs = () => {
    const [selected, setSelected] = useState(1)

  return (
    <section className='flex items-center justify-between text-text-secondary font-semibold w-full' >
        <div onClick={()=>setSelected(1)} className={`flex items-center justify-center w-full border-b border-${selected === 1 ?  "text-primary" : "hover-primary"} pb-3 cursor-pointer`}>
            <h4>Primary</h4>
        </div>
        <div onClick={()=>setSelected(2)} className={`flex items-center justify-center w-full border-b border-${selected === 2 ?  "text-primary" : "hover-primary"} pb-3 cursor-pointer`}>
            <h4>General</h4>
        </div>
        <div onClick={()=>setSelected(3)} className={`flex items-center justify-center w-full border-b border-${selected === 3 ?  "text-primary" : "hover-primary"} pb-3 cursor-pointer`}>
            <h4>Requests</h4>
        </div>
    </section>
  )
}

export default Tabs
