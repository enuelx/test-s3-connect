import { useState, useContext, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

import { UserContext, ToastContext } from '@context';
import { benefitsLambda } from '@services';
import { Loader } from '@components';
import BenefitsMessage from './BenefitsMessage';

export const BenefitCalculatorComponent = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [benefits, setBenefits] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let listWallets = [];

        if (userContext?.user?.username) {
          const walletsToCheck = userContext?.user?.wallets;
          listWallets = walletsToCheck.map((wallet) => wallet.wallet);
        }
        const benefits = await benefitsLambda.getBenefits(
          listWallets.join(',')
        );
        const benefitsJSON = benefits.data['benefits'];
        setBenefits(benefitsJSON);
      } catch (err) {
        toastContext.errorMessage();
      }
    })();
  }, [userContext?.user?.wallets]);

  return (
    <div style={{ width: '380px' }}>
      <Box className="benefitsCardHeader">
        <FontAwesomeIcon color="#fff" icon={faCalculator} size="3x" />
      </Box>
      <Box style={{ marginTop: '3vh' }}>
        <Typography variant="h4" style={{ marginTop: '15px' }}>
          Benefits Calculator
        </Typography>

        {benefits === null ? (
          <Loader />
        ) : JSON.stringify(benefits) === '{}' ? (
          <Typography style={{ marginTop: '15px' }}>
            You're missing on the good stuff!{' '}
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://opensea.io/collection/cypher-genesis"
            >
              {' '}
              Go grab a Cypher{' '}
            </Link>
            and start getting your holder benefits!
          </Typography>
        ) : (
          <BenefitsMessage benefits={benefits} />
        )}
      </Box>
    </div>
  );
};
