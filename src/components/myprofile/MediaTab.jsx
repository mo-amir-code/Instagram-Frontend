import { BookmarkSimple, GridNine, UserSquare } from '@phosphor-icons/react'
import React, { useState } from 'react'

const MediaTab = () => {
    const [selected, setSelected] = useState(1)

  return (
    <section className='flex items-center justify-center space-x-12 text-xs text-text-secondary font-medium w-[40%]' >
        <span onClick={()=>setSelected(1)} className={`flex items-center space-x-1 justify-center border-t border-${selected === 1 ?  "text-primary" : "hover-primary"} text-${selected === 1 ?  "text-primary" : "hover-primary"} pt-3 cursor-pointer`}>
            <GridNine size={14} />
            <h4>POSTS</h4>
        </span>
        <span onClick={()=>setSelected(2)} className={`flex items-center space-x-1 justify-center border-t border-${selected === 2 ?  "text-primary" : "hover-primary"} text-${selected === 2 ?  "text-primary" : "hover-primary"} pt-3 cursor-pointer`}>
            <BookmarkSimple size={14} />
            <h4>SAVED</h4>
        </span>
        <span onClick={()=>setSelected(3)} className={`flex items-center space-x-1 justify-center border-t border-${selected === 3 ?  "text-primary" : "hover-primary"} text-${selected === 3 ?  "text-primary" : "hover-primary"} pt-3 cursor-pointer`}>
            <UserSquare  size={14} />
            <h4>TAGGED</h4>
        </span>
    </section>
  )
}

export default MediaTab
