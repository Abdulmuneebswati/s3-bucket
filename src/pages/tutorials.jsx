import Layout from '@/Components/CommonComponents/Layout'
import React from 'react'
import Image from 'next/image'
import profile from "../../public/assets/profile.jpeg"

const Tutorials = () => {
  return (
    <Layout>
        <div className={`h-screen background-image:url('')`}>
        <Image src={profile} width={500} height={500}/>
        </div>
    </Layout>
  )
}

export default Tutorials
