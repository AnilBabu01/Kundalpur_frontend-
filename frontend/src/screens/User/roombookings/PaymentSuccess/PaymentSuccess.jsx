import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ok from '../../../../assets/ok.png';
import { serverInstance } from '../../../../API/ServerInstance';
import './PaymentSuccess.css';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isData, setisData] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [checkinda, setcheckinda] = useState('');

  console.log('data from ducc', checkinda, isData, dharamshalaname);
  useEffect(() => {
    if (location.state) {
      // serverInstance(
      //   `room/checkin-id?id=${location.state?.data.data.id}`,
      //   'get',
      // ).then((res) => {
      //   setisData(res.data);
      // });

      setisData(location?.state?.data?.data);
      setcheckinda(location?.state?.checkindata);
      setdharamshalaname(location?.state?.categoryname);
    }
  }, []);
  return (
    <>
      <div className="main_div_head_tyopeeeebook">
        <div className="form_div_absolutebook_payment">
          <div className="centerdivhh">
            <p> Payment successful</p>
            <img src={ok} alt="ss" />
          </div>
          <div className="name_of_divvsssssv">
            <div className="name_of_divvsssssv10">
              <p>Payment type</p>
              <p>Bank</p>
              <p>Mobile number</p>
              <p>Email</p>
              <p>Amount Paid</p>
              <p>Transaction id</p>
            </div>
            <div className="name_of_divvsssssv10">
              <p>UPI</p>
              <p>HDFC</p>
              <p>{isData[0]?.contactNo}</p>
              <p>{isData[0]?.email}</p>
              <p>{Number(isData[0]?.roomAmount) * Number(isData[0]?.nRoom)}</p>
              <p>125362547859</p>
            </div>
          </div>

          <div className="payment_btn_duvvvvvv">
            <button
              onClick={() =>
                navigate('/room/ReceiptBookingy', {
                  state: {
                    data: isData,
                    dharamshala: dharamshalaname,
                    checkindata: checkinda,
                  },
                })
              }
              className="payment_btn_duvvvvvv10"
            >
              Confirmation
            </button>
            <button
              onClick={() => navigate('/bookinghistory')}
              className="payment_btn_duvvvvvv11"
            >
              Booking history
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
