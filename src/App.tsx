import { Scene } from './components/Scene';
import { ConfiguratorUI } from './components/ConfiguratorUI';
import { UI } from './constants/constants';

function App() {
  return (
    <main className={UI.LAYOUT.MAIN}>
      <ConfiguratorUI />
      <div className={UI.LAYOUT.SCENE_CONTAINER}>
        <Scene />
      </div>
    </main>
  );
}

export default App;
