import React from 'react'

const CustomAvatar = ({avatar, name, size}) => {
    
  return (
    <div className={`w-[26px] h-[26px] rounded-full overflow-hidden`} >
      <img src={avatar} alt={name} className='object-cover' />
    </div>
  )
}

export default CustomAvatar
