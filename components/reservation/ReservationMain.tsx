import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../store';
import ReservationCard from './ReservationCard';

const Container = styled.div`
	width: 100%;
	padding: 0 80px;

	h2 {
		width: 480px;
		margin: 80px 0 60px;
		font-size: 36px;
	}
`;

const ReservationMain: React.FC = () => {
	const reservations = useSelector(
		(state) => state.reservation.userReservations
	);

	return (
		<Container>
			<h2>예약된 캠핑장</h2>
			{reservations.map((v, idx) => (
				<ReservationCard reservation={v} key={idx} />
			))}
		</Container>
	);
};

export default ReservationMain;
