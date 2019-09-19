import React, {Component} from 'react';
import Users from './components/users';

class App extends Component {
  state = {
    users: [],
    isLoaded: false,
  }

  componentDidMount() {
    fetch('https://localhost:44326/api/user/')
    .then(res => res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items: json,
      })
    });
  }

  render () {

    var{isLoaded,items} = this.state;

    if (!isLoaded){
      return <div>Loading...</div>;
    }
    else{
      return (
        <div className = 'App'>
          <ul>
            {items.map(item=>(
              <li key={item.nickname}>
                Nickname: {item.nickname} | FirstName: {item.firstName}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;