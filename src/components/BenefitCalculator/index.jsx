import { Container, Grid } from '@mui/material';
import { BenefitCalculatorComponent } from './BenefitComponent';
import './style.css';

export const BenefitCalculator = () => {
  return (
    <Container className="containerBenefitsCalculator">
      <Grid className="gridAccount benefitsContainer">
        <BenefitCalculatorComponent />
      </Grid>
    </Container>
  );
};
