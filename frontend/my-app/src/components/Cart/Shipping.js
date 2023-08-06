import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
// import { saveShippingInfo } from "../../actions/cartAction";
import { saveShippingInfo } from "../../actions/shippingAction";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
const Shipping = () => {
  const data = {
    address: "123 Street",
    city: "City",
    state: "State",
    country: "Country",
    pinCode: "12345",
    phoneNo: "1234567890",
  };
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.shipping);
  console.log(shippingInfo);

  // const storedShippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));




const [address, setAddress] = useState(shippingInfo?.address || '');
console.log(address);
const [city, setCity] = useState(shippingInfo?.city || '');
const [state, setState] = useState(shippingInfo?.state || '');
const [country, setCountry] = useState(shippingInfo?.country || '');
const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || '');
const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || '');

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
    
      return;
    }
    dispatch(
      saveShippingInfo({address, state, city, country, pinCode, phoneNo})
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      {/* <MetaData title="Shipping Details" /> */}

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;











// const Shipping = () => {
//   const dispatch = useDispatch();
//   const {shippingInfo} = useSelector(state => state.cart);
//   console.log(shippingInfo);

//   const [address, setAddress] = useState(shippingInfo.address);
//   const [city, setCity] = useState(shippingInfo.city);
//   const [state, setState] = useState(shippingInfo.state);
//   const [country, setCountry] = useState(shippingInfo.country);
//   const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
//   const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);



//   return (
//     <>
      
//     </>
//   )
// }

// export default Shipping
