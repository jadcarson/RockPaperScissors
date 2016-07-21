import React from 'react'
import { Link } from 'react-router'
import Menu from './Menu'

import * as db from '../models/menu'

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      accessCode: '',
      username: '',
      view: null, 
    };
  }

render() {
    return (
      <div className="app">
	      <div className="menu">
	      	<Menu />
	      </div>
      </div>
    );
  }
}