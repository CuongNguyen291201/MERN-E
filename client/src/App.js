import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import Pages from './components/mainpage/Pages';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/mainpage/utils/scroll/Scroll';
import ScrollComponent from './components/mainpage/utils/scroll/ScrollBtn';

function App() {
  
  return (
    <DataProvider>  
      <Router>
        <div className="App">
          <ScrollToTop />
          <ScrollComponent />
          <Header />
          <Pages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
