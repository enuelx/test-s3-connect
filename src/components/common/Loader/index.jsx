import { Backdrop, CircularProgress } from '@mui/material';

export const Loader = () => (
  <div className="loader">
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);

export default Loader;
