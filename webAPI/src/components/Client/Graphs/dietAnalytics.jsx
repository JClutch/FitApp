import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import c3 from 'c3';

class DietAnalytics extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id: this.props.id,
        chartType: ['BodyComp', 'BodyFat%', 'Weight'],
        selected: 'Macro Breakdown'
      }
      this.testChange = this.testChange.bind(this)
      this.updateMacro = this.updateMacro.bind(this)
      this.updateWeight = this.updateWeight.bind(this)
  }
//WILL NEED TO ADD MORE GRAPHS HERE
  componentDidMount () {
    this.updateMacro()
  }

  testChange(e){
  	console.log(e.target.value)
  	if(e.target.value === 'Caloric'){
  		this.updateBodyFatPer()
  	} else if(e.target.value === 'Macro'){
  		this.updateMacro()
  	} else{
  		return null
  	}
  	this.setState({
  		selected : e.target.value
  	})
  }

  updateMacro(){
var chart = c3.generate({
  bindto:'#chart',
    data: {
        // iris data from R
        columns: [
            ['Protein', 30],
            ['Carbs', 120],
            ['Fats', 100]
        ],
        type : 'pie'
        // onclick: function (d, i) { console.log("onclick", d.value, i); },
        // onmouseover: function (d, i) { console.log("onmouseover", d.value, i); },
        // onmouseout: function (d, i) { console.log("onmouseout", d.value, i); }
    }
});
  }

  updateWeight(){
  	var chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
            ['x', 1, 7, 14, 21, 28, 35],
            ['Lbs', 185, 180, 177, 176, 172, 165],
        ]
    }
});
  }

  updateGraphBodyComp() {
    var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            ['x', 1, 7, 14, 21, 28, 35],
            ['FatMass', 30, 27, 25, 24, 22, 20],
            ['LeanMass', 165, 166, 170, 173, 178, 182]
        ],
        types: {
          FatMass: 'area',
          LeanMass: 'area'
          // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [['FatMass', 'LeanMass']]
    }
});
  }

  render() {
    return(
    <div className='container'>
    <select className='form-control' onChange={this.testChange}>
      <option value="Macro">Macro Breakdown</option>
      <option value="Caloric">Caloric Intake</option>
    </select>
      <div style={{padding:'25px', backgroundColor:'rgba(0,0,0,.3)'}}>
        <h1 style={{color:'white', textAlign:'center', fontFamily: 'Sans-Serif'}}> {this.state.selected} </h1>
        <div id='chart' style={{backgroundColor:'rgba(256,256,256,.7)', fontFamily: 'Sans-Serif', color:'white'}}> </div>
      </div>
    </div>
    )
  }


}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.example.user
  };
};

export default withRouter(connect(
  mapStoreToProps
)(DietAnalytics));