export const allRegions = [
    {
        name:'asia',
        index:1,
    }, 
    {
        name:'africa',
        index:2,
    },
    {
        name:'americas',
        index:3,
    },
    {
        name:'europe',
        index:4,
    },
    {
        name:'oceania',
        index:5,
    }
]

// api to get all 
export const fetchAll = `https://restcountries.eu/rest/v2/all`

export const fetchCountries = `https://restcountries.eu/rest/v2/region/`;

export const fetchLanguages = `https://restcountries.eu/rest/v2/lang/`;

export const fetchCurrency = `https://restcountries.eu/rest/v2/currency/`;

export const CURRENT_COUNTRY = 'CURRENT_COUNTRY';

export const REGION_NAME = 'REGION_NAME';