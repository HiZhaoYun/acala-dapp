import React, { FC } from 'react';
import { FormatNumber, FormatNumberProps } from './FormatNumber';

const formatValueConfig: FormatNumberProps['formatNumberConfig'] = {
  decimalLength: 2,
  removeEmptyDecimalParts: true,
  removeTailZero: false
};

export const FormatValue: FC<Omit<FormatNumberProps, 'formartNumberConfig'>> = (props) => {
  return (
    <FormatNumber
      {...props}
      formatNumberConfig={formatValueConfig}
      prefix={'≈US $'}
    />
  );
};
