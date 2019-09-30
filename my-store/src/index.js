import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Routes from '../src/reducers/routes';

const routing = Routes()
//STORE->GLOBALIZED STATE

//ACTION INCREMENT


ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
