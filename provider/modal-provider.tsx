"use client"

import { StoreModal } from '@/components/modal/Store-modal'
import {useState, useEffect} from 'react'

export const ModalProvider = () =>{
    const [isMounted, setIsMounted ]= useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return(
        <>
            <StoreModal />
        </>
    )
}