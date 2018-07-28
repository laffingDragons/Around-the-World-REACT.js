import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchCountries } from './service';
import { fetchLanguages } from './service';
import { fetchCurrency } from './service';
import { pushCountryData } from "./store/action/appAction";
import { connect } from "react-redux";
import './region.css'

const propTypes = {
    countryName: PropTypes.String,
    language: PropTypes.String,
    currency: PropTypes.String,
    param: PropTypes.func,
    appAction: PropTypes.object
}

class Region extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            searchValue:'',
            language:'',
            currency:''
        }
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount() {

        const { countryName, language , currency } = this.props;

            console.log(this.props,'<><><><>', currency);

        if(countryName){

            axios.get(`${fetchCountries}${countryName}`)
                .then(res => {
                    let data = res.data;
                    this.setState({ countries: data })
                })
                .catch(rej => {
                    console.log('Problem with http request in fetching Countries :', rej);
                })
                this.setState({ countryName: countryName});
        }else if(language){
            
            axios.get(`${fetchLanguages}${language}`)
                .then(res => {
                    let data = res.data;
                    this.setState({ countries: data })
                })
                .catch(rej => {
                    console.log('Problem with http request in fetching Language :', rej);
                })
                this.setState({ language: language});
        }else{

            axios.get(`${fetchCurrency}${language}`)
                .then(res => {
                    let data = res.data;
                    this.setState({ countries: data })
                })
                .catch(rej => {
                    console.log('Problem with http request in fetching Curreny :', rej);
                })
                this.setState({ currency: currency})
        }
            
    }

    onBack(index) {
        const { param, countryName } = this.props;
        param('around the', index)
    }

    // function to get value from last component and render countries according to region
    countryInfo(info, index) {

        let { param } = this.props;
        this.props.pushCountryData(info)
        param(info.name, index);

    }

    onChangeValue(e){

        const{searchValue} = this.state;
        this.setState({ searchValue: e.target.value })

    }

    render() {
        let { countries, searchValue } = this.state;
        
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-6">
                    <div className="webflow-style-input">
                        <input className="" type="text" placeholder="Search..." onChange={this.onChangeValue.bind(this)}></input>
                    </div>
                    </div>
                </div>
                <div>
                    <i onClick={() => this.onBack(0)} className="fas fa-arrow-alt-circle-left fa-2x" style={{ color: "#61DAFB" }}></i>
                </div>
                <br />
                <div className="row">
                    {
                        countries.map((x, index) => {
                            return (
                                <div key={index} onClick={() => this.countryInfo(x, 3)} className="col-md-4" style={
                                    x.name.toLowerCase().indexOf(searchValue) !== -1 
                                    ?
                                    { display: 'block'}
                                    :
                                    { display : 'none'}   
                                 }>

                                    <div className="card2 card-glow" >
                                        <img src={x.flag} alt="" width="100%" height="auto" />
                                        <h3 className="overFlow">{x.name}</h3>
                                        <hr />
                                        <p>{x.capital} is Capital </p>
                                        <p>{x.population} people stays here</p>
                                        Currencies :
                                        {
                                            x.currencies.map((y, i) => {
                                                return (
                                                    <div>                                    {
                                                        i === x.currencies.length - 1
                                                            ?
                                                            <div>
                                                                {y.name}
                                                            </div>
                                                            :
                                                            <div>
                                                                {y.name},
                                                            </div>
                                                    }

                                                    </div>

                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })

                    }
                </div>

            </div>

        )
    }
}

const mapStateToProps = state => ({
    info: state.appReducer.countryInfo,
    name: state.appReducer.region      
})

export default connect(mapStateToProps, { pushCountryData })(Region)