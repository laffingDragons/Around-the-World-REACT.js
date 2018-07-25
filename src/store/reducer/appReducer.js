import { CURRENT_COUNTRY } from "./../../service";

const intialState = {

    countryInfo: [],

} 

export default function(state = intialState, action){


    switch(action.type){
        case CURRENT_COUNTRY:
        state.countryInfo = action.countryInfo
        return state;

        default:
        return state;
    }

}

