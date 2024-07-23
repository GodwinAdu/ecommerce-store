import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './MainNav'
import StoreSwitcher from '../switcher/store-switcher'
import { redirect } from 'next/navigation'
import { FindUserStores } from '@/lib/actions/store.actions'

const Navbar = async() => {

    const { userId } = auth();

    if (!userId) {
      redirect('/sign-in');
    };

    const stores = await FindUserStores({userId})
  return (
    <div className='border-b'>
      <div className="flex h-16 px-4 items-center">
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6'/>
        <div className="ml-auto flex items-center space-x-4">
            <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default Navbar
