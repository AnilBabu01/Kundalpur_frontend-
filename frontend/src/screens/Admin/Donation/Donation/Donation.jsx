import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Moment from 'moment-js';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Request from './Request';
import ElectronicDonation from './ElectronicDonation/ElectronicDonation';
import CashDonation from './CashDonation';
import ItemDonation from './ItemDonation';
import ChequeDonation from './ChequeDonation';
import UnderlinedTab from './common/UnderlinedTab';
import DownloadIcon from '@mui/icons-material/Download';
import DonationSuccessfull from './DonationSuccessfull';
import ClearIcon from '@mui/icons-material/Clear';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import CircularProgress from '@mui/material/CircularProgress';
import ElectronicTotal from '../../compoments/ElectronicTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintElectronic from '../../compoments/PrintElectronic';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import { ExportPdfmanul } from '../../compoments/ExportPdf';
import './Donation.css';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  color: '#FDC99C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  left: '11px',
  bottom: '0px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '17px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};

const style5 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,

  boxShadow: 24,
  borderRadius: '15px',
};
const style2 = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const donationColorTheme = {
  cash: '#48a828',
  electronic: '#e96d00',
  cheque: '#1C82AD',
  item: '#d6cb00',
};

const Donation = ({ setopendashboard }) => {
  let filterData;
  const [empid, setempid] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [roleid, setroleid] = useState('');
  const [emplist, setemplist] = useState('');
  const [isData, setisData] = React.useState([]);
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);
  const [donationTypes, setDonationTypes] = useState([]);
  const [rowData, setrowData] = useState('');
  const [open4, setOpen4] = useState(false);
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const [voucherno, setVoucherno] = useState('');
  const [date, setDate] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [type, setType] = useState('');
  const [userType, setUserType] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  console.log('role name id', emproleid, roleid);
  const handleOpen4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => setOpen4(false);

  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const handleOpen = async () => {
    const role = Number(sessionStorage.getItem('userrole'));
    if (emproleid === 0) {
    } else {
      if (role === 3) {
        serverInstance('user/check-voucher', 'get').then((res) => {
          if (res.status === false) {
            handleOpen3();
          }
          if (res.status === true) {
            if (emproleid && roleid) {
              setOpen(true);
              console.log('chek voucehr res', res);
            }
          }
        });
      }
    }

    if (role === 1) {
      setOpen(true);
    }

    if (emproleid === 0) {
      setOpen(true);
    }
  };

  const handleClose = React.useCallback(() => setOpen(false), []);

  const navigation = useNavigate();

  const ExportToExcel = () => {
    const fileName = 'ElectronicReport';
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
        'Head/Item': item?.elecItemDetails
          ? item?.elecItemDetails.map((row) => {
              return row.type;
            })
          : item?.type,
        Amount: item?.elecItemDetails
          ? item?.elecItemDetails.reduce(
              (n, { amount }) => parseFloat(n) + parseFloat(amount),
              0,
            )
          : item?.Amount,
        remark: item?.elecItemDetails
          ? item?.elecItemDetails.map((row) => {
              return row.remark;
            })
          : item?.remark,
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };

  const getall_donation = () => {
    setdatefrom('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    setsearchvalue('');
    serverInstance('user/add-elecDonation', 'get').then((res) => {
      if (res.status) {
        if (emproleid === 7) {
          filterData = res.data.filter(
            (item) =>
              item.isActive === true &&
              item.modeOfDonation === '1' &&
              item.created_by === empid,
          );
        } else {
          filterData = res.data.filter((item) => item.isActive === true);
        }
        setisData(filterData);
        setisDataDummy(filterData);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
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

  const printreceipt = (row) => {
    if (row.active === '0') {
    } else {
      navigation('/reciept', {
        state: {
          userdata: row,
        },
      });
    }
  };

  const get_donation_tyeps = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=1', 'get')]).then(
        ([res, item]) => {
          if (res.status) {
            setDonationTypes(res.data);
          } else {
            Swal.fire('Error', 'somthing went  wrong', 'error');
          }
        },
      );
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  const filterdata = async () => {
    if (searchvalue) {
      axios.defaults.headers.get[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.get(
        `${backendApiUrl}admin/search-electric?search=${searchvalue}`,
      );

      if (res.data.status) {
        if (emproleid === 7) {
          filterData = res.data.data.filter(
            (item) => item.isActive === true && item.created_by === empid,
          );
        } else {
          filterData = res.data.data.filter((item) => item.isActive === true);
        }
        setisData(filterData);
        setisDataDummy(filterData);
      }
    } else {
      serverInstance(
        `user/searchAllDonation?fromDate=${datefrom}&toDate=${dateto}&fromVoucher=${voucherfrom}&toVoucher=${voucherto}',
        'get`,
      ).then((res) => {
        if (res.data) {
          if (emproleid === 7) {
            filterData = res.data.data.filter(
              (item) => item.isActive === true && item.created_by === empid,
            );
          } else {
            filterData = res.data.data.filter((item) => item.isActive === true);
          }
          setisData(filterData);
          setisDataDummy(filterData);
        }
      });
    }
  };
  const getallemp_list = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setemplist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  useEffect(() => {
    getallemp_list();
    getall_donation();
    setopendashboard(true);

    get_donation_tyeps();

    const role = Number(sessionStorage.getItem('userrole'));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
    setroleid(Number(sessionStorage.getItem('userrole')));
    setempid(Number(sessionStorage.getItem('empid')));
    if (emproleid === 0) {
    } else {
      if (role === 3) {
        try {
          serverInstance('user/check-voucher', 'get').then((res) => {
            if (res.status === false) {
              handleOpen3();
              setOpen(false);
            }
          });
        } catch (error) {}
      }
    }
  }, [open, empid]);
  let tabs = [];

  {
    roleid === 3 && emproleid === 7 ? (
      <>
        {tabs.push({
          label: 'Electronic Donation',
          component: (
            <ElectronicDonation
              handleClose={handleClose}
              themeColor={donationColorTheme.electronic}
              handleOpen4={handleOpen4}
              setopendashboard={setopendashboard}
            />
          ),
        })}
      </>
    ) : (
      <>
        {tabs.push(
          {
            label: 'Cash Donation',
            component: (
              <CashDonation
                handleClose={handleClose}
                themeColor={donationColorTheme.cash}
                handleOpen4={handleOpen4}
                getall_donation={getall_donation}
                setopendashboard={setopendashboard}
              />
            ),
          },
          {
            label: 'Electronic Donation',
            component: (
              <ElectronicDonation
                handleClose={handleClose}
                themeColor={donationColorTheme.electronic}
                handleOpen4={handleOpen4}
                setopendashboard={setopendashboard}
              />
            ),
          },
          {
            label: 'Cheque Donation',
            component: (
              <ChequeDonation
                handleClose={handleClose}
                themeColor={donationColorTheme.cheque}
                handleOpen4={handleOpen4}
                setopendashboard={setopendashboard}
              />
            ),
          },
          {
            label: 'Item Donation',
            component: (
              <ItemDonation
                handleClose={handleClose}
                themeColor={donationColorTheme.item}
                handleOpen4={handleOpen4}
                setopendashboard={setopendashboard}
              />
            ),
          },
        )}
      </>
    );
  }

  const onSearchByOther = (e, type) => {
    if (type === 'Date') {
      setDate(e.target.value);
    }
    if (type === 'Voucher') {
      setVoucherno(e.target.value);
    }
    if (type === 'Receipt') {
      setReceiptNo(e.target.value.toLowerCase());
    }
    if (type === 'Phone') {
      setPhone(e.target.value.toLowerCase());
    }
    if (type === 'Name') {
      setName(e.target.value.toLowerCase());
    }
    if (type === 'Address') {
      setAddress(e.target.value.toLowerCase());
    }
    if (type === 'Type') {
      setType(e.target.value);
    }
    if (type === 'Amount') {
      setAmount(e.target.value);
    }
    if (type === 'Remark') {
      setRemark(e.target.value);
    }
    if (type === 'UserType') {
      setUserType(e.target.value.toLowerCase());
    }
  };
  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.ReceiptNo.toLowerCase().indexOf(receiptNo) > -1 &&
        dt?.phoneNo.toLowerCase().indexOf(phone) > -1 &&
        Moment(dt?.donation_date).format('YYYY-MM-DD').indexOf(date) > -1 &&
        dt?.name.toLowerCase().indexOf(name) > -1 &&
        dt?.address.toLowerCase().indexOf(address) > -1 &&
        dt?.createdBy?.toLowerCase()?.indexOf(userType) > -1 &&
        dt?.voucherNo?.toLowerCase()?.indexOf(voucherno) > -1,
    );

    if (type) {
      filtered = filtered?.map((item) => {
        if (item?.elecItemDetails?.find((typ) => typ.type == type)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (amount) {
      filtered = filtered?.map((item) => {
        console.log(
          item.elecItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ),
        );
        if (
          item.elecItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ) == amount
        ) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (remark) {
      filtered = filtered?.map((item) => {
        if (item?.elecItemDetails?.find((typ) => typ.remark == remark)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    setisData(filtered);
  }, [
    phone,
    receiptNo,
    date,
    name,
    address,
    type,
    amount,
    remark,
    userType,
    voucherno,
  ]);

  const [currentSort, setcurrentSort] = useState('sort');
  const [currentSort1, setcurrentSort1] = useState('sort');
  const [currentSort2, setcurrentSort2] = useState('sort');
  const [currentSort3, setcurrentSort3] = useState('sort');
  const [currentSort4, setcurrentSort4] = useState('sort');
  const [currentSort5, setcurrentSort5] = useState('sort');
  const [currentSort6, setcurrentSort6] = useState('sort');
  const [currentSort7, setcurrentSort7] = useState('sort');
  const [currentSort8, setcurrentSort8] = useState('sort');
  const [currentSort9, setcurrentSort9] = useState('sort');
  const [sortField, setSortField] = useState('');
  const onSortChange = (sortField) => {
    let nextSort;

    if (sortField === 'donation_date') {
      if (currentSort === 'caret-down') nextSort = 'caret-up';
      else if (currentSort === 'caret-up') nextSort = 'sort';
      else if (currentSort === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort(nextSort);
    }
    if (sortField === 'ReceiptNo') {
      if (currentSort1 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort1 === 'caret-up') nextSort = 'sort';
      else if (currentSort1 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort1(nextSort);
    }

    if (sortField === 'voucherNo') {
      if (currentSort2 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort2 === 'caret-up') nextSort = 'sort';
      else if (currentSort2 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort2(nextSort);
    }

    if (sortField === 'phoneNo') {
      if (currentSort3 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort3 === 'caret-up') nextSort = 'sort';
      else if (currentSort3 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort3(nextSort);
    }
    if (sortField === 'name') {
      if (currentSort4 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort4 === 'caret-up') nextSort = 'sort';
      else if (currentSort4 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort4(nextSort);
    }
    if (sortField === 'address') {
      if (currentSort5 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort5 === 'caret-up') nextSort = 'sort';
      else if (currentSort5 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort5(nextSort);
    }

    if (sortField === 'type') {
      if (currentSort6 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort6 === 'caret-up') nextSort = 'sort';
      else if (currentSort6 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort6(nextSort);
    }

    if (sortField === 'amount') {
      if (currentSort7 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort7 === 'caret-up') nextSort = 'sort';
      else if (currentSort7 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort7(nextSort);
    }
    if (sortField === 'createdBy') {
      if (currentSort8 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort8 === 'caret-up') nextSort = 'sort';
      else if (currentSort8 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort8(nextSort);
    }
    if (sortField === 'remark') {
      if (currentSort9 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort9 === 'caret-up') nextSort = 'sort';
      else if (currentSort9 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort9(nextSort);
    }
  };

  useEffect(() => {
    if (sortField === 'donation_date') {
      if (currentSort === 'caret-up') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return db - da;
        });
      } else if (currentSort === 'caret-down') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return da - db;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'ReceiptNo') {
      if (currentSort1 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort1 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'voucherNo') {
      if (currentSort2 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort2 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'phoneNo') {
      if (currentSort3 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort3 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'name') {
      if (currentSort4 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

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
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'address') {
      if (currentSort5 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort5 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'type') {
      if (currentSort6 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

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
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'amount') {
      if (currentSort7 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort7 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }
    if (sortField === 'createdBy') {
      if (currentSort5 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort5 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }
    if (sortField === 'remark') {
      if (currentSort9 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort9 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
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
    currentSort8,
    currentSort9,
  ]);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style5}>
            <PrintElectronic isData={isData} handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open4}
        onClose={handleClose4}
        closeAfterTransition
      >
        <Fade in={open4}>
          <Box sx={style}>
            <DonationSuccessfull handleClose={handleClose4} isData={rowData} />
          </Box>
        </Fade>
      </Modal>

      {roleid && (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Fade in={open}>
              <Box
                sx={{
                  ...style,
                  width: {
                    xs: '90%',
                    sm: '70%',
                    md: '70%',
                  },
                }}
              >
                <UnderlinedTab
                  tabs={tabs}
                  handleClose={handleClose}
                  themeColor={donationColorTheme}
                />
              </Box>
            </Fade>
          </Modal>
        </>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
      >
        <Fade in={open3}>
          <Box sx={style2}>
            <div>
              <div className="add-div-close-div1">
                <h2 style={{ textAlign: 'center', marginLeft: '24%' }}>
                  Request Vouchers
                </h2>
                <CloseIcon onClick={() => handleClose3()} />
              </div>
              <Request handleClose={handleClose3} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div>
          <div
            className="search-header "
            style={{ paddingLeft: '1.5%', paddingRight: '1.3rem' }}
          >
            <div className="search-inner-div-reports">
              <div className="Center_main_dic_filetr">
                <label>From Date</label>
                <input
                  style={{ width: '100%' }}
                  type="date"
                  placeholder="From"
                  value={datefrom}
                  name="datefrom"
                  onChange={(e) => {
                    setdatefrom(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label>To Date</label>
                <input
                  style={{ width: '100%' }}
                  type="date"
                  placeholder="From"
                  value={dateto}
                  name="dateto"
                  onChange={(e) => {
                    setdateto(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label>From Voucher</label>
                <input
                  style={{ width: '100%' }}
                  type="text"
                  placeholder="From"
                  value={voucherfrom}
                  name="voucherfrom"
                  onChange={(e) => {
                    setvoucherfrom(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label>To Voucher</label>
                <input
                  style={{ width: '100%' }}
                  type="text"
                  placeholder="From"
                  value={voucherto}
                  name="voucherto"
                  onChange={(e) => {
                    setvoucherto(e.target.value);
                  }}
                />
              </div>

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchvalue}
                    name="searchvalue"
                    onChange={(e) => setsearchvalue(e.target.value)}
                  />
                </Search>
              </div>

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button onClick={() => filterdata()}>Search</button>
              </div>
              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button onClick={() => getall_donation()}>Reset</button>
              </div>
              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button onClick={() => handleOpen()}>+Add</button>
              </div>
            </div>
          </div>

          <div
            className="search-header-print"
            style={{
              paddingRight: '1.5%',
              paddingBottom: '1rem',
              paddingLeft: '1.5%',
            }}
          >
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
                    onClick={() => ExportToExcel()}
                    src={ExportExcel}
                    alt="cc"
                    style={{ width: '30px', marginLeft: '0rem' }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export Pdf File">
                <IconButton>
                  <img
                    onClick={() => ExportPdfmanul(isData, 'Report')}
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
                    onClick={() => handleOpen5()}
                    src={Print}
                    alt=" Print"
                  />
                </IconButton>
              </Tooltip>
              &nbsp;&nbsp;
            </div>
          </div>

          <div className="table-div-maain">
            <Table
              sx={{ minWidth: 650, width: '97%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    Date
                    <Button onClick={() => onSortChange('donation_date')}>
                      <i class={`fa fa-${currentSort}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    ReceiptNo
                    <Button onClick={() => onSortChange('ReceiptNo')}>
                      <i class={`fa fa-${currentSort1}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    VoucherNo
                    <Button onClick={() => onSortChange('voucherNo')}>
                      <i class={`fa fa-${currentSort2}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    Phone No
                    <Button onClick={() => onSortChange('phoneNo')}>
                      <i class={`fa fa-${currentSort3}`} />
                    </Button>
                  </TableCell>
                  <TableCell
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    Name
                    <Button onClick={() => onSortChange('name')}>
                      <i class={`fa fa-${currentSort4}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      Address
                      <Button onClick={() => onSortChange('address')}>
                        <i class={`fa fa-${currentSort5}`} />
                      </Button>
                    </span>
                  </TableCell>
                  <TableCell>
                    Head/Item
                    <Button onClick={() => onSortChange('type')}>
                      <i class={`fa fa-${currentSort6}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    Amount
                    <Button onClick={() => onSortChange('amount')}>
                      <i class={`fa fa-${currentSort7}`} />
                    </Button>
                  </TableCell>
                  <TableCell
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    User
                    <Button onClick={() => onSortChange('createdBy')}>
                      <i class={`fa fa-${currentSort8}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    Remark
                    <Button onClick={() => onSortChange('remark')}>
                      <i class={`fa fa-${currentSort9}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    Action <Button>&nbsp;</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'Date')}
                    placeholder="Search Date"
                  />
                </TableCell>

                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Receipt')}
                    placeholder="Search Receipt"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Voucher')}
                    placeholder="Search Voucher"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Phone')}
                    placeholder="Search Phone"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    className="cuolms_search"
                    onChange={(e) => onSearchByOther(e, 'Name')}
                    placeholder="Name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Address')}
                    placeholder="Search Address"
                  />
                </TableCell>
                <TableCell>
                  <select
                    className="cuolms_search"
                    onChange={(e) => onSearchByOther(e, 'Type')}
                  >
                    <option value="">All Head</option>

                    {donationTypes.map((item, idx) => {
                      return (
                        <option value={item.type_hi}>{item.type_hi}</option>
                      );
                    })}
                  </select>
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Amount')}
                    placeholder="Search Amount"
                  />
                </TableCell>
                <TableCell>
                  <select
                    name="cars"
                    id="cars"
                    className="cuolms_search"
                    onChange={(e) => onSearchByOther(e, 'UserType')}
                  >
                    <option value="">All user</option>
                    {emplist &&
                      emplist.map((item, idx) => {
                        return (
                          <option value={item.Username}>{item.Username}</option>
                        );
                      })}
                  </select>
                </TableCell>

                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    placeholder="Remark"
                    onChange={(e) => onSearchByOther(e, 'Remark')}
                  />
                </TableCell>
                <TableCell>&nbsp;</TableCell>

                {isData ? (
                  <>
                    {(rowsPerPage > 0
                      ? isData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                      : isData.reverse()
                    ).map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>
                          {Moment(row.donation_date).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>{row.ReceiptNo}</TableCell>

                        <TableCell>{row.voucherNo}</TableCell>
                        <TableCell>{row.phoneNo}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell> {row.address}</TableCell>
                        <TableCell>
                          {row.elecItemDetails.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>{row.type}</li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          {row.elecItemDetails.reduce(
                            (n, { amount }) =>
                              parseFloat(n) + parseFloat(amount),
                            0,
                          )}
                        </TableCell>
                        <TableCell>{row?.createdBy}</TableCell>
                        <TableCell>
                          {row.elecItemDetails.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>
                                {row.remark}{' '}
                              </li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          {/* {userrole === 1 && (
                            <EditIcon onClick={() => upadteOpen(row)} />
                          )} */}
                          <Tooltip title="Print Certificate">
                            <img
                              style={{ width: '20px' }}
                              onClick={() =>
                                navigation(
                                  '/admin-panel/reports/printcontent',
                                  {
                                    state: {
                                      data: row,
                                    },
                                  },
                                )
                              }
                              src={Print}
                              alt=" Print"
                            />
                          </Tooltip>

                          <Tooltip title="Download Receipt">
                            {row.isActive ? (
                              <DownloadIcon
                                onClick={() => {
                                  printreceipt(row);
                                }}
                              />
                            ) : (
                              <ClearIcon />
                            )}
                            {/* {userrole === 1 && (
                            <CancelIcon onClick={() => handleOpen(row.id)} />
                          )} */}
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell style={{ fontWeight: 700 }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: 700 }}>
                        <ElectronicTotal data={isData} />
                      </TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={13} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </>
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
                    rowsPerPageOptions={[50, 100, 150]}
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
      </div>
    </>
  );
};

export default Donation;
