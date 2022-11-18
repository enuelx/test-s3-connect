import { Typography } from '@mui/material';

const holdingTypeText = {
    holding: 'by time holding',
    bought: 'by quantity bought',
    boosted: 'boosted, by time holding'
};

const airdropGear = {
    airdrop1: 'headwear',
    airdrop2: 'swords',
    airdrop3: 'machine guns, to be dropped in January',
    airdrop4: 'helmets',
    airdrop5: 'weapons',
    airdrop6: 'champion armors'
};

const airdropNumber = {
    airdrop1: 'Airdrop #1',
    airdrop2: 'Airdrop #2',
    airdrop3: 'Airdrop #3',
    airdrop4: 'Airdrop #4',
    airdrop5: 'Airdrop #5',
    airdrop6: 'Airdrop #6'
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
                                const finalAirdropNumber = airdropNumber[airdropName]
                                const airdropCount = airdropsValues[ai];
                                const holdingTypePlainText = holdingTypeText[holdingType];
                                const airdropMessage =
                                    finalAirdropNumber +
                                    ': ' +
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
