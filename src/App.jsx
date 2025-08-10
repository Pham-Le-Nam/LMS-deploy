import Home from "./Home";
import LoginPage from "./login";
import Dashboard from "./Dashboard";
import Print from "./Print";
import BuyPages from "./BuyPages";
import Request from "./Request";
import Profile from "./Profile"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { PageLeftProvider } from "./components/PageLeftContext";
import { PageProvider } from "./components/PageContext";
import { RequestProvider } from "./components/RequestContext";
import { PaymentsProvider } from "./components/PaymentContext";
import { HistoriesProvider } from "./components/HistoriesContext";

function App(){
  return(
    <UserProvider>
    <PageLeftProvider>
    <PageProvider>
    <RequestProvider>
    <PaymentsProvider>
    <HistoriesProvider>
      <Router>
        <Routes>
          <Route path='/request' element={<Request />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/buy-pages' element={<BuyPages />}/>
          <Route path='/print' element={<Print />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </HistoriesProvider>
    </PaymentsProvider>
    </RequestProvider>
    </PageProvider>
    </PageLeftProvider>
    </UserProvider>

  );
} 

export default App
