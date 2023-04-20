import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Moment from 'moment-js';
import { serverInstance } from '../../../../API/ServerInstance';
import axios from 'axios';
import LoadingSpinner from '../../../../components/Loading/LoadingSpinner';
import { ReactTransliterate } from 'react-transliterate';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import './RoomBookingscreen.css';

const roomCount = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

const Childrencont = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

const malecont = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

const femalecont = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

const custumstyle = {
  width: '100%',
  height: '40px',
  background: '#FFFFFF',
  border: '1px solid #C5BFBF',
  borderRadius: '7px',
  paddingLeft: '0.5rem',
};
export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    border: '2px solid #B8B8B8',
    borderRadius: 6,
    width: '100%',
    fontSize: 15,
    padding: 8,
    paddingLeft: 12,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const statelist = [
  { id: 1, state: 'Andhra Pradesh' },
  { id: 2, state: 'Arunachal Pradesh' },
  { id: 3, state: 'Assam' },
  { id: 4, state: 'Bihar' },
  { id: 5, state: 'Chhattisgarh' },
  { id: 6, state: 'Goa' },
  { id: 7, state: 'Gujarat' },
  { id: 8, state: 'Haryana' },
  { id: 9, state: 'Himachal Pradesh' },
  { id: 10, state: 'Jammu and Kashmir' },
  { id: 11, state: 'Jharkhand' },
  { id: 12, state: 'Karnataka' },
  { id: 13, state: 'Kerala' },
  { id: 14, state: 'Madhya Pradesh' },
  { id: 15, state: 'Maharashtra' },
  { id: 16, state: 'Manipur' },
  { id: 17, state: 'Meghalaya' },
  { id: 18, state: 'Mizoram' },
  { id: 19, state: 'Nagaland' },
  { id: 20, state: 'Odisha' },
  { id: 21, state: 'Punjab' },
  { id: 22, state: 'Rajasthan' },
  { id: 23, state: 'Sikkim' },
  { id: 24, state: 'Tamil Nadu' },
  { id: 25, state: 'Telangana' },
  { id: 26, state: 'Tripura' },
  { id: 27, state: 'Uttar Pradesh' },
  { id: 28, state: 'Uttarakhand' },
  { id: 29, state: 'West Bengal' },
];

