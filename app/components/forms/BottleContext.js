import React, { useContext, useState, useEffect } from 'react'

import cache from '../../utility/cache';

const BottleIdContext = React.createContext();
const BottleWeightContext = React.createContext();

export function useBottleId() {
  return useContext(BottleIdContext)
}

export function useBottleWeight() {
  return useContext(BottleWeightContext)
}

export function BottleProvider({ children }) {
  const [hasBottleId, setHasBottleId] = useState(false);
  const [hasBottleWeight, setHasBottleWeight] = useState(false);

  useEffect(() => {
    const bottleId = cache.get('bottleId') ? true : false;
    setHasBottleId(bottleId);
  }, [])

  useEffect(() => {
    const bottleWeight = cache.get('bottleWeight') ? true : false;
    setHasBottleWeight(bottleWeight);
  }, [])

  return(
    <BottleIdContext.Provider value={bottleId}>
      <BottleWeightContext.Provider value={bottleWeight}>
        {children}
      </BottleWeightContext.Provider>
    </BottleIdContext.Provider>
  )
}