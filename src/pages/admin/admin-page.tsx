import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Switch, Route, Link, RouteComponentProps } from 'react-router-dom';
import Heading from '@/components/ui/heading';
import DefaultLayout from '@/components/layout/default-layout';
import runFetchers from '@/mutations/runFetchers';
import AdminCategory from './pages/admin-category';
import AdminProduct from './pages/admin-product';
import AdminFetchers from './pages/admin-fetchers';
import styled from '../../lib/styledComponents';
import { useToasts } from '../../components/toasts/toast-manager';
import Button from '../../components/ui/button';
import AdminBack from './components/admin-back';
import AdminSites from './pages/admin-sites';
import AdminSite from './pages/admin-site';

const AdminPage: React.SFC<RouteComponentProps<{ page: string }>> = ({
  match: { params },
}) => {
  const { add } = useToasts();

  return (
    <DefaultLayout>
      <Heading>Dashboard</Heading>

      {params.page && <AdminBack />}

      <Wrapper>
        <Left>
          <Switch>
            <Route path="/admin/categories" component={AdminCategory} />
            <Route path="/admin/products" component={AdminProduct} />
            <Route path="/admin/fetchers" component={AdminFetchers} />
            <Route path="/admin/site/:id" component={AdminSite} />
            <Route path="/admin/sites" component={AdminSites} />
            <Route
              render={() => {
                return (
                  <Fragment>
                    <AdminNavigation>
                      <Link className="admin-nav-item" to="/admin/categories">
                        Manage categories
                      </Link>
                      <Link className="admin-nav-item" to="/admin/products">
                        Manage products
                      </Link>
                      <Link className="admin-nav-item" to="/admin/fetchers">
                        Manage fetchers
                      </Link>
                      <Link className="admin-nav-item" to="/admin/sites">
                        Manage sites
                      </Link>
                    </AdminNavigation>

                    <Stats>
                      <InfoBox>
                        <div>Total Sites</div>
                        <span>47</span>
                      </InfoBox>
                      <InfoBox>
                        <div>Total Categories</div>
                        <span>32</span>
                      </InfoBox>
                      <InfoBox>
                        <div>Total Products</div>
                        <span>1123</span>
                      </InfoBox>
                    </Stats>
                  </Fragment>
                );
              }}
            />
          </Switch>
        </Left>

        <Right>
          <Mutation mutation={runFetchers}>
            {(mutate, { loading }) => (
              <React.Fragment>
                <Heading>Update database</Heading>

                <Button
                  type="button"
                  disabled={loading}
                  onClick={async () => {
                    await mutate();
                    // setMessage('Ran all fetchers successfully');
                    add({
                      message: 'Ran all fetchers successfully.',
                      type: 'success',
                    });
                  }}
                >
                  {loading ? 'Fetching...' : 'Run fetcher for all listings'}
                </Button>
              </React.Fragment>
            )}
          </Mutation>
        </Right>
      </Wrapper>
    </DefaultLayout>
  );
};

export default AdminPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: ${props => props.theme.spacing.normal};
`;
const Left = styled.div`
  flex: 2;
  margin-right: ${props => props.theme.spacing.normal};
  overflow-x: auto;
`;
const Right = styled.div`
  flex: 1;
`;

const AdminNavigation = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};

  .admin-nav-item {
    display: inline-block;
    margin: 0 ${props => props.theme.spacing.normal};
    padding: ${props => props.theme.spacing.small}
      ${props => props.theme.spacing.normal};
    color: #6c7293;
    text-decoration: none;
    border-radius: ${props => props.theme.radius};
    transition: background-color 200ms ease-in-out;

    &:hover {
      background-color: #f5f5f9;
      color: ${props => props.theme.colors.secondary};
    }

    &:first-child {
      margin: 0;
    }
  }
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    flex: 1;
    max-width: 33%;
    margin: 0 ${props => props.theme.spacing.normal};
    box-sizing: border-box;

    &:first-child {
      margin-left: 0;
    }

    @media screen and (max-width: 700px) {
      min-width: 100%;
      margin: 0;
      margin-bottom: ${props => props.theme.spacing.normal};
    }
  }
`;

const InfoBox = styled.div`
  padding: ${props => props.theme.spacing.small}
    ${props => props.theme.spacing.normal};
  border: #eee 1px solid;
  border-radius: ${props => props.theme.radius};
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    font-size: 1rem;
  }
`;
