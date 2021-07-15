import React from "react";

import { useContext } from 'react';
import cache from '../utility/cache';

const BottleIdContext = React.createContext();
const BottleWeightContext = React.createContext();

export default function useBottleCheckin() {
  const { bottleId, setBottleId } = useContext(BottleIdContext);
  const { bottleWeight, setBottleWeight } = useContext(BottleWeightContext);

  
}