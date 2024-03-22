import { ChakraProvider } from '@chakra-ui/react';
import { Router } from './Routes/Router';
import { GlobalDataProvider } from './context/globalData';

function App() {
  return (
    <GlobalDataProvider>
      <ChakraProvider>
        <Router/>
      </ChakraProvider>
    </GlobalDataProvider>
    
  );
}

export default App;
