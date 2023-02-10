import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'

import FlavorForm from '@/components/FlavorForm'
import Flavor, { FlavorType } from "@/components/Flavor"
import { useState, Fragment } from 'react'
import FlavorList from '@/components/FlavorList'
import FlavorDetails from '@/components/FlavorDetails'

const inter = Inter({ subsets: ['latin'] })

export type editProps = {
  edit: boolean,
  flavor?: FlavorType
}

export default function Home() {
  const baseFlavors: FlavorType[] = []
  const [flavors, setFlavors] = useState(baseFlavors)
  const [details, setDetails] = useState(false)
  const baseEdit: editProps = {
    edit: false
  }
  const [edit, setEdit] = useState(baseEdit)

  function handleDecrement(flavor: FlavorType) {
    let newFlavor = flavor
    newFlavor.pints--
    const flavorIndex = flavors.findIndex(fl => fl.id === flavor.id)
    const newFlavors = structuredClone(flavors)
    newFlavors[flavorIndex] = newFlavor
    setFlavors(newFlavors)
  }
  return (
    <>
      <Head>
        <title>Ice Cream Shop</title>
        <meta name="description" content="Manage a mock ice cream shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

          {
            details ? (
              <FlavorDetails globalEdit={edit} setGlobal={setEdit} flavor={edit.flavor!} setDetails={setDetails}/>
            ) : (
              <>              
                <p className='text-4xl text-center my-8 font-bold'>Flavors</p>
                <div className='flex'>
                  <FlavorForm globalEdit={edit} setGlobal={setEdit} initial={{name: "", flavor: "", price: "0.00", pints: "0"}} flavors={flavors} addFlavor={setFlavors}/>
                  <FlavorList globalEdit={edit} setGlobal={setEdit} flavors={flavors} setDetails={setDetails} decrement={handleDecrement}/>
                </div>
              </>
            )
          }
      </main>
    </>
  )
}
