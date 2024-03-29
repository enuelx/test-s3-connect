import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  createTheme
} from '@mui/material';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

import ManualVerify from './ManualVerify';
import {
  BOTH_ARROWS,
  LEFT_ARROW,
  RIGHT_ARROW,
  WALLET_A,
  WALLET_B
} from './style/icons';
import './style.css';

const theme = createTheme({
  typography: { fontSize: 17 }
});

export const ManualVerifyPage = () => {
  const steps = [
    'Connect hot wallet',
    'Transfer Cypher',
    'Transfer Back',
    'Wallet approved!'
  ];
  const [stepState, setStepState] = useState(0);
  const StepIcon = styled.div`
    background-color: ${({ active }) => (active ? '#fff' : '#787878')};
    color: #252525;
    width: 30px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 20px;
    border-radius: 50%;
    margin-top: -5px;
    font-weight: 500;
    z-index: 1;
  `;

  const arrowState = () => {
    if (stepState === 1) {
      return RIGHT_ARROW;
    }
    if (stepState === 2) {
      return LEFT_ARROW;
    }
    if (stepState === 3) {
      return BOTH_ARROWS;
    }
  };

  const [_isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (document.body.clientWidth < 850) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {}, [stepState]);

  return (
    <Container className="containerChangePass">
      <Grid className="gridWalletStep">
        <div style={{ width: '800px' }}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <ThemeProvider theme={theme}>
                <Stepper activeStep={stepState} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        icon={
                          <StepIcon active={index <= stepState}>
                            <p>{index + 1}</p>
                          </StepIcon>
                        }
                      >
                        <span
                          style={{
                            color: index <= stepState ? '#fff' : '#787878',
                            fontWeight: index === stepState ? 600 : ''
                          }}
                        >
                          {label}
                        </span>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </ThemeProvider>
            </Box>
          </Box>

          {stepState > 0 && (
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5vh'
              }}
            >
              <img src={WALLET_A} width={48} height={48} />
              <img
                style={{ marginLeft: '5vw' }}
                src={arrowState()}
                width={48}
                height={48}
              />
              <img
                style={{ marginLeft: '5vw' }}
                src={WALLET_B}
                width={48}
                height={48}
              />
            </Box>
          )}
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '4vh'
            }}
          >
            {<ManualVerify stepState={stepState} setStepState={setStepState} />}
          </Box>
        </div>
      </Grid>
    </Container>
  );
};
