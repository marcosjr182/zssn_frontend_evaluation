import React from 'react';

class Survivors extends React.Component {
  constructor(){
    super();
    this.state = {survivors: []}
  }

  componentWillMount(){
    getSurvivors(this);
    
  }

  render(){
    let survivors = this.state.survivors
    return(
        <ul className="survivors-list">
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
          <tbody>
            {survivors.map(survivor =>
              <Survivor key={getSurvivorId(survivor["location"])} survivor={survivor} />
            )}
          </tbody>
        </table>
      </ul>
    )
  }
}

function getSurvivors (e){
  return fetch('http://zssn-backend-example.herokuapp.com/api/people.json')
  .then((response) => response.json())
  .then((survivors) => {
    e.setState({survivors})
  })
}

function getSurvivorId(location){
  return location.split("people/")[1]
}


const Survivor = (props) => (
  <tr>
    <td>{props.survivor["name"]}</td>
    <td>{props.survivor["gender"]}</td>
    <td>{props.survivor["age"]}</td>
    <td>{props.survivor["lonlat"]}</td>
    <td>{props.survivor["lonlat"]}</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
    <td>x</td>
  </tr>
)

export default Survivors;
