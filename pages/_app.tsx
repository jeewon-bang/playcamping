import App, { AppProps } from 'next/app';
import axios from '../lib/api';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';
import { cookieStringToObject } from '../lib/utils';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import { reservationActions } from '../store/reservation';
import { getUserReservationAPI } from '../lib/api/reservations';

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

app.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
	const appInitialProps = await App.getInitialProps(context);
	const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
	const { isLogged } = store.getState().user;

	try {
		if (!isLogged && cookieObject.access_token) {
			// 유저 정보 store에 저장
			axios.defaults.headers.cookie = cookieObject.access_token;
			const userRes = await meAPI();
			store.dispatch(userActions.setLoggedUser(userRes.data));
			// 유저의 예약 내역 store에 저장
			// const reservationRes = await getUserReservationAPI(userRes.data.id);
			// store.dispatch(
			// 	reservationActions.setUserReservations(reservationRes.data)
			// );
		}
	} catch (e) {
		console.log(e);
	}

	return { ...appInitialProps };
});

// app.getInitialProps = async (context: AppContext) => {
//   const appInitialProps = await App.getInitialProps(context);
//   const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
//   //   console.log(context.ctx);
//   // 여기에서 로그인 유지 해결해야함
//   const { store } = context.ctx;
//   console.log(store);
//   //   const { isLogged } = store.getState().user;
// try {
//   if (!isLogged && cookieObject.access_token) {
//     axios.defaults.headers.cookie = cookieObject.access_token;
//     const { data } = await meAPI();
//     // console.log(data);
//     store.dispatch(userActions.setLoggedUser(data));
//   }
// } catch (e) {
//   console.log(e);
// }
//
//   return { ...appInitialProps };
// };

export default wrapper.withRedux(app);
