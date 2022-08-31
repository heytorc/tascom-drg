import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack
} from '@chakra-ui/react';
import InputMask from "react-input-mask";

import { IFormFilterProps } from "@/commons/interfaces/drg/IFormFilterProps";

import { useDrg } from '@/commons/contexts/drg.context';

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

  const [dateType, setDateType] = useState<string>();

  const handleDateType = (value: string | string[]) => {
    if (typeof value === 'string') {
      setDateType(value);
    }
  };

  const handleSearch: SubmitHandler<IFormFilterProps> = async (data) => {
    const params = { ...data, dateType };

    console.log(params);

    await searchData(params)
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <HStack mb={2} alignItems="flex-end">
        <FormControl isInvalid={!!errors.initialDate?.type}>
          <FormLabel>Data Inicial</FormLabel>
          <Input
            as={InputMask}
            mask="99/99/9999"
            {...register("initialDate", { required: true })}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.finalDate?.type}>
          <FormLabel>Data Final</FormLabel>
          <Input
            as={InputMask}
            mask="99/99/9999"
            {...register("finalDate", { required: true })}
          />
        </FormControl>

        <Stack>
          <FormLabel mb={0}>Selecione o tipo da data</FormLabel>
          <Menu closeOnSelect>
            <MenuButton as={Button} w={'15rem'}>
              {dateType ?? 'Nenhum tipo selecionado'}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue="asc"
                title="Tipo da data"
                type="radio"
                onChange={handleDateType}
              >
                <MenuItemOption isChecked={dateType === "Alta"} value="Alta">Alta</MenuItemOption>
                <MenuItemOption isChecked={dateType === "Internação"} value="Internação">Internação</MenuItemOption>
                <MenuItemOption isChecked={dateType === "Cadastro"} value="Cadastro">Cadastro</MenuItemOption>
                <MenuItemOption isChecked={dateType === "Cadastro da Alta"} value="Cadastro da Alta">Cadastro da Alta</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Stack>

        <Button
          type="submit"
          isLoading={isSubmitting}
          colorScheme="purple"
        >
          Buscar
        </Button>
      </HStack>

    </form>
  );
}

export default DrgFilter;