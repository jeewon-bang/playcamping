import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeMoneyString } from "../../lib/utils";
import { StoredReservation } from "../../types/reservation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IProps {
  reservations: StoredReservation[];
  roomPrice: string;
}

// eslint-disable-next-line react/prop-types
const CustomizedTables: React.FC<IProps> = ({ reservations, roomPrice }) => {
  const header = [
    "예약일자",
    "예약자",
    "이메일",
    "이용기간",
    "인원",
    "이용금액",
  ];
  const data = reservations;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">{header[0]}</StyledTableCell>
            <StyledTableCell align="center">{header[1]}</StyledTableCell>
            <StyledTableCell align="center">{header[2]}</StyledTableCell>
            <StyledTableCell align="center">{header[3]}</StyledTableCell>
            <StyledTableCell align="center">{header[4]}</StyledTableCell>
            <StyledTableCell align="center">{header[5]}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((v) => {
            const WhichTableCell = StyledTableCell;
            const days =
              new Date(v.checkOutDate).getDate() -
              new Date(v.checkInDate).getDate();
            return (
              <StyledTableRow key={v}>
                <WhichTableCell align="center">
                  {v.updatedAt.split("T")[0]}
                </WhichTableCell>
                <WhichTableCell align="center">
                  {v.user.lastname}
                  {v.user.firstname}
                </WhichTableCell>
                <WhichTableCell align="center">{v.user.email}</WhichTableCell>
                <WhichTableCell align="center">
                  {v.checkInDate.split("T")[0]} ~ {v.checkOutDate.split("T")[0]}
                </WhichTableCell>
                <WhichTableCell align="center">
                  성인 {v.adultCount}명, 아동 {v.childrenCount}명
                </WhichTableCell>
                <WhichTableCell align="center">
                  {makeMoneyString(String(days * roomPrice))}원
                </WhichTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// CustomizedTables.propTypes = {
//   reservations: PropTypes.any,
//   roomPrice: PropTypes.any,
// };

export default CustomizedTables;
