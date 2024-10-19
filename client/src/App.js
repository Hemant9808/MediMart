import './App.css';
import Routes from './Routes';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./Redux/cartSlice/cartSlice";
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCart())
   },[])
  
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
