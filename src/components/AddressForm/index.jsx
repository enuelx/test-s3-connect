import { useState, useContext, useMemo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  Button
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import countryList from 'react-select-country-list';

import { UserContext, ToastContext } from '@context';
import { shippingAddressApi } from '@services';

export const AddressForm = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const [country, setCountry] = useState(
    countryOptions.find(
      (country) => country.key === userContext.user.shippingAddress?.country.key
    ) || ''
  );

  const [address, setAddress] = useState(
    userContext.user.shippingAddress?.address || ''
  );
  const [fullName, setFullName] = useState(
    userContext.user.shippingAddress?.fullName || ''
  );
  const [city, setCity] = useState(userContext.user.address?.city || '');
  const [zipCode, setZipCode] = useState(
    userContext.user.shippingAddress?.zipCode || ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userContext.user.shippingAddress?.phoneNumber || ''
  );

  const handleChangeAddress = async () => {
    setIsSubmitting(true);
    try {
      const data = await shippingAddressApi.update(userContext.token, {
        country,
        address,
        fullName,
        city,
        zipCode,
        phoneNumber
      });
      userContext.setUser({
        ...userContext.user,
        address: data.shippingAddress
      });

      toastContext.successMessage('Address updated');
    } catch (err) {
      const message =
        err.response.status === 401
          ? 'Invalid password'
          : err.response.data?.error;
      toastContext.errorMessage(message);
    }

    setIsSubmitting(false);
  };

  return (
    <Accordion sx={{ width: '50vw' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Physical Address</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <TextField
            select
            value={country}
            label="Country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            sx={{ marginBottom: '0.5rem' }}
          >
            {countryOptions.map((country) => (
              <MenuItem key={country.value} value={country}>
                {country.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            sx={{ marginBottom: '0.5rem' }}
          />
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            sx={{ marginBottom: '0.5rem' }}
          />
          <TextField
            label="State / Province / Region"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            sx={{ marginBottom: '0.5rem' }}
          />
          <TextField
            label="Zip Code"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            sx={{ marginBottom: '0.5rem' }}
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            helperText="May be used to assist delivery"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            sx={{ marginBottom: '0.5rem' }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            onClick={handleChangeAddress}
          >
            Save Changes
          </Button>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};
