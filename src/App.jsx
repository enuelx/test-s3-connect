import { Login, Register } from '@components';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '30vw' }}>
      <Login />
      <br />
      <Register />
    </div>
  );
}

export default App;
