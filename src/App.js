import React, {useEffect, useState} from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     monsters: [],
  //     searchField: ''
  //   };    
  // }

  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');

  // componentDidMount() {    
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => 
  //       this.setState({monsters: users}))
  // }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users))
  }, [])

  const onSearchChange = (event) => {
    setSearchField(event.target.value.toLocaleLowerCase());
  }

  const filteredMonsters = monsters.filter(monster => {
    return monster.name.toLocaleLowerCase().includes(searchField);
  })

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Collection</h1>
      <SearchBox onChangeHandler={onSearchChange} placeholder='search monster' className='monsters-search-box' />
      <CardList monsters={filteredMonsters} />
    </div> 
  )
}

export default App;
