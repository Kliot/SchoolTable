import { Dispatch, SetStateAction } from "react";

export interface ThemeProps<T> {
  theme: T;
}

export interface IRatesListContext {
  rates: RateList;
  setRates: Dispatch<SetStateAction<RateList>>;
}

export type SchoolboyList = {
  Items: Schoolboy[];
  Quantity: number;
};

export type Schoolboy = {
  Id: number;
  FirstName: string;
  SecondName: string;
  LastName: string;
  rates?: Rate[];
};

export type LessonsList = {
  Items: Lesson[];
  Quantity: number;
};

export type Lesson = {
  Id: number;
  Title: string;
};

export type RateList = {
  Items: Rate[];
  Quantity: number;
};

export type Rate = {
  Id: number | string;
  Title: string;
  ColumnId: number;
  SchoolboyId: number;
};
