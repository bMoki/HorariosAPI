import LoginContextProvider from "contexts/LoginContext";
import Routes from "Routes";


function App() {

  return (
    <>
      <LoginContextProvider >
        <Routes />
      </LoginContextProvider>
    </>
  );
}

export default App;
