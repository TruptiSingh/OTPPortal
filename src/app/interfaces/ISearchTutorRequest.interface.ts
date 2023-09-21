export interface ISearchTutorRequest {
  city: string;
  teachingPreferenceIds: number[];
  subjectIds: number[];
  levelId: number | null;
  availableDayIds: number[];
  minPrice: number | null;
  maxPrice: number | null;
  genderId: number | null;
}
