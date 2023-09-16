export interface IStoreUserFile {

  userId: number;
  userType: number;
  documentType: number;
  webRootPath: string;
  userDocumentFile: File | null;
  documentFile: Uint8Array | null;
}
