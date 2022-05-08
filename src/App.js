import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import RequireAuth from './components/RequireAuth/RequireAuth';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Update from './components/Update/Update';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import NotFound from './components/NotFound/NotFound';
import Blogs from './components/Blogs/Blogs';
import ManageInventories from './components/ManageInventories/ManageInventories';
import AddBook from './components/AddBook/AddBook';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/inventory/:id' element={
          <RequireAuth>
            <Update></Update>
          </RequireAuth>
        }></Route>
        <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
        <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
        <Route path='/terms-and-conditions' element={<TermsAndConditions></TermsAndConditions>}></Route>
        <Route path='/manage-inventories' element={
          <RequireAuth>
            <ManageInventories></ManageInventories>
          </RequireAuth>
        }></Route>
        <Route path='/inventory/add-book' element={
          <RequireAuth>
            <AddBook></AddBook>
          </RequireAuth>
        }></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;