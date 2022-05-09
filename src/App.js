import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/Navbar";

// react-router-dom
import {Routes, Route} from 'react-router-dom';
import Create from "./components/views/Create";
import Home from "./components/views/Home";

function App() {
    return (
        <div className="App">
            <NavigationBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/create' element={<Create/>}/>
                </Routes>
        </div>
    );
}

export default App;
