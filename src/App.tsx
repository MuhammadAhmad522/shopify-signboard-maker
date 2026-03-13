import { Scene } from './components/Scene';
import { ConfiguratorUI } from './components/ConfiguratorUI';

function App() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#09090b', 
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      <ConfiguratorUI />
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Scene />
      </div>
    </main>
  );
}

export default App;
