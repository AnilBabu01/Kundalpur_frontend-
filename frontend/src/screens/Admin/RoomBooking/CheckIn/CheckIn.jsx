import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box, Button, useStepperContext } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import CircularProgress from '@mui/material/CircularProgress';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Delete from '../../../../assets/Delete.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CheckinForm from './CheckinForm';
import { Select, MenuItem } from '@mui/material';
import RoomBookingTap from '../RoomBookingTap';
import moment from 'moment';
import Checkoutform from '../RoomShift/Checkoutform';
import './Checkin.css';
const style = {
  position: 'absolute',
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const CheckIn = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [changedata, setchangedata] = useState('');
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const [optionss, setoptionss] = useState('Please select');
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = (data) => {
    setOpen1(true);

    setchangedata(data);
  };

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const getall_donation = () => {
    setloader(true);
    serverInstance('room/checkin', 'get').then((res) => {
      if (res.data) {
        setloader(false);
        // let filterData = res.data.filter((item) => item.modeOfBooking === 1);
        setisData(res.data);
        setisDataDummy(res.data);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'ManualCashReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        'Receipt No': item?.ReceiptNo,
        'Voucher No': item?.voucherNo,
        'Phone No': item?.phoneNo,
        name: item?.name,
        Address: item?.address,
        'Head/Item': item?.elecItemDetails.map((row) => {
          return row.type;
        }),
        Amount: item?.elecItemDetails.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        ),
        remark: item?.elecItemDetails.map((row) => {
          return row.remark;
        }),
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    getall_donation();
    setopendashboard(true);

    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1]);

  const downloadrecept = (row) => {
    navigation('/admin-panel/room/Print/Room/Booking', {
      state: {
        data: row,
      },
    });
  };

  const [bookid, setbookid] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [customername, setcustomername] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [checkintime, setcheckintime] = useState('');
  const [checkoutdate, setcheckoutdate] = useState('');
  const [checkouttime, setcheckouttime] = useState();
  const [roomNo, setroomNo] = useState('');

  const onSearchByOther = (e, type) => {
    if (type === 'bookid') {
      setbookid(e.target.value.toLowerCase());
    }
    if (type === 'mobileno') {
      setmobileno(e.target.value.toLowerCase());
    }
    if (type === 'customername') {
      setcustomername(e.target.value.toLowerCase());
    }
    if (type === 'checkindate') {
      setcheckindate(e.target.value.toLowerCase());
    }
    if (type === 'checkintime') {
      setcheckintime(e.target.value.toLowerCase());
    }
    if (type === 'checkoutdate') {
      setcheckoutdate(e.target.value.toLowerCase());
    }
    if (type === 'checkouttime') {
      setcheckouttime(e.target.value);
    }
    if (type === 'roomNo') {
      setroomNo(e.target.value);
    }
  };

  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.booking_id?.toLowerCase().indexOf(bookid) > -1 &&
        Moment(dt?.date).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        Moment(dt?.coutDate).format('YYYY-MM-DD').indexOf(checkoutdate) > -1 &&
        dt?.name?.toLowerCase().indexOf(customername) > -1,
      // dt?.time?.toLowerCase().indexOf(checkintime) > -1 &&
      // dt?.coutTime?.toLowerCase().indexOf(checkouttime) > -1 &&
    );

    if (roomNo) {
      filtered = filtered?.map((item) => {
        if (item.RoomNo == Number(roomNo)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (mobileno) {
      filtered = filtered?.map((item) => {
        if (item.contactNo == mobileno) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    setisData(filtered);
  }, [
    bookid,
    checkindate,
    checkintime,
    checkoutdate,
    checkouttime,
    roomNo,
    mobileno,
    customername,
  ]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <h2 style={{ marginBottom: '0.5rem' }}>Check In</h2>
                  <Typography variant="body2" color="primary">
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>
              <CheckinForm setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Room Checkout
                  </h2>
                  <Typography
                    style={{ marginLeft: '1rem' }}
                    variant="body2"
                    color="primary"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <Checkoutform setOpen={setOpen1} empdata={changedata} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <RoomBookingTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        {/* <div className="main_amin_gain">
          <div className="main_amin_gain1">Total Guest : 265</div>
          <div className="main_amin_gain2">Total Advance : 112050</div>
          <Select
            id="donation-type"
            required
            sx={{
              width: '280px',
              fontSize: 14,
              '& .MuiSelect-select': {
                // borderColor: !!formerror.donationtype ? 'red' : '',
                padding: '10px 0px 10px 10px',
                background: '#fff',
              },
            }}
            value={optionss}
            name="optionss"
            onChange={(e) => setoptionss(e.target.value)}
          >
            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value="Please select"
            >
              Please select
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={true}
            >
              Currently Stay
            </MenuItem>

            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={false}
            >
              No
            </MenuItem>
          </Select>
        </div> */}

        <div className="search-header-print">
          <div
            className="search-header-print"
            style={{
              borderBottom: '1px  solid gray',
              width: '100%',
              borderTop: ' 1px solid gray',
              paddingTop: '1%',
            }}
          >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  //   onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '0rem' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  //   onClick={() => ExportPdfmanul(isData, 'Report')}
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  //   onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Dharamshala">
              <Button
                onClick={() => handleOepn()}
                className="add_btn_main_dhara"
              >
                + Add
              </Button>
            </Tooltip>
            &nbsp;&nbsp;
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>
                  Booking Id
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('booking_id')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Mobile
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('contactNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Customer Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('holderName')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Checkin Date
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('date')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Checkin Time
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('time')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Checkout Date
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('coutDate')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Checkout Time
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('coutTime')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Room No
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('RoomNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'bookid')}
                    placeholder="Search bookid"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'mobileno')}
                    placeholder="Search  mobileno"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'customername')}
                    placeholder="Search  name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'checkindate')}
                    placeholder="Search  checkin date"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'checkintime')}
                    placeholder="Search checkin time"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'checkoutdate')}
                    placeholder="Search checkout date"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'checkouttime')}
                    placeholder="Search checkout time"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '70px' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'roomNo');
                    }}
                    placeholder="roomNo"
                  />
                </TableCell>
                <TableCell>
                  <button
                    className="chaneRoom"
                    onClick={() => getall_donation()}
                  >
                    Reset
                  </button>
                </TableCell>
              </TableRow>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                    : isData
                  ).map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.booking_id}</TableCell>
                      <TableCell>{row?.contactNo}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        {Moment(row?.date).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>
                        {moment(row?.time, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>
                      <TableCell>
                        {Moment(row?.coutDate).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(row?.coutTime, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>

                      <TableCell> {row?.RoomNo}</TableCell>
                      <TableCell style={{ display: 'flex' }}>
                        <button
                          onClick={() => downloadrecept(row)}
                          className="chaneRoom"
                        >
                          Print
                        </button>
                        <button
                          style={{
                            marginLeft: '1rem',
                            backgroundColor: '#FA7401',
                          }}
                          onClick={() => handleOepn1(row)}
                          className="chaneRoom"
                        >
                          checkout
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50, 100, 250]}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: 'secondary',
                  }}
                  nextIconButtonProps={{ color: 'secondary' }}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'page number',
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CheckIn;
