
//import logo from './logo.svg';
//import './App.css';

import React, { Component } from 'react'

class App extends Component {
  
  async componentDidMount() {
    await fetch('http://localhost:5000/api/courses')
    .then(response =>
    (response.json(),
     console.log(response)))
    
    // return (
    //   <div>
        
    //   </div>
    // )
  }
render() {
  return(
    <p>Hello, world!</p>
  )
}

}

/*
then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
*/

export default App
 // when path is root route, render Courses component 
 // next, route for Course Details

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;
