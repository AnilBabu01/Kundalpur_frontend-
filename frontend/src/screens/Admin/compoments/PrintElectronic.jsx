import React, { useRef } from 'react';

import ElectronicTotal from '../compoments/ElectronicTotal';
import { useReactToPrint } from 'react-to-print';
import Moment from 'moment-js';
import TableContainer from '@mui/material/TableContainer';
function PrintElectronic({ isData, handleClose }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log('datxda', isData);

  return (
    <>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        {/* <div className="button_div_print_download10">
          <button onClick={() => navigation(-1)}>Back</button>

          <div />
        </div> */}
        <div ref={componentRef}>
          <div>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
            </p>
          </div>
          <table>
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <th>Date</th>
              <th>ReceiptNo</th>
              <th>VoucherNo</th>
              <th>Phone No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Head/Item</th>
              <th>Amount</th>
              <th>Remark</th>
            </tr>
            {isData &&
              isData.map((row) => {
                return (
                  <tr
                    className="margintop_add"
                    style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
                  >
                    <td>{Moment(row.donation_date).format('DD/MM/YYYY')}</td>
                    <td>{row.ReceiptNo}</td>

                    <td>{row.voucherNo}</td>
                    <td>{row.phoneNo}</td>
                    <td>{row.name}</td>
                    <td> {row.address}</td>
                    <td style={{ width: '5rem' }}>
                      {row.elecItemDetails.map((row) => {
                        return (
                          <li style={{ listStyle: 'none' }}>{row.type}</li>
                        );
                      })}
                    </td>

                    <td>
                      {row.elecItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      )}
                    </td>
                    <td>
                      {row.elecItemDetails.map((row) => {
                        return (
                          <li style={{ listStyle: 'none' }}>{row.remark} </li>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td>Amount</td>
              <td>
                <ElectronicTotal data={isData} />{' '}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="save-div-btn">
        <button onClick={() => handlePrint()} className="save-div-btn-btn">
          Print
        </button>
        <button
          onClick={() => handleClose()}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default PrintElectronic;
