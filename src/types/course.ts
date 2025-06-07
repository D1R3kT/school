export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  duration: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  features: string[];
  teacherName: string;
  createdAt: string;
}

export interface CourseLevel {
  BEGINNER: 'Начинающий';
  INTERMEDIATE: 'Средний';
  ADVANCED: 'Продвинутый';
  ALL_LEVELS: 'Все уровни';
}

export const courseLevelLabels: CourseLevel = {
  BEGINNER: 'Начинающий',
  INTERMEDIATE: 'Средний',
  ADVANCED: 'Продвинутый',
  ALL_LEVELS: 'Все уровни',
};