const idproff = [
  { id: 1, doc: 'Voter ID' },
  { id: 2, doc: 'Driving Licence' },
  { id: 3, doc: 'Aadhar Card' },
  { id: 4, doc: 'PAN Card' },
  { id: 5, doc: 'Other' },
];
function RoomBookingscreen({ setopendashboard }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [lan, setlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Paymode, setPaymode] = useState('Cash');
  const [formerror, setFormerror] = useState({});
  const [isData, setisData] = useState('');
  const [checkindata, setcheckindata] = useState('');
  const [showdata, setshowdata] = useState(false);
  const [fullname, setfullname] = useState('');
  const [fathers, setfathers] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [idproffname, setidproffname] = useState('');
  const [idproffnumber, setidproffnumber] = useState('');
  const [maleno, setmaleno] = useState(0);
  const [femaleno, setfemaleno] = useState(0);
  const [childrenno, setchildrenno] = useState(0);
  const [roomno, setroomno] = useState(0);
  const [extraMattress, setextraMattress] = useState(0);

  let totalofmattress = extraMattress * 150;
  let totalRoomAmount = roomno * isData?.Rate;
  let alltotalamount = totalRoomAmount + totalofmattress;
  let totalmember = femaleno;
  const data = {
    fullname: fullname,
    email: email,
    mobile: mobile,
    address: address,
    city: city,
    state: state,
    idproffname: idproffname,
    maleno: maleno,
    femaleno: femaleno,
    childrenno: childrenno,
    roomno: roomno,
    extraMattress: extraMattress,
  };

  const showpaymentoption = async () => {
    try {
      setIsLoading(true);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      if (Paymode === 'Online') {
        serverInstance('room/checkin', 'post', {
          date: checkindata.checkintime,
          time: checkindata.checkincurrTime,
          contactNo: mobile,
          name: fullname,
          Fname: fathers,
          email: email,
          address: address,
          city: city,
          state: state,
          proof: idproffname,
          idNumber: idproffnumber,
          male: maleno,
          female: femaleno,
          child: childrenno,
          dharmasala: checkindata.dharamshalaname,
          modeOfBooking: 1,
          RoomNo: isData?.roomNumber,
          coutDate: checkindata.checkouttime,
          coutTime: checkindata.checkoutcurrTime,
          nRoom: roomno,
          extraM: extraMattress,
        }).then((res) => {
          setIsLoading(false);
          // console.log('booking responce', res.data);
          // if (res.data.status === true) {
          //   navigate('admin-panel/room/paymentsuccess', {
          //     state: {
          //       data: res.data,
          //        Paymode: 'UPI',
          //     },
          //   });
          // }
          // if (res.status === true) {
          //   setshowloader(false);
          //   window.location.href =
          //     'https://paymentkundalpur.techjainsupport.co.in/about?order_id=' +
          //     res.data.id;
          //   // handleOpen();
          //   // sendsms();
          //   setonlineId(res.data.id);
          // } else {
          //   Swal.fire('Error!', 'Somthing went wrong!!', 'error');
          // }
        });
      }

      if (Paymode === 'Cash') {
        serverInstance('room/checkin', 'post', {
          date: checkindata.checkintime,
          time: checkindata.checkincurrTime,
          contactNo: mobile,
          name: fullname,
          Fname: fathers,
          email: email,
          address: address,
          city: city,
          state: state,
          proof: idproffname,
          idNumber: idproffnumber,
          male: maleno,
          female: femaleno,
          child: childrenno,
          dharmasala: checkindata.dharamshalaname,
          modeOfBooking: 1,
          RoomNo: isData?.roomNumber,
          coutDate: checkindata.checkouttime,
          coutTime: checkindata.checkoutcurrTime,
          nRoom: roomno,
          extraM: extraMattress,
        }).then((res) => {
          console.log('booking responcesssss', res.data);
          if (res.data && res.data.status === true) {
            setIsLoading(false);
            navigate('/admin-panel/room/paymentsuccess', {
              state: {
                data: res.data,
                Paymode: 'Cash',
              },
            });
          }
          if (res.message) {
            setIsLoading(false);
            Swal.fire('Error!', res.message, 'error');
          }
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleclick = async () => {
    setFormerror(validate());
    if (fullname && mobile && city && state && roomno) {
      setshowdata(true);
    }
  };
  const validate = (values) => {
    const errors = {};

    if (!fullname) {
      errors.name = 'Full name is required';
    }

    if (!mobile) {
      errors.mobile = 'Mobile is required';
    }

    if (!city) {
      errors.city = 'City is required';
    }

    if (!state) {
      errors.state = 'Sate is required';
    }

    if (!roomno) {
      errors.roomno = 'No of rooms is required';
    }

    return errors;
  };
  useEffect(() => {
    if (location.state) {
      setisData(location.state?.roomdata);
      setcheckindata(location.state?.checkindata);
    }
    setopendashboard(true);
  }, []);

  console.log('room data from room booking screens', isData, checkindata);
  return (
    <>
      <div
        style={{
          marginLeft: '5rem',
          marginRight: '1.2rem',
          marginBottom: '5rem',
        }}
      >
        <div
          className="backebj_voucher"
          style={{ marginTop: '4rem', zIndex: '5' }}
        >
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="main_div_head_tyopeeeebook">
          <div className="form_div_absolutebook">
            <h2> Accommodation Details</h2>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                my: 2,
                ml: 2,
              }}
            >
              <Typography variant="body1">Change language:</Typography>
              <Button
                variant={lan ? 'outlined' : 'contained'}
                sx={{
                  borderColor: '#C8C8C8',
                  fontSize: 12,
                  minWidth: 100,
                  padding: 0.5,
                  color: lan ? '#656565' : '#fff',
                }}
                onClick={() => setlan(false)}
              >
                Hindi
              </Button>
              <Button
                onClick={() => setlan(true)}
                variant={lan ? 'contained' : 'outlined'}
                sx={{
                  borderColor: '#C8C8C8',
                  fontSize: 12,
                  minWidth: 100,
                  padding: 0.5,
                  color: lan ? '#fff' : '#656565',
                }}
              >
                English
              </Button>
            </Box>
            <div className="main_details_bro">
              <div>
                <p className="main_details_bro_text"> Dharamshala </p>
                <p className="main_details_bro_text1">{isData?.name}</p>
              </div>
              <div>
                <p className="main_details_bro_text">Room type </p>
                <p className="main_details_bro_text1">
                  {isData &&
                    isData?.category_name.map((element) => <> {element},</>)}
                </p>
              </div>
              <div>
                <p className="main_details_bro_text">Check In </p>
                <p className="main_details_bro_text1">
                  {checkindata &&
                    Moment(new Date(checkindata?.checkintime)).format(
                      'DD-MM-YYYY',
                    )}
                </p>
              </div>
              <div>
                <p className="main_details_bro_text"> Check Out </p>
                <p className="main_details_bro_text1">
                  {checkindata &&
                    Moment(new Date(checkindata?.checkouttime)).format(
                      'DD-MM-YYYY',
                    )}
                </p>
              </div>
              <div>
                <p className="main_details_bro_text">Rooms For</p>
                <p className="main_details_bro_text1">
                  {checkindata?.abcount} Adults , {checkindata?.roomcount} Room
                </p>
              </div>
            </div>

            {showdata ? (
              <>
                <div className="main_show_details_divs">
                  <div className="main_show_details_divs_inear">
                    <h2>Guest Details</h2>
                    <p>
                      Full Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                      &nbsp;&nbsp;
                      <span className="main_show_details_divs_inear_text">
                        {fullname}
                      </span>
                    </p>
                    <p>
                      Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                      <span className="main_show_details_divs_inear_text">
                        {email}
                      </span>
                    </p>
                    <p>
                      Mobile
                      number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                      <span className="main_show_details_divs_inear_text">
                        {mobile}
                      </span>
                    </p>
                    <p>
                      ID
                      Proof&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;:&nbsp;&nbsp;{' '}
                      <span className="main_show_details_divs_inear_text">
                        {idproffname}
                      </span>
                    </p>
                    <p>
                      No of
                      room&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                      <span className="main_show_details_divs_inear_text">
                        {roomno}
                      </span>
                    </p>
                    <p>
                      Total
                      Member&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                      <span className="main_show_details_divs_inear_text">
                        {totalmember}
                      </span>
                    </p>
                  </div>
                  <div className="main_show_details_divs_inear10">
                    <h2>Price Summary</h2>
                    <div className="main_div_test22222">
                      <p>{roomno} Room x 1 Night</p>
                      <p> ₹ {roomno * isData?.Rate} </p>
                    </div>
                    <div className="main_div_test22222">
                      <p>GST</p>
                      <p>₹ 0.00</p>
                    </div>
                    <div className="main_div_test22222">
                      <p>Mattress {extraMattress} x ₹150</p>
                      <p>₹ {extraMattress * 150}</p>
                    </div>
                    <div className="main_div_test22222">
                      <p>Total Amount </p>
                      <p>₹ {alltotalamount}</p>
                    </div>

                    <button
                      className={
                        Paymode === 'Cash'
                          ? 'cash_div_room_book'
                          : 'cash_div_room_book_disable '
                      }
                      onClick={() => setPaymode('Cash')}
                    >
                      Cash
                    </button>

                    <button
                      className={
                        Paymode === 'Online'
                          ? 'online_div_room_book'
                          : 'cash_div_room_book_disable '
                      }
                      onClick={() => setPaymode('Online')}
                    >
                      online
                    </button>
                    <div>
                      <button
                        onClick={() => showpaymentoption()}
                        className="main_div_btn_continues"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <form>
                  <div className="main_book_form_input_div">
                    <div className="main_book_form_input_div_innear">
                      <label htmlFor="mobile">Mobile number</label>
                      <CustomInput
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter mobile"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                      />
                      <p style={{ color: 'red' }}>{formerror.mobile}</p>
                    </div>
                    <div className="main_book_form_input_div_innear">
                      {lan ? (
                        <>
                          <label htmlFor="fullname"> Full Name</label>
                          <CustomInput
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Full name"
                            onChange={(e) => setfullname(e.target.value)}
                            value={fullname}
                          />
                          <p style={{ color: 'red' }}>{formerror.name}</p>
                        </>
                      ) : (
                        <>
                          <label htmlFor="fullname"> Full Name</label>
                          <ReactTransliterate
                            placeholder="Full name"
                            style={custumstyle}
                            id="full-name"
                            required
                            value={fullname}
                            onChangeText={(fullname) => {
                              setfullname(fullname);
                            }}
                            onChange={(e) => setfullname(e.target.value)}
                            lang="hi"
                          />
                          <p style={{ color: 'red' }}>{formerror.name}</p>
                        </>
                      )}
                    </div>
                    <div className="main_book_form_input_div_innear">
                      {lan ? (
                        <>
                          <label htmlFor="fathers">Father's name</label>
                          <CustomInput
                            type="text"
                            id="fathers"
                            name="fathers"
                            placeholder="Enter father's name"
                            value={fathers}
                            onChange={(e) => setfathers(e.target.value)}
                          />
                          <p style={{ color: 'red' }}>{formerror.fathers}</p>
                        </>
                      ) : (
                        <>
                          <label htmlFor="fathers">Father's name</label>
                          <ReactTransliterate
                            placeholder="Enter father's name"
                            style={custumstyle}
                            id="full-name"
                            required
                            value={fathers}
                            onChangeText={(fathers) => {
                              setfathers(fathers);
                            }}
                            onChange={(e) => setfathers(e.target.value)}
                            lang="hi"
                          />
                          <p style={{ color: 'red' }}>{formerror.fathers}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="main_book_form_input_div">
                    <div className="main_book_form_input_div_innear">
                      {lan ? (
                        <>
                          <label htmlFor="address">Address</label>
                          <CustomInput
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                          />
                          <p style={{ color: 'red' }}>{formerror.address}</p>
                        </>
                      ) : (
                        <>
                          <label htmlFor="address">Address</label>
                          <ReactTransliterate
                            placeholder="Enter address"
                            style={custumstyle}
                            id="full-name"
                            required
                            value={address}
                            onChangeText={(address) => {
                              setaddress(address);
                            }}
                            onChange={(e) => setaddress(e.target.value)}
                            lang="hi"
                          />
                          <p style={{ color: 'red' }}>{formerror.address}</p>
                        </>
                      )}
                    </div>
                    <div className="main_book_form_input_div_innear">
                      {lan ? (
                        <>
                          <label htmlFor="city">City</label>
                          <CustomInput
                            type="text"
                            id="city"
                            placeholder="Enter city"
                            name="city"
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                          />
                          <p style={{ color: 'red' }}>{formerror.city}</p>
                        </>
                      ) : (
                        <>
                          <label htmlFor="city">City</label>
                          <ReactTransliterate
                            placeholder="Enter address"
                            style={custumstyle}
                            id="full-name"
                            required
                            value={city}
                            onChangeText={(city) => {
                              setcity(city);
                            }}
                            onChange={(e) => setcity(e.target.value)}
                            lang="hi"
                          />
                          <p style={{ color: 'red' }}>{formerror.city}</p>
                        </>
                      )}
                    </div>
                    <div className="main_book_form_input_div_innear">
                      <label htmlFor="state">State</label>
                      <Select
                        id="state"
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            // borderColor: !!formerror.donationtype ? 'red' : '',
                            padding: '10px 0px 10px 10px',
                            background: '#fff',
                          },
                        }}
                        value={state}
                        name="state"
                        onChange={(e) => setstate(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={''}
                        >
                          Please select
                        </MenuItem>
                        {statelist &&
                          statelist.map((item) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item.state}
                              >
                                {item.state}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <p style={{ color: 'red' }}>{formerror.state}</p>
                    </div>
                  </div>

                  <div className="main_book_form_input_div">
                    <div className="main_book_form_input_div_innear">
                      <label htmlFor="email">Email</label>
                      <CustomInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                      <p style={{ color: 'red' }}>{formerror.email}</p>
                    </div>

                    <div className="main_book_form_input_div_innear10">
                      <div className="inpur_div_room_add">
                        <label htmlFor="city">Male</label>
                        <select
                          name="maleno"
                          value={maleno}
                          onChange={(e) => setmaleno(e.target.value)}
                        >
                          {malecont &&
                            malecont.map((item) => {
                              return (
                                <option
                                  // sx={{
                                  //   fontSize: 14,
                                  // }}
                                  key={item.id}
                                  value={item.type}
                                >
                                  {item.type}
                                </option>
                              );
                            })}
                        </select>
                        {/* <p style={{ color: 'red' }}>{formerror.maleno}</p> */}
                      </div>
                      <div
                        className="inpur_div_room_add"
                        style={{ marginLeft: '13%' }}
                      >
                        <label>Female</label>
                        <select
                          name="femaleno"
                          value={femaleno}
                          onChange={(e) => setfemaleno(e.target.value)}
                        >
                          {femalecont &&
                            femalecont.map((item) => {
                              return (
                                <option key={item.id} value={item.type}>
                                  {item.type}
                                </option>
                              );
                            })}
                        </select>
                        <p style={{ color: 'red' }}>{formerror.femaleno}</p>
                      </div>
                      <div
                        style={{ marginLeft: '13%' }}
                        className="inpur_div_room_add"
                      >
                        <label htmlFor="pincode">Children</label>
                        <select
                          name="childrenno"
                          value={childrenno}
                          onChange={(e) => setchildrenno(e.target.value)}
                        >
                          {Childrencont &&
                            Childrencont.map((item) => {
                              return (
                                <option key={item.id} value={item.type}>
                                  {item.type}
                                </option>
                              );
                            })}
                        </select>
                        {/* <p style={{ color: 'red' }}>{formerror.childrenno}</p> */}
                      </div>
                    </div>
                    <div className="main_book_form_input_div_innear">
                      <label htmlFor="roomno">No of room</label>
                      <Select
                        id="roomno"
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            // borderColor: !!formerror.donationtype ? 'red' : '',
                            padding: '10px 0px 10px 10px',
                            background: '#fff',
                          },
                        }}
                        value={roomno}
                        name="roomno"
                        onChange={(e) => setroomno(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={''}
                        >
                          Please select
                        </MenuItem>
                        {roomCount &&
                          roomCount.map((item) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item.type}
                              >
                                {item.type}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <p style={{ color: 'red' }}>{formerror.roomno}</p>
                    </div>
                  </div>

                  <div className="main_book_form_input_div">
                    <div className="main_book_form_input_div_innear">
                      <label>ID Proof</label>
                      <Select
                        id="categroyname"
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            // borderColor: !!formerror.donationtype ? 'red' : '',
                            padding: '10px 0px 10px 10px',
                            background: '#fff',
                          },
                        }}
                        value={idproffname}
                        name="idproffname"
                        onChange={(e) => setidproffname(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={''}
                        >
                          Please select
                        </MenuItem>
                        {idproff &&
                          idproff.map((item) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item.doc}
                              >
                                {item.doc}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <p style={{ color: 'red' }}>{formerror.idproffname}</p>
                    </div>
                    <div className="main_book_form_input_div_innear">
                      <label htmlFor="idproffnumber">ID Number</label>
                      <CustomInput
                        type="text"
                        id="idproffnumber"
                        name="idproffnumber"
                        placeholder="Enter id number"
                        value={idproffnumber}
                        onChange={(e) => setidproffnumber(e.target.value)}
                      />
                      <p style={{ color: 'red' }}>{formerror.idproffnumber}</p>
                    </div>

                    <div style={{ width: '30%' }}>&nbsp;</div>
                  </div>
                </form>

                <div className="Mattress_main_div">
                  <h2> Extra Mattress</h2>
                  <p>Exter charge (₹150 per mattress) </p>

                  <div className="main_div_need_mattress">
                    <p>Need extra mattress</p>
                    <Select
                      id="extraMattress"
                      required
                      sx={{
                        width: '60px',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                          // borderColor: !!formerror.donationtype ? 'red' : '',
                          padding: '10px 0px 10px 10px',
                          background: '#fff',
                        },
                      }}
                      value={extraMattress}
                      name="extraMattress"
                      onChange={(e) => setextraMattress(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={''}
                      >
                        Please select
                      </MenuItem>
                      {roomCount &&
                        roomCount.map((item) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.type}
                            >
                              {item.type}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                </div>
                <div className="proces_btn_main_div">
                  <div>
                    <button
                      onClick={() => handleclick()}
                      className="Proceed_btn"
                    >
                      Proceed To Check
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="Proceed_btn_go"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : <></>}
    </>
  );
}

export default RoomBookingscreen;
