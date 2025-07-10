import Header from './components/Header';
import CardList from './components/CardList';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="card">
        <CardList />
        <button onClick={() => {}}>Error Button</button>
      </div>
    </>
  );
}

export default App;
