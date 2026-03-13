import { useState } from 'react'
import headwindIcon from "./assets/headwind_icon.png";
import './App.css'
import { WeatherCard } from "./WeatherCard";
import Header from './Header';

function App() {

  return (
    <Header></Header>
  );

  // const [count, setCount] = useState(0)

  // // Header bar //
  // const navigation = () => {
  //   return (
  //     <div className='header'>
  //       <div className='rectangle'>
  //         <h1>Headwind</h1>
  //       </div>
  //     </div>
  //   )
  // };
  //
  //
  // return (
  //   <div>
  //     {navigation()}
  //     {WeatherCard()}
  //   </div>
  // );
}

export default App
