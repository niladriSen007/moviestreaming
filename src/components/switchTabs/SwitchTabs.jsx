import React, { useState } from 'react'
import "./SwitchTabs.scss"

const SwitchTabs = ({data,onTabChange}) => {

      const [selectedTab,setSelectedTab] = useState(0)
      const [left,setLeft] = useState(0)

      const [timeTab,setTimeTab]= useState(data[0])

      const switchTime = (t) =>{
                  setTimeTab(t)
                  onTabChange(t)
      }

  return (
    <div className='switchingTabs'>
      <div className="tabItems">
            {
                  data.map((tab,i)=>(
                        <span key={i} className={`tabItem ${timeTab === tab ? "movingBg" : ""}`} onClick={()=>switchTime(tab)}>
                              {tab}
                        </span>
                  ))
            }
      </div>
    </div>
  )
}

export default SwitchTabs