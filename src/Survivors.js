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

function fetchSurvivors(e){
  let survivors = [];
  fetch('http://zssn-backend-example.herokuapp.com/api/people.json')
  .then((response) => response.json())
  .then((result) => {
    result.forEach((survivor) => {
      if(!survivor["infected?"]){
        survivors.push(survivor);
      }
    });
    fetchSurvivorsInvetory(survivors, e);
  });
}

function getSurvivorsId(location){
  return location.split("people/")[1];
}

function fetchSurvivorsInvetory(survivorsFetch, e){
  let survivors = survivorsFetch;
  let id;
  let count = 0;
  survivors.forEach((survivor) => {
    id = getSurvivorsId(survivor["location"]);
    fetch(`http://zssn-backend-example.herokuapp.com/api/people/${id}/properties.json`)
      .then((response) => response.json())
      .then((inventory) => {
        let inv = extractSurvivorsInventory(inventory)
        survivors[count]["water"] = inv["water"];
        survivors[count]["food"] = inv["food"];
        survivors[count]["medication"] = inv["medication"];
        survivors[count]["ammunition"] = inv["ammunition"];
        count += 1;
      });
  });
  e.setState({survivors: survivors});
}

function extractSurvivorsInventory(inventory){
  let resouces = {};
  resouces["water"] = 0;
  resouces["food"] = 0;
  resouces["medication"] = 0;
  resouces["ammunition"] = 0;

  inventory.forEach((item) => {
    let name = item["item"]["name"].toLowerCase();
    if(name === "water"){
      resouces["water"] = item["quantity"];
    }
    else if(name === "food"){
      resouces["food"] = item["quantity"];
    }
    else if(name === "medication"){
      resouces["medication"] = item["quantity"];
    }
    else if(name === "ammunition"){
      resouces["ammunition"] = item["quantity"];
    }
  });
  return resouces;
}

class SurvivorsTable extends React.Component{
  constructor(){
    super();
    this.state = {survivors: []}
  }

  componentWillMount(){

  }

  componentDidMount(){
    fetchSurvivors(this);
  }

  render(){
    let rows = [];
    this.state.survivors.forEach((survivor) => {
      console.log(survivor);
      let id = getSurvivorsId(survivor["location"]);
      rows.push(<SurvivorsRow survivor={survivor} key={id} />);
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
