import axios from 'axios';
import config from '@config';

const benefitsLambdaUrl = config.benefitsCalculatorUrl;

export default {
  async getBenefits(wallets) {
    const result = await axios.get(benefitsLambdaUrl, {
      params: {
        format: "True",
        wallets
      }
    });

    return result;
  }
};
