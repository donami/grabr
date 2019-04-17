import React from 'react';
import styled, { css } from '../../lib/styledComponents';

const Ctx = React.createContext<any>(null);

const ToastContainer: React.SFC<any> = props => (
  <div style={{ position: 'fixed', right: 0, top: 0 }} {...props} />
);

const Toast: React.SFC<{ onDismiss: any; type?: string }> = ({
  children,
  onDismiss,
  type,
}) => (
  <StyledToast onClick={onDismiss} type={type}>
    {children}
  </StyledToast>
);

const StyledToast = styled.div<{ type?: string }>`
  cursor: pointer;
  font-size: 1em;
  margin: 10px;
  padding: 10px;
  background: #00adde;
  color: #fff;
  border-radius: 5px;

  &:hover {
    opacity: 0.5;
  }

  ${({ type }) => {
    if (type === 'success') {
      return css`
        background: #4cb050;
      `;
    }
    if (type === 'error') {
      return css`
        background: #e51c24;
      `;
    }
    if (type === 'warning') {
      return css`
        background: #ff9700;
      `;
    }
    if (type === 'info') {
      return css`
        background: #00adde;
      `;
    }

    return null;
  }}
`;

let toastCount = 0;

type ToastContent = {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
};

export const ToastProvider: React.SFC<{}> = ({ children }) => {
  const [toasts, setToasts] = React.useState<any>([]);

  const add = (content: ToastContent) => {
    // tslint:disable-next-line: no-increment-decrement
    const id = toastCount++;
    const toast = { content, id };
    setToasts([...toasts, toast]);
  };
  const remove = (id: number) => {
    const newToasts = toasts.filter((t: any) => t.id !== id);
    setToasts(newToasts);
  };
  // avoid creating a new fn on every render
  const onDismiss = (id: number) => () => remove(id);

  return (
    <Ctx.Provider value={{ add, remove }}>
      {children}
      <ToastContainer>
        {toasts.map(({ content, id, ...rest }: any) => (
          <Toast
            key={id}
            Toast={Toast}
            type={content.type || 'success'}
            onDismiss={onDismiss(id)}
            {...rest}
          >
            {content.message}
          </Toast>
        ))}
      </ToastContainer>
    </Ctx.Provider>
  );
};

export const useToasts = () => React.useContext(Ctx);
