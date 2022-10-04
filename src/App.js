import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
      monster: [],
      searchField: ''
    };
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => 
        this.setState(
          () => {
            return {monster: users};
          },
          () => {
            console.log(this.state);
          }
        ))
  }

  render() {
    console.log('render');
    const filteredMonsters = this.state.monster.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    })
    return (
      <div className='App'>
        <input 
          className='search-box'
          type='search'
          placeholder='search monster'
          onChange={(event) => {
            const searchField = event.target.value.toLocaleLowerCase();            
            this.setState(() => {
              return {searchField};
            })
          }}
        />
        {
          filteredMonsters.map(monster => {
            return (
              <div key={monster.id}>
                <h1>{monster.name}</h1>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;
