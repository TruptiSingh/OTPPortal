import { ITutorAvailibility } from "./ITutorAvailibilty.interface";

export interface ICreateOrUpdateTutor {
  linkedUserId: string;
  bio: string;
  introduction: string;
  pricePerHour: number;
  tutorEducationLevels: number[];
  tutorSubjects: number[];
  tutorTeachingPreferences: number[];
  tutorAvailibilities: ITutorAvailibility[];
}
