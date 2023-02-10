import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'

import ItemForm from '@/components/ItemForm'
import Item, { ItemType } from "@/components/Item"
import { useState } from 'react'
import ItemList from '@/components/ItemList'

const inter = Inter({ subsets: ['latin'] })

export type editProps = {
  edit: boolean,
  item?: ItemType
}

export default function Home() {
  const baseItems: ItemType[] = []
  const [items, setItems] = useState(baseItems)
  const baseEdit: editProps = {
    edit: false
  }
  const [edit, setEdit] = useState(baseEdit)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p className='text-4xl text-center my-8 font-bold'>Flavors</p>
        <div className='flex'>
          <ItemForm globalEdit={edit} setGlobal={setEdit} initial={{name: "", flavor: "", price: "0.00", pints: "0"}} items={items} addItem={setItems}/>
          <ItemList globalEdit={edit} setGlobal={setEdit} items={items}/>
        </div>
      </main>
    </>
  )
}
