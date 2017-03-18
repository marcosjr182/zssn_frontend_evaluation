import React from 'react';

class Survivors extends React.Component {

  render(){
    return(
      <ul className="survivors-table">
        <SurvivorsTable />
      </ul>
    );
  }
}

function getSurvivors(e){
  return fetch('http://zssn-backend-example.herokuapp.com/api/people.json')
  .then((response) => response.json())
  .then((survivors) => {
    e.setState({survivors})
  });
}

function getSurvivorsId(e){
  let id;
  let survivors = e.state.survivors;
  let count = 0;
  e.state.survivors.map((survivor) => {
    id = survivor["location"].split("people/")[1];
    survivors[count]["id"] = id;
    count += 1;
    return survivors;
  });
}

function getSurvivorsInvetory(e){
  let survivors = e.state.survivors;
  let id;
  let count = 0;
  e.state.survivors.map((survivor) => {
    id = survivor["id"];
    return fetch(`http://zssn-backend-example.herokuapp.com/api/people/${id}/properties.json`)
      .then((response) => response.json())
      .then((inventory) => {
        survivors[count]["inventory"] = inventory;
        count += 1;
      });
  });
}

class SurvivorsTable extends React.Component{
  constructor(){
    super();
    this.state = {survivors: []}
  }

  componentWillMount(){
    getSurvivors(this);
  }

  render(){
    getSurvivorsId(this);
    getSurvivorsInvetory(this);
    let survivors = this.state.survivors;
    let rows = [];
    console.log(survivors);
    survivors.map((survivor) => {
      if(!survivor["infected?"]){
        rows.push(<SurvivorsRow survivor={survivor} key={survivor["id"]} />);
      }
    });

    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Lat</th>
            <th>Long</th>
            <th>Water</th>
            <th>Food</th>
            <th>Meds</th>
            <th>Ammo</th>
            <th colSpan="0"></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SurvivorsRow extends React.Component{
  render(){
    return(
      <tr>
        <td>{this.props.survivor["name"]}</td>
        <td>{this.props.survivor["gender"]}</td>
        <td>{this.props.survivor["age"]}</td>
        <td>{this.props.survivor["lonlat"]}</td>
        <td>{this.props.survivor["water"]}</td>
        <td>{this.props.survivor["food"]}</td>
        <td>{this.props.survivor["medication"]}</td>
        <td>{this.props.survivor["ammunition"]}</td>
      </tr>
    );
  }
}
export default Survivors;
