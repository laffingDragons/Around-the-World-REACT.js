import React, { Component } from 'react'
import PropTypes from "prop-types";
import { pushCountryData } from "./store/action/appAction";
import { selectedRegion } from "./store/action/appAction";
import { connect } from "react-redux";
import './country.css'

const propTypes = {
    countryName: PropTypes.String,
    param: PropTypes.func,
    appAction: PropTypes.object
}

class Country extends Component {
    constructor(props) {
        super(props)
        
        this.onBack = this.onBack.bind(this);
    }

    onBack(index) {
        
        const { countryName } = this.props;
        const { param } = this.props;
        param(countryName, index);

    }

    render() {
        return (
            <div>
                <div>
                    <i onClick={() => this.onBack(1)} className="fas fa-arrow-alt-circle-left fa-2x" style={{ color: "#61DAFB" }}></i>
                </div>
                <br/>
                <div className="container country-info-card">
                <div className="card card-cascade wider reverse my-4">
                <div className="view overlay hm-white-slight waves-light">
                <img src={this.props.info.flag} alt="" width="100%"/>
                <a href="#!">
                  <div className="mask rgba-white-slight waves-effect waves-light"></div>
                </a>
                </div>
                <div className="card-body text-center" >
                    CAPITAL: Buenos Aires
                    POPULATION: 43590400
                    AREA: 2780400
                    REGION: Americas
                    SUBREGION: South America
                    TIMEZONES: UTC-03:00
                    BORDERS: BOL , BRA , CHL , PRY , URY
                    LANGUAGES: Spanish , Guaraní
                    CURRENCIES: Argentine peso
                </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    info: state.appReducer.countryInfo,
    name: state.appReducer.region
})

export default connect(mapStateToProps, { pushCountryData, selectedRegion })(Country)