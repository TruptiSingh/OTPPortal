export interface ICreateTutor {
  linkedUserId: string;
  bio: string;
  introduction: string;
  pricePerHour: number;
  tutorEducationLevels: { educationLevelId: number }[];
  tutorSubjects: { subjectId: number }[];
  tutorTeachingPreferences: { teachingPreferenceId: number }[];
  tutorAvailabilities: { weekDayId: number; timeRangeId: number }[];
}
