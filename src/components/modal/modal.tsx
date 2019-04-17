import React from 'react';
import { default as ReactModal } from 'react-modal';
import styled from '../../lib/styledComponents';

type Props = {
  hideModal: () => void;
  header?: string;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '60%',
    maxHeight: '80%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

const Modal: React.SFC<Props> = ({ hideModal, header, children }) => {
  return (
    <ReactModal isOpen style={customStyles}>
      <Top>
        {header && <Heading>{header}</Heading>}
        <Close onClick={hideModal}>Close</Close>
      </Top>

      <Content>{children}</Content>
    </ReactModal>
  );
};

export default Modal;

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: ${props => props.theme.colors.light} 1px solid;
  margin-bottom: ${props => props.theme.spacing.normal};
  /* padding-bottom: ${props => props.theme.spacing.normal}; */
  height: 50px;
`;

const Heading = styled.h3`
  text-transform: uppercase;
  flex: 1;
`;

const Close = styled.div`
  cursor: pointer;
  border: #ccc 1px solid;
  padding: 5px 10px;
`;

const Content = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
`;
