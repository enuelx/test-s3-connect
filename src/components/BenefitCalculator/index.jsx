import { Container, Grid } from '@mui/material';
import { BenefitCalculatorComponent } from './BenefitCalculatorComponent';
import './style.css';

export const BenefitCalculator = () => {
  return (
    <Container className="containerBenefitsCalculator">
      <Grid className="gridAccount">
        <BenefitCalculatorComponent />
      </Grid>
    </Container>
  );
};
