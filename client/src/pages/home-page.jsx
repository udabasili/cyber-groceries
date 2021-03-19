import React, { Component } from 'react'
import Header from '../components/header.component';
import About from '../components/about.component';
import BestProduct from '../components/best-prdouct.component';

export default class HomePage extends Component {
    componentDidMount(){
      window.scrollTo({
        top: 0,
        behavior :'auto'
      })
    }
    render() {
        return (
          <div className="home">
            <Header />
            <About />
            <BestProduct />
          </div>
        );
    }
}
