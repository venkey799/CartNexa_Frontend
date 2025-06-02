import React from 'react'
import iphone from '../../assets/iphone-14-pro.jpg'
import mac from "../../assets/mac-system.jpg"
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'



function HomePage() {
  return (
    <div>
      <HeroSection title="iphone 14 Pro" subtitle="Experience the power of the latest iphone 14 with our most Pro Camera ever." link={`products/682eca0d778fc4687bb7e5a8`} image={iphone}/>
      <FeaturesSection/>
      <HeroSection title="Mac" subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini" link={`products/682eca0d778fc4687bb7e5b0`} image={mac}/>
    </div>
  )
}

export default HomePage