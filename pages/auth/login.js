import { Box, Center, Flex, Spacer, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputRightElement, Input, InputGroup, Button, Text } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';
import Router from 'next/router';

function LoginForm(props) {
    const [show, setShow] = React.useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(true)
    const [errorMsg, setErrorMag] = useState('');


    const { login, currentUser, signup } = useAuth();
    const handleClick = () => setShow(!show)

    useEffect(() => {
        setErrorMag('')
        if (currentUser) {
            Router.push({pathname: '/esd' , query: { "page": 'Search' }})
        }
    }, [isLoggingIn, currentUser])

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();


    async function onSubmit(values) {
        if (isLoggingIn) {
            try {
                await login(values.email, values.password)
            } catch (error) {
                setErrorMag(error.message);
            }
            console.log(currentUser, 'login');
        } else {
            try {
                await signup(values.email, values.password)
                setErrorMag('');
            } catch (error) {
                setErrorMag(error.message);
            }
        }
    }

    return (
        <div className={`${styles.login_main_container}`}>
            <div className={`${styles.login_container}`}>
                <div className={`${styles.textHeader}`}>
                    {isLoggingIn ? 'Sign in' : 'Sign up'}
                </div>
                <div className={`${styles.inputFormsContainer}`}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel htmlFor="email"></FormLabel>
                            <Input
                                id="email"
                                variant='outline'
                                placeholder="Email"
                                type="email"
                                {...register("email", {
                                    required: "email is required",

                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password}>
                            <FormLabel htmlFor="password"></FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    variant='outline'
                                    type={show ? 'text' : 'password'}
                                    {...register("password", {
                                        required: "This is required",
                                        minLength: { value: 4, message: "Minimum length should be 4" }
                                    })}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' bg='#212529' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Box mt={5}>
                            <Flex>
                                <Center w='100%' color='Red'>
                                    <FormErrorMessage >
                                        {errorMsg}
                                    </FormErrorMessage>
                                    {/* <Text alignItems='center' onClick={() => setIsLoggingIn(true)} cursor='pointer' decoration='underline'>errorId</Text> */}
                                </Center>
                            </Flex>
                        </Box>
                        {errorMsg && (<Box mt={5}>
                            <Flex>
                                <Center w='100%'>
                                    <Text alignItems='center' onClick={() => setIsLoggingIn(true)} cursor='pointer' decoration='underline'>
                                        {errorMsg}
                                    </Text>
                                </Center>
                            </Flex>
                        </Box>)}
                        <Box>
                            <Flex>
                                <Center w='100%' >
                                    <Button mt={4} width='140px' height='39px' size='16' colorScheme="blue" isLoading={isSubmitting} type="submit">
                                        Sign In
                                    </Button>
                                </Center>
                            </Flex>
                        </Box>
                    </form>
                    {
                        isLoggingIn ?
                            (
                                <div>
                                    <Box mt={5}>
                                        <Flex>
                                            <Text cursor='pointer' decoration='underline'>Forgot password?</Text>
                                            <Spacer />
                                            <Text cursor='pointer' onClick={() => setIsLoggingIn(false)} decoration='underline'>create Account</Text>
                                        </Flex>
                                    </Box>
                                </div>
                            ) :
                            <>
                                <div>
                                    <Box mt={5}>
                                        <Flex>
                                            <Center w='100%'>
                                                <Text alignItems='center' onClick={() => setIsLoggingIn(true)} cursor='pointer' decoration='underline'>LogIn</Text>
                                            </Center>
                                        </Flex>
                                    </Box>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default LoginForm;