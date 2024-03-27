import React, { ChangeEvent, useEffect, useState } from 'react';
import { Checkbox, Table, Tbody, Td, Th, Thead, Tr, Input, Box } from '@chakra-ui/react';
import { useContext } from "react";
import { DataContext } from '../../context/dataContext'
import { useNavigate } from "react-router-dom";
import { goLoading } from '../../Routes/coordinator';
import { Subgroup } from '../../types/type';
import { useForm } from '../../hooks/useForm';

type searchMethods  = "nameSubgroup" | "codSubgroup"

export const SubgroupsPage: React.FC = () => {
    
    const context = useContext(DataContext)
    const navigate = useNavigate()
    const { loading, subgroups, updateSubgroup, error} = context
    
    const [listSubgroups, setListSubgroups] = useState<Subgroup[]>([])
    const [typeSearchMethod, setTypeSearchMethod] = useState<searchMethods>("nameSubgroup")
    

    useEffect(() => {

        const update = async () => {
            if(localStorage.getItem('token')){
                updateSubgroup()
            }else{
                goLoading(navigate)
            }
        }
        
        update()
        
    }, [])

    useEffect(() => setListSubgroups([...subgroups]), [subgroups])

    const [form, onChange] = useForm(
        {
            search: ""
        }
    )

    const filterListSubgroups = (event: ChangeEvent<HTMLInputElement>) => {

        const search = event.target.value

        const newList: Subgroup[] = subgroups.filter((subgroup) => {
            
            if(typeSearchMethod === "nameSubgroup"){
                return subgroup.nameSubgroup.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
            }else{
                return subgroup.codSubgroup.toString().includes(search)
            }
        })

        setListSubgroups(newList)
    }

    return(
        !loading && !error ?<Box>
            <Input 
                name="search" 
                value={form.search} 
                placeholder='Buscar' 
                size='md' 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); filterListSubgroups(event)}}
                mb={"5vh"}
            />
            <Table colorScheme="blue" sx={{ "& tbody tr": { height: "1vh", padding: "0" } }}>
                <Thead>
                    <Tr>
                        <Th><Checkbox/></Th>
                        <Th>Código</Th>
                        <Th>Descrição</Th>
                        <Th>Despesa Fixa</Th>
                        <Th>Lucro</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        listSubgroups.map(row => {
                            return <Tr key={row.codSubgroup} >
                                <Td><Checkbox/></Td>
                                <Td>{row.codSubgroup}</Td>
                                <Td>{row.nameSubgroup}</Td>
                                <Td>{row.fixedUnitExpense}</Td>
                                <Td>{row.plucro}</Td>
                            </Tr>
                        })
                    }
                </Tbody>
            </Table> 
            </Box> 
        : <></>
        
    )
}
