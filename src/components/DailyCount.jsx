import React from 'react';
import PropTypes from 'prop-types';

export default function DailyCount({ dailyCount, totalCount }) {
  return (
    <div>
      <p>
        {dailyCount}
        /
        {totalCount}
      </p>
    </div>
  );
}
DailyCount.propTypes = {
  dailyCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};
