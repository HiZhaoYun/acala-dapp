import React, { FC, memo, useState, useContext } from 'react';
import { noop } from 'lodash';
import { useFormik } from 'formik';

import { CurrencyId } from '@acala-network/types/interfaces';
import { Fixed18 } from '@acala-network/app-util';

import { Card, nextTick } from '@honzon-platform/ui-components';
import { useDexExchangeRate, useFormValidator } from '@honzon-platform/react-hooks';
import { BalanceInput, TxButton, numToFixed18Inner, DexExchangeRate, DexPoolSize, DexUserShare } from '@honzon-platform/react-components';

import classes from './DepositConsole.module.scss';
import { ReactComponent as AddIcon } from '../assets/add.svg';
import { DepositContext } from './Provider';

interface InputAreaProps {
  disabled?: boolean;
  error: any;
  id: string;
  name: string;
  currencies?: (CurrencyId | string)[];
  value: number;
  onChange: (event: React.ChangeEvent<any>) => void;
  token: CurrencyId;
  onTokenChange?: (token: CurrencyId) => void;
}

const InputArea: FC<InputAreaProps> = memo(({
  currencies,
  disabled,
  error,
  id,
  name,
  onChange,
  onTokenChange,
  token,
  value
}) => {
  return (
    <div className={classes.inputAreaRoot}>
      <div className={classes.inputAreaTitle}>
        <p>Deposit</p>
      </div>
      <BalanceInput
        currencies={currencies}
        disabled={disabled}
        enableTokenSelect
        error={!!error}
        id={id}
        name={name}
        onChange={onChange}
        onTokenChange={onTokenChange}
        token={token}
        value={value}
      />
    </div>
  );
});

InputArea.displayName = 'InputArea';

export const DepositConsole: FC = memo(() => {
  const { baseCurrencyId, enabledCurrencyIds } = useContext(DepositContext);
  const [otherCurrency, setOtherCurrency] = useState<CurrencyId>(enabledCurrencyIds[0]);
  const rate = useDexExchangeRate(otherCurrency);
  const validator = useFormValidator({
    base: {
      currency: baseCurrencyId,
      min: 0,
      type: 'balance'
    },
    other: {
      currency: otherCurrency,
      min: 0,
      type: 'balance'
    }
  });
  const form = useFormik({
    initialValues: {
      base: '',
      other: ''
    },
    onSubmit: noop,
    validate: validator
  });

  const handleOtherInput = (event: React.ChangeEvent<any>): void => {
    const value = Number(event.target.value);

    form.handleChange(event);
    nextTick(() => { form.setFieldValue('base', Fixed18.fromNatural(value).mul(rate).toNumber()); });
  };

  const handleSuccess = (): void => {
    // reset form
    form.resetForm();
  };

  const handleOtherCurrencyChange = (currency: CurrencyId): void => {
    setOtherCurrency(currency);

    // reset form
    form.resetForm();
  };

  const checkDisabled = (): boolean => {
    if (!(form.values.base && form.values.other)) {
      return true;
    }

    if (form.errors.base || form.errors.other) {
      return true;
    }

    return false;
  };

  return (
    <Card>
      <div className={classes.main}>
        <InputArea
          currencies={enabledCurrencyIds}
          error={form.errors.other}
          id={'other'}
          name={'other'}
          onChange={handleOtherInput}
          onTokenChange={handleOtherCurrencyChange}
          token={otherCurrency}
          value={form.values.other as number}
        />
        <AddIcon className={classes.addIcon} />
        <InputArea
          currencies={[baseCurrencyId]}
          error={form.errors.base}
          id={'base'}
          name={'base'}
          onChange={form.handleChange}
          token={baseCurrencyId}
          value={form.values.base as number}
        />
        <TxButton
          className={classes.txBtn}
          disabled={checkDisabled()}
          method='addLiquidity'
          onSuccess={handleSuccess}
          params={
            [
              otherCurrency,
              numToFixed18Inner(form.values.other),
              numToFixed18Inner(form.values.base)
            ]
          }
          section='dex'
          size='large'
        >
          Deposit
        </TxButton>
      </div>
      <div>
        <ul className={classes.addon}>
          <li className={classes.addonItem}>
            <span>Exchange Rate</span>
            <DexExchangeRate supply={otherCurrency} />
          </li>
          <li className={classes.addonItem}>
            <span>Current Pool Size</span>
            <DexPoolSize token={otherCurrency} />
          </li>
          <li className={classes.addonItem}>
            <span>Your Pool Share(%)</span>
            <DexUserShare token={otherCurrency} />
          </li>
        </ul>
      </div>
    </Card>
  );
});

DepositConsole.displayName = 'DepositConsole';
