import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type Match, type SelectedOdd } from '../types/sportsMatches';

const SELECTED_ODDS_KEY = 'selectedOdds';
const SCROLL_POSITION_KEY = 'scrollPosition';

export const useSportsTable = (matches: Match[]) => {
  const [selectedOdds, setSelectedOdds] = useState<SelectedOdd[]>(() => {
    const savedOdds = localStorage.getItem(SELECTED_ODDS_KEY);
    return savedOdds ? JSON.parse(savedOdds) : [];
  });

  const listRef = useRef<any>(null);
  const scrollPosition: number = useMemo(() => {
    const savedPosition = localStorage.getItem(SCROLL_POSITION_KEY);
    return savedPosition ? parseInt(savedPosition, 10) : 0;
  }, []);

  useEffect(() => {
    if (scrollPosition > 0 && listRef.current) {
      // We need to wait for the list to be fully rendered
      setTimeout(() => {
        if (listRef.current?.scrollTo) {
          listRef.current.scrollTo(scrollPosition);
        }
      }, 100);
    }
  }, [scrollPosition]);

  useEffect(() => {
    localStorage.setItem(SELECTED_ODDS_KEY, JSON.stringify(selectedOdds));
  }, [selectedOdds]);

  const toggleOddSelection = useCallback(
    (matchId: string, categoryType: string, optionName: string) => {
      setSelectedOdds(prevSelectedOdds => {
        const existingIndex = prevSelectedOdds.findIndex(
          odd =>
            odd.matchId === matchId &&
            odd.categoryType === categoryType &&
            odd.optionName === optionName
        );

        if (existingIndex >= 0) {
          // Remove the odd if it's already selected
          return prevSelectedOdds.filter((_, index) => index !== existingIndex);
        } else {
          // Ensure only one selection per category for all bet types
          let newSelectedOdds = [...prevSelectedOdds];

          // Remove any existing selection from the same category for this match
          newSelectedOdds = newSelectedOdds.filter(
            odd => !(odd.matchId === matchId && odd.categoryType === categoryType)
          );

          return [...newSelectedOdds, { matchId, categoryType, optionName }];
        }
      });
    },
    []
  );

  const isOddSelected = useCallback(
    (matchId: string, categoryType: string, optionName: string) => {
      return selectedOdds.some(
        odd =>
          odd.matchId === matchId &&
          odd.categoryType === categoryType &&
          odd.optionName === optionName
      );
    },
    [selectedOdds]
  );

  const handleScroll = useCallback(({ scrollOffset }: { scrollOffset: number }) => {
    localStorage.setItem(SCROLL_POSITION_KEY, scrollOffset.toString());
  }, []);

  return {
    matches,
    selectedOdds,
    toggleOddSelection,
    isOddSelected,
    handleScroll,
    listRef,
    initialScrollOffset: scrollPosition,
  };
};
