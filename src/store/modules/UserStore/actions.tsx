/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import { UserLogin, UserSignup, UserAddress } from '../../../models/userAction';
import api from '../../../services/api';

export const login = (
  { email, password }: UserLogin,
  history: any,
) => async () => {
  try {
    const body = {
      email,
      password,
    };

    const response = await axios.post(
      `https://us-central1-missao-newton.cloudfunctions.net/FourFoodA/login`,
      body,
    );

    localStorage.setItem('token', response.data.token);

    response.data.user.hasAddress
      ? history.replace('/home')
      : history.replace('/signup/address');
  } catch (err) {
    alert('Ocorreu um erro inesperado, tente novamente!');
    console.log(err.message);
  }
};

export const signup = (
  { name, email, cpf, password }: UserSignup,
  history: any,
) => async () => {
  try {
    const body = {
      name,
      email,
      cpf,
      password,
    };

    const response = await axios.post(
      `https://us-central1-missao-newton.cloudfunctions.net/FourFoodA/signup`,
      body,
    );

    localStorage.setItem('token', response.data.token);
    alert('Usuário cadastrado com sucesso!');

    history.replace('/signup/address');
  } catch (err) {
    alert('Ocorreu um erro inesperado, tente novamente!');
  }
};

export const addAddress = (body: UserAddress, history: any) => async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(
      `https://us-central1-missao-newton.cloudfunctions.net/FourFoodA/address`,
      body,
      {
        headers: {
          auth: token,
        },
      },
    );

    localStorage.setItem('token', response.data.token);
    history.replace('/home');
  } catch (err) {
    alert('Ocorreu um erro inesperado, tente novamente!');
  }
};
