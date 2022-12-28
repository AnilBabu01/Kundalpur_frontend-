import React, { useEffect, useState } from "react";
import "./ElectronicDonation.css";
const CashDonation = ({ setOpen }) => {
  const [donationtype, setdonationtype] = useState("");
  const typesOfDonation = [
    "Please Select ",
    "बड़े बाबा मंदिर निर्माण दान (विशेष दान)",
    "कुण्डलपुर क्षेत्र विकास हेतु दान ",
    "गोलक दान जमा",
    "आहार दान ",
    "क्षेत्र भोजनालय दान",
    "त्यागीव्रती भोजनालय दान",
    "आवास सहयोग दान ",
    "औषधि दान",
    "गौशाला/ जीव दया दान ",
    "व्रत भण्डार दान",
    "पूजन द्रव्य दान ",
    "स्थाई पूजन दान",
    "गैस सिलेंडर दान",
    "बस वाहन दान",
    "कमरा सहयोग दान ",
    "रूम (कमरा) निर्माण दान",
    "क्षेत्र व्यवस्था दान",
    "कास्‍तकारी दान ",
    "फोटो साहित्य/स्टेशनरी दान ",
    "बिजली व्यवस्था दान ",
    "मंदिर/वेदी जीर्णोद्धार दान ",
    "उदासीन आश्रम दान",
    "वाचनालय दान",
    "विवाह चौक दान",
    "निर्वाचन दान जमा",
    "चातुर्मास कलश स्थापना दान",
    "त्रिकाल चौबीसी जिनबिम्ब दान ",
    "सहस्त्रकूट जिनालय दान ",
    "पंचकल्याणक महामहोत्सव दान ",
    "अग्रिम जमा",
    "अमानत जमा",
  ];
  useEffect(() => {}, []);
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <h2>Electronic Donation</h2>
          <div className="form-div">
            <p>Voucher No:</p>
            <div className="form-input-div">
              {/* <div className="phone-div-input">
                <label>Phone No:</label>
                <input text="text" className="forminput" />
                <div className="new-menber-no-div">
                  <p>New Menber:</p>
                  <p>No</p>
                  <input type="radio" />
                  <p>Yes</p>
                  <input type="radio" />
                </div>
              </div> */}

              <div className="inner-input-div2">
                <label>Name:</label>
                <input text="text" className="forminput" />
                <label>Donation Date:</label>
                <input text="text" className="forminput" />
              </div>

              <div className="inner-input-div2">
                <label>Address:</label>
                <input text="text" className="forminput" />
                <label>Donation Time:</label>
                <input text="text" className="forminput" />
              </div>
              <div className="inner-input-div2">
                <label>Receipt No:</label>
                <input text="text" className="forminput" />
                <label>Receipt No:</label>
                <input text="text" className="forminput" />
              </div>
            </div>
            <div className="bottom_input_div">
              <div className="inner-input-div1">
                <label>Type of donation</label>
                <select
                  id="type"
                  name="mode"
                  value={donationtype}
                  onChange={(e) => setdonationtype(e.target.value)}
                >
                  {typesOfDonation.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>{" "}
              <div className="inner-input-div1">
                <label>Amout</label>
                <input text="text" className="forminput1" />
              </div>{" "}
              <div className="inner-input-div1">
                <label>Remark</label>
                <input text="text" className="forminput1" />
              </div>{" "}
            </div>
          </div>
          <div className="save-div-btn">
            <button className="save-btn1">Save</button>
            <button onClick={() => setOpen(false)} className="calcel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashDonation;
