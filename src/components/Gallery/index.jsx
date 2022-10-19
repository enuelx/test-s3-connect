import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import config from '@config';

import { Loader } from '@components';
import { UserContext } from '@context';
import { cypherContract } from '@artifacts';

export const Gallery = () => {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [nftsData, setNftsData] = useState([]);

  useEffect(() => {
    (async () => {
      if (userContext.user) {
        setLoading(true);
        const nftsId = userContext.user?.wallets?.reduce(
          (prev, { cypherHoldings }) => {
            return prev.concat(cypherHoldings);
          },
          []
        );

        const provider = new ethers.providers.InfuraProvider(
          1,
          config.infuraKey
        );
        const contract = new ethers.Contract(
          cypherContract.address,
          cypherContract.abi,
          provider
        );

        const nftUris = await Promise.all(
          nftsId.map(async (id) => {
            const uri = await contract.tokenURI(id);
            const metadata = await axios.get(uri);
            const imgUri = metadata.data.image;

            return imgUri;
          })
        );

        setLoading(false);
        setNftsData(nftUris);
      }
    })();
  }, [userContext.user]);

  return (
    <Container className="backgroundContainer">
      {loading ? (
        <Loader />
      ) : (
        <Container
          style={{
            marginLeft: '50px',
            paddingTop: '30px'
          }}
        >
          {nftsData?.length > 0 ? (
            <ul>
              {nftsData.map((nft, i) => (
                <li key={i}>
                  nft {i}: {nft}
                </li>
              ))}
            </ul>
          ) : (
            <>Nothing to show</>
          )}
        </Container>
      )}
    </Container>
  );
};
