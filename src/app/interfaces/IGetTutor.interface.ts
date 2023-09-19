import { ITutorAvailibility } from "./ITutorAvailibilty.interface";

export interface IGetTutor {
  tutorId: number;
  linkedUserId: string;
  introduction: string;
  bio: string;
  pricePerHour: number;
  rating: number;
  educationLevelIds: number[];
  subjectIds: number[];
  teachingPreferenceIds: number[];
  tutorAvailibilities: ITutorAvailibility[];
}
