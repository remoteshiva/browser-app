import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import tw from 'twin.macro';
import * as Routes from '../../routes';
import { MenuItem } from './styles';

const LoginButton = styled.button`
  ${tw`text-white font-bold py-2 px-4 rounded`}
  background-color: ${props => props.theme.colors.richGold};
`;

const LoginBar = () => {
  const dispatch = useDispatch();
  return (
    <ul className="flex flex-row">
      <MenuItem>
        <a href="https://www.remoteshiva.org/about">About Us</a>
      </MenuItem>
      <MenuItem>
        <a href="https://www.remoteshiva.org/example-shiva">
          Sample RemoteShiva
        </a>
      </MenuItem>
      <MenuItem>
        <a href="https://www.remoteshiva.org/faq">FAQ</a>
      </MenuItem>
      <MenuItem>
        <a href="https://www.remoteshiva.org/blog">Blog</a>
      </MenuItem>
      <LoginButton onClick={() => dispatch(push(Routes.LOGIN_PAGE))}>
        Log in
      </LoginButton>
    </ul>
  );
};

export default LoginBar;
