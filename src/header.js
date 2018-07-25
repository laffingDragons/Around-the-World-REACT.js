import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './header.css';

import {allRegions} from './service'
import Region from './region';
import store from "./route/configureStore";
import { Provider } from 'react-redux'; //tm


class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPageIndex : 0,
      countryName : '',
    }
    this.param = this.param.bind(this);
  }
  
  param(name,index){
    const {countryName,currentPageIndex} = this.state;
    this.setState ({ countryName: name,currentPageIndex:index})
  }
  
  render() {
    let  { countryName, currentPageIndex } = this.state;
    return (
      <Provider store={store}>
      <div className="App" >
         <div className="container">
       
         <div className="row">
          <div className="App-header">
            <h1 className="App-title">Around the </h1>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
         </div>
         {
           currentPageIndex == 1
          ?
          <Region countryName={countryName} param={this.param}/>
           : 
           <div className="row">
           {
             allRegions.map((x, i) => {
   
               return(
                 <div className="col-md-6">
                 <div key={i} onClick={()=> this.param(x.name,1)} className="card card-glow">
                   <p style={{ verticalAlign: 'middle'}}></p> {x.name}
                 </div>
                 </div>
               )
   
             })
           }
          </div>
           
         }
        
         </div>
        </div>
        </Provider>
      );
      
       
    
  
    
  }
}

export default Header;



