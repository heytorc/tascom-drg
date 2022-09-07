import { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '@/commons/contexts/auth.context';

interface IFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, setError } = useForm<IFormInput>();
  const { signIn, error } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => console.log('errors', errors), [errors]);

  const handleLogin: SubmitHandler<IFormInput> = async (data) => {
    // if (data.username === 'admin') setError('username', { message: 'username is invalid', type: 'validate' })
    
    await signIn(data);
    // navigate('/app')
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Tascom</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Extração do DRG
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username?.type}>
                <FormLabel>Usuário</FormLabel>
                <Input
                   {...register("username", { required: true })}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.password?.type}>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Lembrar</Checkbox>
                  <Link color={'blue.400'}>Esqueceu a senha?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  isLoading={isSubmitting}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}