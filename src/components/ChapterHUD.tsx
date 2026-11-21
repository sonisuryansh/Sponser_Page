import React from 'react';

interface ChapterHUDProps {
  currentIndex: number; // 0-based
  totalCount?: number;
  currentTitle?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export const ChapterHUD: React.FC<ChapterHUDProps> = () => {
  return null;
};

