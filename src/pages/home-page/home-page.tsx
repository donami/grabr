import * as React from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import Sidebar from '@/components/layout/sidebar';
import styled from '@/lib/styledComponents';
import { Query } from 'react-apollo';
import getProducts from '../../queries/getProducts';
import ProductList from '../../components/products/product-list';
import Heading from '../../components/ui/heading';
import Content from '../../components/ui/content';
import Loader from '../../components/ui/loader';

interface State {
  dynamic: React.SFC | null;
}

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
class HomePage extends React.PureComponent<{}, State> {
  public state = {
    dynamic: null,
  };

  // public componentDidMount = async () => {
  //   // Fetch the component dynamically
  //   const dynamic = await import('./dynamic');

  //   // ... and keep ahold of it locally
  //   this.setState({
  //     dynamic: dynamic.default,
  //   });
  // };

  public render() {
    // const DynamicComponent = this.state.dynamic || (() => <h2>Loading...</h2>);

    return (
      <DefaultLayout>
        <Wrapper>
          <Left>
            <Sidebar />
          </Left>
          <Right>
            <Content>
              <Heading as="h1" divided brand>
                Welcome!
              </Heading>
              <Query query={getProducts}>
                {({ data, loading }) => {
                  if (loading) {
                    return <Loader />;
                  }

                  return (
                    <ProductList
                      categorized
                      products={data.allProducts || []}
                    />
                  );
                }}
              </Query>
            </Content>
          </Right>
        </Wrapper>
      </DefaultLayout>
    );
  }
}

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;

const Left = styled.div`
  flex: 1;
  flex-basis: 30%;
  min-width: 200px;
  max-width: 200px;
  background-color: #fff;
  /* border: 1px solid; */
  /* border-color: rgba(255, 255, 255, 0.1); */
  border-radius: 4px;
  margin-right: ${props => props.theme.spacing.huge};
`;

const Right = styled.div`
  flex: 3;
  flex-basis: 70%;
  max-width: calc(100% - 200px - ${props => props.theme.spacing.huge} - 2px);
  margin-left: ${props => props.theme.spacing.normal};

  h1 {
    margin-bottom: ${props => props.theme.spacing.huge};
  }
`;
