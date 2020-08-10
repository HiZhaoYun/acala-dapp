import React, { createContext, FC, PropsWithChildren, useState, useMemo, useRef, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { Fixed18 } from '@acala-network/app-util';

import { useLockPrices, LockedPricesResult } from '@acala-dapp/react-hooks/useLockPrices';
import { useConstants, useReclaimCollateral, useBalance } from '@acala-dapp/react-hooks';

export type EmergencyShutdownStep = 'trigger' | 'process' | 'reclaim' | 'success';

export const StepRoute: EmergencyShutdownStep[] = ['trigger', 'process', 'reclaim'];

export interface EmergencyShutdownContextData {
  step: EmergencyShutdownStep;
  setStep: (step: EmergencyShutdownStep) => void;
  lockedPrices: LockedPricesResult;
  canReclaim: boolean;
  setCanReclaim: (flag: boolean) => void;
  collaterals: Record<string, Fixed18>;
  savedCollateral: Record<string, Fixed18>;
  reclaimBalanceIsEmpty: boolean;
}

export const EmergencyShutdownContext = createContext<EmergencyShutdownContextData>({} as EmergencyShutdownContextData);

export const EmergencyShutdownProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const lockedPrices = useLockPrices();
  const [step, setStep] = useState<EmergencyShutdownStep>('trigger');
  const [canReclaim, setCanReclaim] = useState<boolean>(false);
  const { stableCurrency } = useConstants();
  const { calcCanReceive } = useReclaimCollateral();
  const stableCoinBalance = useBalance(stableCurrency);
  const collateralsRef = useRef<Record<string, Fixed18>>({});
  const reclaimBalanceIsEmpty = useMemo(() => {
    if (stableCoinBalance.isNaN() || stableCoinBalance.isZero()) {
      return true;
    }

    return false;
  }, [stableCoinBalance]);

  const collaterals = useMemo<Record<string, Fixed18>>((): Record<string, Fixed18> => {
    if (!stableCoinBalance) return {};

    const result = calcCanReceive(stableCoinBalance);

    const resultIsEmpty = Object.keys(result).reduce((acc, cur) => {
      return acc && (result[cur].isNaN() || result[cur].isZero());
    }, true);

    if (!resultIsEmpty) {
      collateralsRef.current = cloneDeep(result);
    }

    return result;
  }, [calcCanReceive, stableCoinBalance]);

  useEffect(() => {
    if (stableCoinBalance.isNaN() || stableCoinBalance.isZero()) {
      setCanReclaim(false);
    }
  }, [stableCoinBalance]);

  return (
    <EmergencyShutdownContext.Provider value={{
      canReclaim,
      collaterals,
      lockedPrices,
      reclaimBalanceIsEmpty,
      savedCollateral: collateralsRef.current,
      setCanReclaim,
      setStep,
      step
    }}>
      {children}
    </EmergencyShutdownContext.Provider>
  );
};
