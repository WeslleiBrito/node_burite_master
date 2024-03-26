import React from 'react';
import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useContext } from "react";
import { DataContext } from '../../context/dataContext'

export const SubgroupsPage: React.FC = () => {
    
    const context = useContext(DataContext)

    const { loading, subgroups, updateSubgroup} = context
    updateSubgroup()
    return(
        <Table variant="striped" colorScheme="blue">
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
                    !loading ? subgroups.map(row => {
                        return <Tr key={row.codSubgroup}>
                            <Td><Checkbox/></Td>
                            <Td>{row.codSubgroup}</Td>
                            <Td>{row.nameSubgroup}</Td>
                            <Td>{row.fixedUnitExpense}</Td>
                            <Td>{row.plucro}</Td>
                        </Tr>
                    }): <></>
                }
            </Tbody>
        </Table>
    )
}