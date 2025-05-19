import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { type Match } from '../types/sportsMatches';
import MatchRow from './MatchRow';
import { useSportsTable } from '../hooks/useSportsTable';

type SportsTableProps = {
  matches: Match[];
};

const SportsTable: React.FC<SportsTableProps> = ({ matches }) => {
  const { toggleOddSelection, isOddSelected, handleScroll, listRef, initialScrollOffset } =
    useSportsTable(matches);

  const listHeight = Math.min(window.innerHeight * 0.8, 800);

  const rowHeight = 180;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sports Matches</h1>

      {matches.length === 0 ? (
        <div className="text-center py-8">No matches available</div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <List
            ref={listRef}
            height={listHeight}
            width="100%"
            itemCount={matches.length}
            itemSize={rowHeight}
            onScroll={handleScroll}
            initialScrollOffset={initialScrollOffset}
          >
            {({ index, style }) => (
              <MatchRow
                match={matches[index]}
                style={style}
                isOddSelected={isOddSelected}
                toggleOddSelection={toggleOddSelection}
              />
            )}
          </List>
        </div>
      )}
    </div>
  );
};

export default SportsTable;
