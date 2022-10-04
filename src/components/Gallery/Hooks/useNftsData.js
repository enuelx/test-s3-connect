import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import { UserContext } from '@context';
import { cypherContract } from '@artifacts';
import config from '@config';

const useCypherContract = () => {
  const contract = useMemo(() => {
    const provider = new ethers.providers.InfuraProvider(1, config.infuraKey);
    return new ethers.Contract(
      cypherContract.address,
      cypherContract.abi,
      provider
    );
  }, [cypherContract]);

  return contract;
};

const getNftData = async ({ nftContract, nftId }) => {
  const uri = await nftContract.tokenURI(nftId);
  const resMetadata = await axios.get(uri);
  const imgUrl = resMetadata.data.image;

  return imgUrl;
};

export const useNftsData = () => {
  const [nftsData, setNftsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);
  const contract = useCypherContract();

  const tokensId = useMemo(() => {
    return userContext.user?.wallets?.reduce((prev, { cypherHoldings }) => {
      return prev.concat(cypherHoldings);
    }, []);
  }, [userContext.user]);

  const update = useCallback(async () => {
    if (contract && tokensId) {
      setLoading(true);
      const nftsPromise = tokensId.map((tokenId) => {
        getNftData({ nftContract: contract, nftId: tokenId });
      });

      const nfts = await Promise.all(nftsPromise);

      setNftsData(nfts);

      setLoading(false);
    }
  }, [contract, tokensId]);

  useEffect(() => {
    update();
  }, [update]);

  return { loading, nftsData, update };
};
