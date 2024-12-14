

import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
