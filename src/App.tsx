import { Scene } from './components/Scene';
import { ConfiguratorUI } from './components/ConfiguratorUI';

function App() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      backgroundColor: '#09090b', 
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      <ConfiguratorUI />
      <Scene />
    </main>
  );
}

export default App;
