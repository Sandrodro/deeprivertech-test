import React, { memo } from 'react';
import { type Match } from '../types/sportsMatches';
import { formatMatchTime } from '../utils/dateUtils';

type MatchRowProps = {
  match: Match;
  style: React.CSSProperties;
  isOddSelected: (matchId: string, categoryType: string, optionName: string) => boolean;
  toggleOddSelection: (matchId: string, categoryType: string, optionName: string) => void;
};

const MatchRow: React.FC<MatchRowProps> = ({ match, style, isOddSelected, toggleOddSelection }) => {
  return (
    <div
      style={style}
      className="flex flex-col border-b border-gray-200 py-4 px-4 hover:bg-gray-50"
    >
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-3" aria-label={`Sport: ${match.sportIcon}`}>
          {match.sportIcon}
        </span>
        <div className="flex-1">
          <div className="font-semibold">
            {match.competitors.home} vs {match.competitors.away}
          </div>
          <div className="text-sm text-gray-500">{formatMatchTime(match.startTime)}</div>
        </div>
        <div className="text-lg font-bold">
          {match.currentScore.home} - {match.currentScore.away}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {match.bettingOptions.map(category => (
          <div key={category.type} className="flex flex-col">
            <div className="text-sm font-medium text-gray-700 mb-1">{category.type}</div>
            <div className="flex flex-wrap gap-2">
              {category.options.map(option => {
                const isSelected = isOddSelected(match.id, category.type, option.name);
                return (
                  <button
                    key={option.name}
                    onClick={() => toggleOddSelection(match.id, category.type, option.name)}
                    className={`
                      px-3 py-1 rounded text-sm flex flex-col items-center
                      ${
                        isSelected
                          ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                          : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                      }
                      transition-colors duration-200
                    `}
                    aria-pressed={isSelected}
                  >
                    <span className="font-medium">{option.name}</span>
                    <span className="text-xs">{option.odds.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MatchRow);
