import { ITutorAvailibility } from "./ITutorAvailibilty.interface";

export interface ICreateTutor {
  linkedUserId: string;
  bio: string;
  introduction: string;
  pricePerHour: number;
  tutorEducationLevels: [];
  tutorSubjects: [];
  tutorTeachingPreferences: [];
  tutorAvailibilities: ITutorAvailibility[];
}
