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
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import CircularProgress from '@mui/material/CircularProgress';
import { ExportPdfmanul } from '../../../Admin/compoments/ExportPdf';
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
import RoomShiftForm from './RoomShiftForm';
import Typography from '@mui/material/Typography';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import moment from 'moment';
import './RoomShift.css';
import RoomBookingTap from '../RoomBookingTap';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 3,
  boxShadow: 24,
  borderRadius: '5px',
};

const RoomShift = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const [changedata, setchangedata] = useState('');
  const handleClose = () => setOpen(false);
  const handleOepn = (data) => {
    setOpen(true);
    setchangedata(data);
  };

  const getall_donation = () => {
    setloader(true);
    serverInstance('room/checkin', 'get').then((res) => {
      if (res.data) {
        setloader(false);
        setisData(res.data);
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
  }, [open]);

  const [currentSort, setcurrentSort] = useState('sort');
  const [currentSort1, setcurrentSort1] = useState('sort');
  const [currentSort2, setcurrentSort2] = useState('sort');
  const [currentSort3, setcurrentSort3] = useState('sort');
  const [currentSort4, setcurrentSort4] = useState('sort');
  const [currentSort5, setcurrentSort5] = useState('sort');
  const [currentSort6, setcurrentSort6] = useState('sort');
  const [currentSort7, setcurrentSort7] = useState('sort');
  const [sortField, setSortField] = useState('');
  const onSortChange = (sortField) => {
    let nextSort;

    if (sortField === 'booking_id') {
      if (currentSort === 'caret-down') nextSort = 'caret-up';
      else if (currentSort === 'caret-up') nextSort = 'sort';
      else if (currentSort === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort(nextSort);
    }
    if (sortField === 'contactNo') {
      if (currentSort1 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort1 === 'caret-up') nextSort = 'sort';
      else if (currentSort1 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort1(nextSort);
    }

    if (sortField === 'holderName') {
      if (currentSort2 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort2 === 'caret-up') nextSort = 'sort';
      else if (currentSort2 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort2(nextSort);
    }

    if (sortField === 'date') {
      if (currentSort3 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort3 === 'caret-up') nextSort = 'sort';
      else if (currentSort3 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort3(nextSort);
    }
    if (sortField === 'time') {
      if (currentSort4 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort4 === 'caret-up') nextSort = 'sort';
      else if (currentSort4 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort4(nextSort);
    }
    if (sortField === 'coutDate') {
      if (currentSort5 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort5 === 'caret-up') nextSort = 'sort';
      else if (currentSort5 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort5(nextSort);
    }

    if (sortField === 'coutTime') {
      if (currentSort6 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort6 === 'caret-up') nextSort = 'sort';
      else if (currentSort6 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort6(nextSort);
    }
    if (sortField === 'RoomNo') {
      if (currentSort7 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort7 === 'caret-up') nextSort = 'sort';
      else if (currentSort7 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort7(nextSort);
    }
  };

  useEffect(() => {
    if (sortField === 'booking_id') {
      if (currentSort === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField]?.toLowerCase(),
            fb = b[sortField]?.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField]?.toLowerCase(),
            fb = b[sortField]?.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'contactNo') {
      if (currentSort1 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];

          return fb - fa;
        });
      } else if (currentSort1 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];

          return fa - fb;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'holderName') {
      if (currentSort2 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField]?.toLowerCase(),
            fb = b[sortField]?.toLowerCase();

          return fb - fa;
        });
      } else if (currentSort2 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField]?.toLowerCase(),
            fb = b[sortField]?.toLowerCase();
          return fa - fb;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'date') {
      if (currentSort3 === 'caret-up') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return db - da;
        });
      } else if (currentSort3 === 'caret-down') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return da - db;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'time') {
      if (currentSort4 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort4 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'coutDate') {
      if (currentSort5 === 'caret-up') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return db - da;
        });
      } else if (currentSort5 === 'caret-down') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return da - da;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'coutTime') {
      if (currentSort6 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort6 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'RoomNo') {
      if (currentSort7 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];

          return fb - fa;
        });
      } else if (currentSort7 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          return fa - fb;
        });
      } else {
        // getall_donation();
      }
    }
  }, [
    currentSort,
    currentSort1,
    currentSort2,
    currentSort3,
    currentSort4,
    currentSort5,
    currentSort6,
    currentSort7,
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
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Room Shift
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
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>
              <RoomShiftForm setOpen={setOpen} changedata={changedata} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <RoomBookingTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1.2rem' }}>
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
            {/* <Tooltip title="Add Dharamshala">
              <Button
                onClick={() => handleOepn()}
                className="add_btn_main_dhara"
              >
                + Add
              </Button>
            </Tooltip> */}
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
                <TableCell>
                  S.No <Button>&nbsp;</Button>
                </TableCell>
                <TableCell>
                  Booking Id{' '}
                  <Button onClick={() => onSortChange('booking_id')}>
                    <i class={`fa fa-${currentSort}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Mobile{' '}
                  <Button onClick={() => onSortChange('contactNo')}>
                    <i class={`fa fa-${currentSort1}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Customer Name{' '}
                  <Button onClick={() => onSortChange('holderName')}>
                    <i class={`fa fa-${currentSort2}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Checkin Date{' '}
                  <Button onClick={() => onSortChange('date')}>
                    <i class={`fa fa-${currentSort3}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Checkin Time{' '}
                  <Button onClick={() => onSortChange('time')}>
                    <i class={`fa fa-${currentSort4}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Checkout Date{' '}
                  <Button onClick={() => onSortChange('coutDate')}>
                    <i class={`fa fa-${currentSort5}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Checkout Time{' '}
                  <Button onClick={() => onSortChange('coutTime')}>
                    <i class={`fa fa-${currentSort6}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Room No{' '}
                  <Button onClick={() => onSortChange('RoomNo')}>
                    <i class={`fa fa-${currentSort7}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Action <Button>&nbsp;</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                      <TableCell>{row?.holderName}</TableCell>
                      <TableCell>
                        {Moment(row?.date).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>
                        {moment(row?.time, 'HH:mm').format('hh:mm')}
                      </TableCell>
                      <TableCell>
                        {Moment(row?.coutDate).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>
                        {moment(row?.coutTime, 'HH:mm').format('hh:mm')}
                      </TableCell>

                      <TableCell> {row?.RoomNo}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleOepn(row)}
                          className="chaneRoom"
                        >
                          Change Room
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
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default RoomShift;
