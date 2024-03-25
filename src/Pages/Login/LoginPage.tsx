import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import axios, { AxiosError } from "axios"
import React, { useState } from "react"
import { BASE_URL_REMOTE } from "../../constants/BASE_URL"


type FormDataLogin = {
    email: string,
    password: string
}

export const Login: React.FC = () => {

    const [formLogin, setFormLogin] = useState<FormDataLogin>({
        email: '',
        password: ''
    })

    // Toast para exibir mensagens de erro/sucesso
    const toast = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setFormLogin((prevData) => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }

    const enter = async (email: string, password: string) => {
        try {
            const body = {
                email,
                password
            }

            const login = await axios.post(BASE_URL_REMOTE + '/users/login', body)

            localStorage.setItem('token', login.data.token)
            localStorage.setItem('idUser', login.data.idUser)

            toast(
                {
                    title: "Sucesso!",
                    description: "Logado com sucesso",
                    status: "success",
                    duration: 2000,
                    isClosable: true
                }
            )

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const {email, password} = formLogin

        if (email === '' || password === '') {
            toast(
                {
                    title: 'Erro!',
                    description: 'Por favor, preencha todos os campos.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                }
            )
        }

        await enter(email, password)
        
    }

    return(
        <Box  height={"88vh"} w={"30vw"} ml={"59vw"} marginTop={"10vh"} p={4} borderWidth={"1px"} borderRadius={"lg"} bgColor={"#FDEADC"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input
                        type="text"
                        name="email"
                        value={formLogin.email}
                        onChange={handleChange}
                        placeholder="Email"
                        borderColor={"chocolate"}
                        variant='flushed'
                        focusBorderColor="chocolate"
                        autoComplete="off"
                        width={"20vw"}
                    />
                </FormControl >
                <FormControl mt={4} width={"100%"}>
                    <Input
                        type="password"
                        name="password"
                        value={formLogin.password}
                        onChange={handleChange}
                        placeholder="Senha"
                        borderColor={"chocolate"}
                        variant='flushed'
                        focusBorderColor="chocolate"
                    />
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit" width={"max-content"} w={"20vw"}>
                    Entrar
                </Button>
            </form>
        </Box>
    )
}