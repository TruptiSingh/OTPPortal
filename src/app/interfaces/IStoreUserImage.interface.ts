export interface IStoreUserImage {

  userId: number;
  userType: number;
  webRootPath: string;
  imageFile: File | null;
  image: Uint8Array | null;
}
