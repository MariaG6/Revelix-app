import FooterClient from '@/components/FooterClient/FooterClient'
import HomeClient from '@/components/Home/HomeClient'
import { NavbarClient } from '@/components/NavbarClient'
import React from 'react'

export default function HomePage() {

  return (
    <div>
      <NavbarClient/>
      <HomeClient/>
      <FooterClient/> 
    </div>
  )
}

