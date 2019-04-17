import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import getCategories, { CategoriesQuery } from '@/queries/getCategories';
// import { Category } from '../../interfaces/models';
import styled from '../../lib/styledComponents';
import Heading from '../ui/heading';
import Loader from '../ui/loader';

// const buildTree = (categories: Category[]) => {
//   const rootCategories = categories.filter(item => item.root === true);

//   const mapChildren = (item: Category) => {
//     const category =
//       find(categories, category => category.id === item.id) || null;

//     if (
//       category &&
//       isArray(category.children) &&
//       category.children.length > 0
//     ) {
//       category.children = (category.children as any)
//         .map(mapChildren)
//         .filter((item: Category) => item !== null);
//     }

//     return category;
//   };

//   return rootCategories
//     .map((item: Category) => {
//       item.children = (item.children as any).map(mapChildren);
//       return item;
//     })
//     .filter(item => item);
// };

const CategoryList: React.SFC<{ childLimit?: number }> = ({ childLimit }) => (
  <Query<CategoriesQuery> query={getCategories} variables={{ root: true }}>
    {({ data, loading }) => {
      if (loading) {
        return <Loader />;
      }

      return (
        <React.Fragment>
          <ListTitle>
            <Heading as="h3">Top Categories</Heading>
          </ListTitle>
          <List>
            {data!.allCategories.map(category => (
              <ListItem key={category.id}>
                <h4>
                  <Link to={`/category/${category.id}`}>{category.title}</Link>
                </h4>

                {category.children && category.children.length > 0 && (
                  <SubCategories>
                    {(category.children || [])
                      .slice(0, childLimit || 999)
                      .map((item, index) => (
                        <Link to={`/category/${item.id}`} key={item.id}>
                          {index < category.children.length - 1
                            ? `${item.title}, `
                            : item.title}
                        </Link>
                      ))}
                  </SubCategories>
                )}
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      );
    }}
  </Query>
);

export default CategoryList;

const List = styled.ul`
  list-style: none;
  h4 {
    font-size: 1rem;
  }

  a {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
  }
`;

const ListTitle = styled.div`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  padding: ${props => props.theme.spacing.normal};
`;

const ListItem = styled.li`
  padding: ${props => props.theme.spacing.normal};
  border-bottom: 1px solid #f1f1f1;

  h4 a:hover {
    color: ${props => props.theme.colors.accent};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SubCategories = styled.div`
  font-size: 0.8rem;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;
