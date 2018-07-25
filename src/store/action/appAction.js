import { CURRENT_COUNTRY } from "./../../service";

export const pushCountryData = (countryInfo) => ({ type: CURRENT_COUNTRY, countryInfo });