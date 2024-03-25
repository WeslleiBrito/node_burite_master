import React, { ReactNode, useEffect, useState } from 'react'
import { ContextInterface, Subgroup } from '../types/type'
import { DataContext } from './dataContext'
import { useFachtData } from '../hooks/useFetchDataHook'
import axios, { AxiosError }  from 'axios';
import { BASE_URL_REMOTE } from '../../src/constants/BASE_URL'
import { useToast } from "@chakra-ui/react"

interface DataContextProps {
    children: ReactNode
}

export const GlobalDataProvider: React.FC<DataContextProps> = (props) => {

    const {error, loading, usersNameAPI} = useFachtData()
    const [usersName, setUsersName] = useState<string[]>([])
    const [subgroups, setSubgroups] = useState<Subgroup[]>([])
    const toast = useToast()

    useEffect(() => setUsersName([...usersNameAPI]), [usersNameAPI])

    const updateSubgroup = async () => {

        try {

            const result = await axios.get(BASE_URL_REMOTE + '/subgroup', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            setSubgroups([...result.data])

        } catch (error) {
           
            if(error instanceof AxiosError){
                
                toast(
                    {
                        title: "Erro!",
                        description: error.response?.data ? error.response.data : "",
                        status: "error",
                        duration: 2500,
                        isClosable: true
                    }
                )
            }
        }
    }

    const context: ContextInterface = {
        usersName,
        error,
        loading,
        updateSubgroup,
        subgroups
    }

    return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>
}