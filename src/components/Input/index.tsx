import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import Tooltip from '../Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}
// react.componentType pode receber dentro dele os tipos de propriedades que aquele componente pode ter, colocando <Propriedade>
// é possivel importar do react-icons o iconbaseprops que possui todas as propriedades de um icone
// é necessário "transformar" o icon que vem do input para um componente react, colocando : e ele mesmo com letra maiscula
// usado quando quer receber um componente como propriedade,
// nesse caso é um componente de outra biblioteca
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error
      && (
      <Error title={error}>
        <FiAlertCircle color="#c53030" size={20} />
      </Error>
      )}
    </Container>
  );
};
export default Input;
