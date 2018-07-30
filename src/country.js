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
                <br />
                <div className="container country-info-card" style={{ marginBottom: '25px' }}>
                    <div className="card card-cascade wider reverse my-4">
                        <div className="view overlay hm-white-slight waves-light">
                            <img src={this.props.info.flag} alt="" width="100%" />
                        </div>
                        <div className="card-body text-center" >
                            <p> <b> CAPITAL:</b> {this.props.info.capital} </p>
                            <p> <b>POPULATION:</b> {this.props.info.population} </p>
                            <p><b>AREA:</b> {this.props.info.area} </p>
                            <p><b>REGION:</b> {this.props.info.region} </p>
                            <b>SUBREGION:</b> {this.props.info.subregion}
                            <br />
                            <br />
                            <b style={{ display: 'block' }}>TIMEZONES:</b>
                            {
                                this.props.info.timezones.map((y, i) => {
                                    return (
                                        <div key={i} style={{ display: 'inline' }}>                                    {
                                            i === this.props.info.timezones.length - 1
                                                ?
                                                <div style={{ display: 'inline' }}>
                                                    {y}
                                                </div>
                                                :
                                                <div style={{ display: 'inline' }}>
                                                    {y},
                                                </div>
                                        }

                                        </div>

                                    )
                                })
                            }
                            <br />
                            <br />
                            <b style={{ display: 'block' }}>BORDERS:</b>  {
                                this.props.info.borders.map((y, i) => {
                                    return (
                                        <div key={i} style={{ display: 'inline' }}>                                    {
                                            i === this.props.info.borders.length - 1
                                                ?
                                                <div style={{ display: 'inline' }}>
                                                    {y}
                                                </div>
                                                :
                                                <div style={{ display: 'inline' }}>
                                                    {y},
                                                            </div>
                                        }
                                        </div>

                                    )
                                })
                            }

                            <br />
                            <br />

                            <b style={{ display: 'block' }}>LANGUAGES:</b>
                            {
                                this.props.info.languages.map((y, i) => {
                                    return (
                                        <div key={i} style={{ display: 'inline' }}>                                    {
                                            i === this.props.info.languages.length - 1
                                                ?
                                                <div style={{ display: 'inline' }}>
                                                    {y.name}
                                                </div>
                                                :
                                                <div style={{ display: 'inline' }}>
                                                    {y.name},
                                                </div>
                                        }

                                        </div>

                                    )
                                })
                            }
                            <br />
                            <br />

                            <b style={{ display: 'block' }}>CURRENCIES:</b>
                            {
                                this.props.info.currencies.map((y, i) => {
                                    return (
                                        <div  key={i} style={{ display: 'inline' }}>                                    {
                                            i === this.props.info.currencies.length - 1
                                                ?
                                                <div style={{ display: 'inline' }}>
                                                    {y.name}
                                                </div>
                                                :
                                                <div style={{ display: 'inline' }}>
                                                    {y.name},
                                                </div>
                                        }

                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// getting data from store
const mapStateToProps = state => ({
    info: state.appReducer.countryInfo,
    name: state.appReducer.region
})

export default connect(mapStateToProps, { pushCountryData, selectedRegion })(Country)