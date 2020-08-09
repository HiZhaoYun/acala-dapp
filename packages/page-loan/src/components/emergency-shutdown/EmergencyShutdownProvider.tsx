import React, { createContext, FC, PropsWithChildren, useState, useMemo } from 'react';

import { Fixed18 } from '@acala-network/app-util';

import { useLockPrices, LockedPricesResult } from '@acala-dapp/react-hooks/useLockPrices';
import { useConstants, useReclaimCollateral, useBalance, useModal } from '@acala-dapp/react-hooks';

export type EmergencyShutdownStep = 'trigger' | 'process' | 'reclaim' | 'success';

export const StepRoute: EmergencyShutdownStep[] = ['trigger', 'process', 'reclaim'];

export interface EmergencyShutdownContextData {
  step: EmergencyShutdownStep;
  setStep: (step: EmergencyShutdownStep) => void;
  lockedPrices: LockedPricesResult;
  canReclaim: boolean;
  setCanReclaim: (flag: boolean) => void;
  collaterals: Record<string, Fixed18>;
}

export const EmergencyShutdownContext = createContext<EmergencyShutdownContextData>({} as EmergencyShutdownContextData);

export const EmergencyShutdownProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const lockedPrices = useLockPrices();
  const [step, setStep] = useState<EmergencyShutdownStep>('trigger');
  const [canReclaim, setCanReclaim] = useState<boolean>(false);
  const { stableCurrency } = useConstants();
  const { calcCanReceive } = useReclaimCollateral();
  const stableCoinBalance = useBalance(stableCurrency);

  const collaterals = useMemo<Record<string, Fixed18>>((): Record<string, Fixed18> => {
    if (!stableCoinBalance) return {};

    return calcCanReceive(stableCoinBalance);
  }, [calcCanReceive, stableCoinBalance]);

  return (
    <EmergencyShutdownContext.Provider value={{
      canReclaim,
      collaterals,
      lockedPrices,
      setCanReclaim,
      setStep,
      step
    }}>
      {children}
    </EmergencyShutdownContext.Provider>
  );
};
