import { DailyTravelling } from './';

export interface Location {
  country: string;
  provinceOrState: string;
  city: string;
  address: string;
  dailyTravelling?: DailyTravelling;
}
