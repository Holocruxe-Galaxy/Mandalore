import { DailyTravelling } from './';

export interface Location {
  country: string;
  provinceOrState: string;
  city: string;
  address: string;
  language: string;
  dailyTravelling?: DailyTravelling;
}
