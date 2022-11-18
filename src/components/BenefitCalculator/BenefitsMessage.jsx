import { Typography } from '@mui/material';

const holdingTypeText = {
  holding: 'by time holding',
  bought: 'by quantity bought',
  boosted: 'boosted'
};

const airdropGear = {
  airdrop1: 'headwear',
  airdrop2: 'swords',
  airdrop3: 'machine guns, to be dropped in January',
  airdrop4: 'helmets',
  airdrop5: 'weapons',
  airdrop6: 'champion armors'
};

const textParser = ({ benefits }) => {
  delete benefits.June;

  const months = Object.keys(benefits);
  const holdingTypesObject = Object.values(benefits);

  return (
    <>
      {months.map((month, i) => {
        const holdingTypeKeys = Object.keys(holdingTypesObject[i]);
        const holdingTypesValues = Object.values(holdingTypesObject[i]);

        return (
          <>
            <Typography
              key={`month ${i}`}
              variant="h5"
              style={{ marginTop: '15px' }}
            >
              {month}
            </Typography>
            {holdingTypeKeys.map((holdingType, hi) => {
              const airdropsKeys = Object.keys(holdingTypesValues[hi]);
              const airdropsValues = Object.values(holdingTypesValues[hi]);

              const airdropMessages = airdropsKeys.map((airdropName, ai) => {
                const gearType = airdropGear[airdropName];
                const airdropCount = airdropsValues[ai];
                const holdingTypePlainText = holdingTypeText[holdingType];
                const airdropMessage =
                  '"' +
                  airdropName +
                  '"' +
                  ':' +
                  airdropCount +
                  ' (' +
                  gearType +
                  ', ' +
                  holdingTypePlainText +
                  ')';
                return (
                  <Typography key={`message ${i} ${hi} ${ai}`}>
                    {airdropMessage}
                  </Typography>
                );
              });
              return airdropMessages;
            })}
          </>
        );
      })}
    </>
  );
};

export default textParser;
