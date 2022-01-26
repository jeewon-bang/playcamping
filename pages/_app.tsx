import App, { AppContext, AppProps } from 'next/app';
import axios from '../lib/api';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';
import { cookieStringToObject } from '../lib/utils';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

const app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle />
			<Header />
			<Component {...pageProps} />
			<div id='root-modal' />
		</>
	);
};

app.getInitialProps = async (context: AppContext) => {
	const appInitialProps = await App.getInitialProps(context);
	// 	const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

	console.log('_app.tsx');
	console.log(context);
	// const { store } = context.ctx;

	// console.log('store????');
	// console.log(store);

	// const { isLogged } = store.getState().user;

	// try {
	// 	if (!isLogged && cookieObject.access_token) {
	// 		axios.defaults.headers.cookie = cookieObject.access_token;
	// 		const { data } = await meAPI();
	// 		console.log(data);
	// 		store.dispatch(userActions.setLoggedUser(data));
	// 	}
	// } catch (e) {
	// 	console.log(e);
	// }
	return { ...appInitialProps };
};

export default wrapper.withRedux(app);
