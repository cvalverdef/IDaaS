// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from "./components/Footer"; 

const App = () => (
  <div className="bg-background min-h-screen flex flex-col">
    <Navbar />
        <main className="flex-grow p-8">
      <h1 className="text-primary text-2xl">Welcome to IDaaS</h1>
    </main>
    <Footer />
  </div>
);

export default App;
