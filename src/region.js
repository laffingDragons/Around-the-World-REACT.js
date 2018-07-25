import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {fetchCountries} from './service';
import axios from 'axios';
import * as appAction from './store/action/appAction';
import  {pushCountryData}  from "./store/action/appAction";
import { connect } from "react-redux";
import appReducer from './store/reducer/appReducer';

const propTypes = {
    countryName: PropTypes.String,
    param: PropTypes.func,
    appAction:PropTypes.object
}

class Region extends Component {

    constructor(props){
        super(props)
        this.state = {
            countries: [],
        }
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount(){
        const { countryName } = this.props;
        let { countries} = this.state;
        axios.get(`${fetchCountries}${countryName}`)
      .then(res => {
          console.log('data :', res.data);
          let data = res.data;
          this.setState ({ countries: data })
      })
      .catch(rej => {
          console.log('rej :', rej);
      })
    }

    onBack(name,index){
        const { param } = this.props;
        param(name,index)
    }

    countryInfo(info, index) {
        let { param } = this.props;
        this.props.pushCountryData(info)
        console.log('this.props :', this.props);
        param('',index);
    }

  render() {
      let {countries} = this.state;
    return (
        <div>
            <div>
                <i onClick={() =>this.onBack('',0)} className="fas fa-arrow-alt-circle-left fa-2x" style={{color: "#61DAFB"}}></i>
            </div>

             <div className="row">
      {
          countries.map((x, index) => {
              return(
                <div key={index} onClick={() =>this.countryInfo(x,3)} className="col-md-4">
                    <div  className="card2 card-glow">
                        <img src={x.flag} alt="" width="100%" height="auto"/>
                       <h3 className="overFlow">{x.name}</h3> 
                        <hr/>
                       <p>{x.capital} is Capital </p> 
                       <p>{x.population} people stays here</p>
                        {
                            x.currencies.map((y, i)=>{
                                return(
                                    <div>                                    {
                                        i == x.currencies.length - 1
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

const  mapStateToProps = state => ({
    info: state.appReducer.countryInfo
})

export default connect (mapStateToProps, { pushCountryData })(Region)