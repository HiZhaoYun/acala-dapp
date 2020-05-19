import React, { createContext, useState, FC, useCallback } from 'react';
import { BareProps } from '@acala-dapp/ui-components/types';
import { CurrencyId } from '@acala-network/types/interfaces';
import { useLoan } from '@acala-dapp/react-hooks';

type CREATE_STEP = 'select' | 'generate' | 'confirm' | 'success';

export interface ProviderData extends ReturnType<typeof useLoan> {
  step: CREATE_STEP;
  setStep: (step: CREATE_STEP) => void;
  selectedToken: CurrencyId;
  setSelectedToken: (token: CurrencyId) => void;
  deposit: number;
  setDeposit: (num: number) => void;
  generate: number;
  setGenerate: (num: number) => void;
}

export const createProviderContext = createContext<ProviderData>({} as ProviderData);

type Props = BareProps;

export const CreateProvider: FC<Props> = ({
  children
}) => {
  const [step, _setStep] = useState<CREATE_STEP>('select');
  const [selectedToken, _setSelectedToken] = useState<CurrencyId>(null as any as CurrencyId);
  const [deposit, setDeposit] = useState<number>(0);
  const [generate, setGenerate] = useState<number>(0);
  const _loan = useLoan(selectedToken);

  const setStep = useCallback((step: CREATE_STEP) => {
    _setStep(step);
  }, []);

  const setSelectedToken = useCallback((token: CurrencyId) => {
    _setSelectedToken(token);
  }, [_setSelectedToken]);

  return (
    <createProviderContext.Provider
      value={{
        deposit,
        generate,
        selectedToken,
        setDeposit,
        setGenerate,
        setSelectedToken,
        setStep,
        step,
        ..._loan
      }}
    >
      {children}
    </createProviderContext.Provider>
  );
};
