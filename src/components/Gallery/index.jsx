import { Box, Container, Grid } from '@mui/material';

import { Loader } from '@components';
import { useNftsData } from './Hooks';

export const Gallery = () => {
  const { loading, nftsData, update } = useNftsData();

  return (
    <Container className="backgroundContainer">
      {loading ? (
        <Loader />
      ) : (
        <Grid className="gridContainer">
          {nftsData && nftsData.length > 0 ? (
            nftsData.map((nft, i) => (
              <div key={i}>
                <p>{nft}</p>
              </div>
            ))
          ) : (
            <div>Nothing to show</div>
          )}
        </Grid>
      )}
    </Container>
  );
};
