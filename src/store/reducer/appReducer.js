import { CURRENT_COUNTRY } from "./../../service";
import { REGION_NAME } from "./../../service";

const intialState = {

    countryInfo: [],
    region: ''

} 

export default function(state = intialState, action){


    switch(action.type){
        case CURRENT_COUNTRY:
        state.countryInfo = action.countryInfo
        return state;

        case REGION_NAME:
        state.region = action.region
        return state;

        default:
        return state;
    }

}

