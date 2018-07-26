import { CURRENT_COUNTRY } from "./../../service";
import { REGION_NAME } from "./../../service";


export const pushCountryData = (countryInfo) => ({ type: CURRENT_COUNTRY, countryInfo });

export const selectedRegion = (region) => ({ type: REGION_NAME, region})