import React from 'react';
import styled from '@/lib/styledComponents';
import Search from '@/components/layout/search';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { Query } from 'react-apollo';
import getCategories from '../../queries/getCategories';

type Props = { className?: string };

const Header: React.SFC<Props> = ({ className }) => {
  return (
    <Wrapper>
      <Top>
        <TopLinks>
          <li>
            <Link to="/">Sign in</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </TopLinks>
      </Top>
      <Main className={className}>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <Navigation className="navigation">
          <Query query={getCategories} variables={{ root: true, limit: 6 }}>
            {({ data: { allCategories }, loading }) => {
              if (loading || !allCategories) {
                return null;
              }

              return (
                <ul>
                  {allCategories.map(item => (
                    <li key={item.id}>
                      <Link to={`/category/${item.id}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              );
            }}
          </Query>
        </Navigation>

        <div className="search-wrapper">
          <Search className="search-field" />
        </div>
      </Main>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  background: #f3f3f3;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.normal};
  padding: 0 ${props => props.theme.spacing.normal};
  color: ${props => props.theme.colors.text};
  background: #fff;

  a {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
  }

  .logo {
    flex: 1;
    margin-right: 50px;

    img {
      max-width: 140px;
    }
  }

  .navigation {
    flex: 4;
  }

  .search-wrapper {
    flex: 2;
    display: flex;
    justify-content: flex-end;

    .search-field {
      max-width: 300px;
    }
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  padding: 0 ${props => props.theme.spacing.normal};
`;

const TopLinks = styled.ul`
  display: flex;
  list-style: none;

  a {
    text-decoration: none;
  }

  li {
    margin-right: ${props => props.theme.spacing.normal};
  }
`;

const Navigation = styled.div`
  a {
    color: ${props => props.theme.colors.brand};
    text-decoration: none;
    font-weight: bold;
    transition: color 300ms ease-in-out;

    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;

    li {
      margin: 0 ${props => props.theme.spacing.normal};
    }
  }
`;
