import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Select
} from '@chakra-ui/react';

import dayjs from '@/commons/utils/date.utils';

import { IFormFilterProps } from "@/commons/interfaces/drg/IFormFilterProps";

import { useDrg } from '@/commons/contexts/drg.context';
import { SearchIcon } from '@chakra-ui/icons';
import { translateMessage } from '@/commons/utils/text.utils';

const DrgFilter: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    },
    setError
  } = useForm<IFormFilterProps>();

  const { searchData } = useDrg()

  const handleValidateFilter = (data: IFormFilterProps): boolean => {
    const initialDate = dayjs(data.initialDate);
    const finalDate = dayjs(data.finalDate);

    if (finalDate.diff(initialDate) > 30) {
      setError('initialDate', { message: 'MAX_PERIOD_FILTER_EXCEDED' })
      return false;
    } else return true
  }

  const handleSearch: SubmitHandler<IFormFilterProps> = async (data) => {
    const params = { ...data };

    if (!handleValidateFilter(data)) return;

    await searchData(params)
  };

  return (
    <>
      <Heading size={'lg'} mb={2}>Filtro para Consulta</Heading>

      <Box w={'full'} p={5} borderWidth='1px' borderRadius='lg'>
        <form onSubmit={handleSubmit(handleSearch)}>
          <HStack mb={2} alignItems="flex-end">
            <FormControl isInvalid={!!errors.initialDate?.type}>
              <FormLabel>Data Inicial</FormLabel>
              <Input
                type={'date'}
                autoFocus
                {...register("initialDate", { required: true, })}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.finalDate?.type}>
              <FormLabel>Data Final</FormLabel>
              <Input
                type={'date'}
                {...register("finalDate", { required: true })}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.dateType?.type}>
              <FormLabel mb={0}>Selecione o tipo da data</FormLabel>
              <Select
                defaultValue={'Alta'}
                {...register("dateType", { required: 'FILTER_DATETYPE_NOT_SELECTED' })}
              >
                <option value="Alta">Alta</option>
                <option value="Internação">Internação</option>
                <option value="Cadastro">Cadastro</option>
                <option value="Cadastro da Alta">Cadastro da Alta</option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              <SearchIcon />
            </Button>
          </HStack>

        </form>

        <Stack>
          {errors.initialDate && <Text color={'red'} align={'center'}>{translateMessage(errors.initialDate.message)}</Text>}
          {errors.dateType && <Text color={'red'} align={'center'}>{translateMessage(errors.dateType.message)}</Text>}
        </Stack>
      </Box>
    </>
  );
}

export default DrgFilter;