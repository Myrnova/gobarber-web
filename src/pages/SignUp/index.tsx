import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import {
  FiMail, FiLock, FiUser, FiArrowLeft,
} from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/apiClient';

import { useToast } from '../../hooks/toast';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';
import logoImg from '../../assets/images/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData{
  name: string,
  email: string,
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você ja pode fazer seu logon no GoBarber!',
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
      });
    }
  }, [addToast, history]);
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Faça seu cadastro</h1>
            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
            <Input name="email" type="text" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
