interface FilterOption {
  ID: number;
  FilterID: number;
  OptionValue: string;
}

export interface IFilterDetails {
  ID: number;
  Name: string;
  FilterType: string;
  Options?: FilterOption[] | null;
}

export interface IFilterResponse {
  Category: string;
  Filters: FilterDetails[];
}

export interface ISpecs {
  FilterName: string
  FilterType: string
  FilterValue: string
}