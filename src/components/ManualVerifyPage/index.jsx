import { useEffect, useState } from 'react';
import { Box, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import styled from '@emotion/styled';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import ManualVerify from './ManualVerify';
import {
  RIGHT_ARROW,
  LEFT_ARROW,
  BOTH_ARROWS,
  WALLET_A,
  WALLET_B
} from './style/icons';

const theme = createTheme({
  typography: { fontSize: 17 }
});
const ManualVerifyPage = () => {
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
    margin-top: -13px;
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
    return;
  };
  useEffect(() => {}, [stepState]);
  return (
    <Container
      style={{
        backgroundColor: '#252525',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
    >
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          paddingTop: '20vh',
          marginLeft: '15vw'
        }}
      >
        <div style={{ width: '700px' }}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '500px'
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
                        <span style={{ color: '#787878' }}>{label}</span>
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
                marginLeft: 'auto',
                marginRight: 'auto',
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

export default ManualVerifyPage;
