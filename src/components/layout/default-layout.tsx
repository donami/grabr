import React from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import styled from '@/lib/styledComponents';

type Props = {};

const Layout: React.SFC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header className="header" />
      <Content className="content">{children}</Content>
      <Footer className="footer" />
    </React.Fragment>
  );
};

export default Layout;

const Content = styled.div`
  padding: ${props => props.theme.spacing.normal};
  background-color: #f3f3f3;
`;
