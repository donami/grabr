export const filterProductsByFilter = (filters: any[], products: Product[]) => {
  if (filters.length === 0) {
    return products;
  }

  const items = (products || []).filter(product => {
    let pass = true;
    filters.forEach((filter: any) => {
      // if product has specified filter
      const exists = product.filters.find(item => item.key === filter.key);

      if (!exists) {
        pass = false;
      } else {
        const values = (exists.values as any)
          .split(',')
          .map((value: string) => value.trim());
        const hasValue = filter.values.reduce((acc: boolean, value: string) => {
          if (values.indexOf(value) > -1) {
            return true;
          }
          return acc;
        }, false);

        if (hasValue === false) {
          pass = false;
        }
      }
    });

    return pass;
  });

  return items;
};

export const formatDate = (timestamp: string) => {
  const date = new Date(+timestamp);
  const formatted = new Intl.DateTimeFormat('en-GB').format(date);

  return formatted;
};
