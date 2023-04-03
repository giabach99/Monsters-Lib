import React from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import {connect} from 'react-redux';
import {setSearchField, requestMonsters} from './actions';

const mapStatetoProps = state => {
  return {
    searchField: state.searchMonsters.searchField,
    monsters: state.requestMonsters.monsters,
    isPending: state.requestMonsters.isPending,
    error: state.requestMonsters.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestMonsters: () => dispatch(requestMonsters())
  }
}

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     monsters: [],
  //     // searchField: ''
  //   };    
  // }

  // const [monsters, setMonsters] = useState([]);
  // const [searchField, setSearchField] = useState('');

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(users => 
    //     this.setState({monsters: users}))
    this.props.onRequestMonsters();
  }

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => setMonsters(users))
  // }, [])

  // onSearchChange = (event) => {
  //   this.setState({searchField: event.target.value.toLocaleLowerCase()});
  // }

  render() {

    const {searchField, onSearchChange, isPending, monsters} = this.props;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    return isPending ?
      <h1>Loading...</h1> :
      (
        <div className='App'>
          <h1 className='app-title'>Monsters Collection</h1>
          <SearchBox onChangeHandler={onSearchChange} placeholder='search monster' className='monsters-search-box' />
          <CardList monsters={filteredMonsters} />
        </div> 
      )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);
