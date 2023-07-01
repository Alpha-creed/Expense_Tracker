import styled from "styled-components";
import Nart from './img/Narouto.png';
import { MainLayout } from "./styles/Layout";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import { useState } from "react";
import { useMemo } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expenses from "./Components/Expenses/Expenses";
import Incomes from "./Components/incomes/incomes";
import { useGlobalContext } from "./Components/context/globalContext";

function App() {
  const [ active,setActive] = useState(1);
  
  const global = useGlobalContext()
  console.log(global)

  const displayData = ()=>{
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <Dashboard/>
      case 3:
        return <Incomes/>
        case 4:
        return <Expenses/>
      default:
        <Dashboard/>
    }
  }



  const orbMemo = useMemo(()=>{
    return <Orb/>
  },[])

  return (
    <AppStyled Nart= {Nart}  className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive}/>
        <main>
          {displayData()}
        </main>
       </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height:100vh;
  position:relative;
  main{
    flex:1;
    background:rgba(252,246,249,0.78);
    boder:3px solid #FFFFFF;
    backdrop-filter:blur(4.5px);
    overflow:auto;
    overflow-x:hidden;
    &::-webkit-scrollbar{
      width:0;
    }
  }
`;

export default App;
 