import { Box, Container, Grid } from '@mui/material';

import { Loader } from '@components';
import { useNftsData } from './Hooks';

export const Gallery = () => {
  const { loading, nftsData } = useNftsData();

  return (
    <Container className="backgroundContainer">
      {loading ? (
        <Loader />
      ) : (
        <Grid className="gridContainer">
          {nftsData ? (
            nftsData.map((nft, i) => (
              <div key={i}>
                <p>
                  nft {i}: {nft}
                </p>
              </div>
            ))
          ) : (
            <>Nothing to show</>
          )}
        </Grid>
      )}
    </Container>
  );
};
