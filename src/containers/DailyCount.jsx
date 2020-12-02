import React from 'react';
import { useSelector } from 'react-redux';
import DailyCount from '../components/DailyCount';

export default function () {
  const totalCount = useSelector((state) => state.users.users.length);
  const dailyCount = useSelector((state) => state.users.dailyCount);
  return <DailyCount totalCount={totalCount} dailyCount={dailyCount} />;
}
