import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './header.css';
import axios from 'axios';
import { fetchAll } from './service';
import { allRegions } from './service'
import Region from './region';
import Country from "./country";
import store from "./route/configureStore";
import { Provider } from 'react-redux'; //tm
import PropTypes from "prop-types";
import * as appAction from './store/action/appAction';
import { selectedRegion } from "./store/action/appAction";
import { connect } from "react-redux";
import appReducer from './store/reducer/appReducer';

const propTypes = {

  appAction: PropTypes.object
}


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerTitle: 'Around The',

      currentPageIndex: 0,
      countryName: '',
      language:'',
      currency:'',

      allCountries:[],
      countriesLanguages: [],
      uniqueLangCode:[],

      countriesCurrencies: [],
      uniqueCurrencyCode:[],

    }

    this.param = this.param.bind(this);
    this.onSelectLanguage = this.onSelectLanguage.bind(this);
    this.onSelectCurrency = this.onSelectCurrency.bind(this);
    this.pushDataToLanguageArray = this.pushDataToLanguageArray.bind(this);
    this.pushDataToCurrencyArray = this.pushDataToCurrencyArray.bind(this);

  }
  //Life Cycle hooks
  componentDidMount(){

    //make axios req fort lang
    axios.get(`${fetchAll}`)
    .then(res => {

        let data = res.data;
        this.setState({ allCountries: data })
        
    })
    .catch(rej => {
        console.log('Something went wrong in get data for language :', rej);
    })

      this.pushDataToLanguageArray ();
      this.pushDataToCurrencyArray ();
   }

    pushDataToLanguageArray () {
      setTimeout(() => {
        
        //push array into language
        for(let i of this.state.allCountries){

          for(let j of i.languages){

            this.state.countriesLanguages.push(j.iso639_1);
          }
        }
        this.setState({ uniqueLangCode: Array.from(new Set(this.state.countriesLanguages)) })

      }, 2000);

    }

    pushDataToCurrencyArray () {
      setTimeout(() => {
        
        //push array into currency
        for(let i of this.state.allCountries){

          for(let j of i.currencies){

            this.state.countriesCurrencies.push(j.code);
          }
        }
        this.setState({ uniqueCurrencyCode: Array.from(new Set(this.state.countriesCurrencies)) })

      }, 2000);

    }
  
    //function to pass values to next component
  param(name, index) {
    let { headerTitle} = this.state;
    let { param } = this.props;
    this.props.selectedRegion(name);
    this.setState({ countryName: name, currentPageIndex: index, headerTitle: name });
  }

  onSelectLanguage(event){
    
    let { headerTitle} = this.state;
    let { param } = this.props;

    this.setState({ language:event.target.value, currentPageIndex: 1, headerTitle: 'Language' });
  }

  onSelectCurrency(event){
    let { headerTitle} = this.state;
    let { param } = this.props;
    
    this.setState({ currency:event.target.value, currentPageIndex: 1, headerTitle: 'Currency' });

  }

  render() {
    let { countryName, currentPageIndex, headerTitle, uniqueLangCode, uniqueCurrencyCode, language, currency } = this.state;
    return (
      <Provider store={store}>
        <div className="MainContainer" >
        <div class="ParallaxContainer">
          <div className="container">
          <div className="row" style={{ paddingTop:"50px"}}>
              <div className="col-md-3">
                <div className="webflow-style-input" style={{  marginBottom:'10px'}}>
                  <select className="select-style" onChange={this.onSelectLanguage}  >
                  <option value="" disabled selected>Languages</option>
                   {
                       uniqueLangCode.map((x, i)=>{
                       return( <option key={i} className="option-style"  value={x}>{x}</option>)
                       })
                   }
                  </select>
                </div> </div>
              <div className="offset-md-6 col-md-3">
                <div className="webflow-style-input">
                   <select className="select-style" onChange={this.onSelectCurrency}>
                  <option value="" disabled selected>Currencies</option>
                   {
                       uniqueCurrencyCode.map((x, i)=>{
                       return( <option key={i} className="option-style"  value={x}>{x}</option>)
                       })

                   }
                  </select>
                </div></div>
            </div>
            <div className="row">
              <div className="App-header">
                <h1 className="App-title header-title">{headerTitle}</h1>
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            </div>
          </div>
          </div>
          <div className="ContentContainer">
          <div className="container">
          
            
            {
              currentPageIndex == 1
                ?
                <Region countryName={countryName} param={this.param} language={language} currency={currency}/>
                :
                currentPageIndex == 3
                  ?
                  <Country countryName={countryName} param={this.param} />
                  :
                  <div className="row">
                    {
                      allRegions.map((x, i) => {

                        return (
                          <div key={i} className="col-md-6">
                            <div  onClick={() => this.param(x.name, 1)} className="card card-glow">
                              <p style={{ verticalAlign: 'middle' }}></p> {x.name}
                            </div>
                          </div>
                        )

                      })
                    }
                  </div>

            }

          </div>
          </div>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  name: state.appReducer.region
})

export default connect(mapStateToProps, { selectedRegion })(Header)





