import React, { useCallback } from 'react';

import { useTransition } from 'react-spring';

import { Container } from './styles';
import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';

interface ToastContainerMessage{
  messages: ToastMessage[]

}

const ToastContainer: React.FC<ToastContainerMessage> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
      },
      enter: {
        right: '0%',
        opacity: 1,
      },
      leave: {
        right: '-120%',
        opacity: 0,
      },
    },
  );

  return (

    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />

      ))}
    </Container>
  );
};
export default ToastContainer;
