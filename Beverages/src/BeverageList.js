import React from 'react'
import './BeverageList.css'
import BeverageComp from './BeverageComp'
import Loading from './Loading'
import { useGlobalContext } from './context'

function BeverageList() {
  const { cocktails, loading } = useGlobalContext()
  if (loading) {
    return <Loading/>
  }
  if (cocktails.length < 1) {
    return (
      <h2 className='section-title'>
        no cocktails matched your search criteria
      </h2>
    )
  }
  return (
    <section className='section'>
      <h2 className='section-title'>Beverages</h2>
      <div className='cocktails-center'>
        {cocktails.map((item) => {
          return <BeverageComp key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}

export default BeverageList;