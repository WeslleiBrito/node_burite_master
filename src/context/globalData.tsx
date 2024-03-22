import React, { ReactNode, useEffect, useState } from 'react'
import { ContextInterface } from '../types/type'
import { DataContext } from './dataContext'
import { useFachtData } from '../hooks/useFetchDataHook'
import axios, { AxiosError }  from 'axios';
import { BASE_URL } from '../../src/constants/BASE_URL'

interface DataContextProps {
    children: ReactNode
}

export const GlobalDataProvider: React.FC<DataContextProps> = (props) => {

    const {error, loading, usersNameAPI} = useFachtData()
    const [usersName, setUsersName] = useState<string[]>([])

    useEffect(() => setUsersName([...usersNameAPI]), [usersNameAPI])

    const context: ContextInterface = {
        usersName,
        error,
        loading
    }

    return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>
}