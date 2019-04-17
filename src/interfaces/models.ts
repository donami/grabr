export type Category = {
  id: number;
  title: string;
  products: Product[];
  root: boolean;
  children: Category[];
  filters?: CategoryFilter[];
  parent: number | null;
  trail?: number[];
};

export type CategoryFilter = {
  key: string;
  values: string[];
};

export type Product = {
  id: number;
  title: string;
  image?: string;
  listings?: Listing[];
  cheapestListing?: Listing;
  filters: Filter[];
  category: Category;
  variations?: Product[];
};

export type Listing = {
  id: number;
  url: string;
  price: string;
  site: string;
};

export type Site = {
  id: number;
  title: string;
  url: string;
  fetchers: Fetcher[];
};

export type Fetcher = {
  id: number;
  url: string;
  lastFetched: string | null;
  site: Site;
  category: Category;
};

export type Filter = {
  id: number;
  key: {
    id: number;
    key: string;
  };
  values: {
    id: number;
    value: string;
  }[];
};
