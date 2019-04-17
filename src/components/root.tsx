// Root entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as React from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faPlusCircle,
  faPlusSquare,
  faEdit,
  faTrash,
  faCut,
  faCaretRight,
  faCaretDown,
  faWindowClose,
  faStar,
  faArrowCircleLeft,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

/* Local */

// Components
import ScrollTop from '@/components/helpers/scrollTop';
import { ModalProvider } from './modal';
import { ToastProvider } from './toasts/toast-manager';

// Global styles
import { GlobalStyles } from '@/global/styles';

// Routes
import routes from '@/data/routes';
import styled from '@/lib/styledComponents';

// ----------------------------------------------------------------------------

library.add(
  faPlusCircle,
  faPlusSquare,
  faPlus,
  faStar,
  faEdit,
  faTrash,
  faExternalLinkAlt,
  faCut,
  faArrowCircleLeft,
  faWindowClose,
  faCaretRight,
  faCaretDown
);

const Root = () => (
  <Wrapper>
    <GlobalStyles />
    <Helmet>
      <title>Grabr.io</title>
    </Helmet>
    <ScrollTop>
      <ToastProvider>
        <ModalProvider>
          <Switch>
            {routes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </ModalProvider>
      </ToastProvider>
    </ScrollTop>
  </Wrapper>
);

export default hot(module)(Root);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  .header {
    height: 100px;
    min-height: 100px;
    max-height: 100px;
  }
  .content {
    display: block;
    flex: 1;
  }
`;
