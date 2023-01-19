import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private basePath = '/uploads';
  constructor(private readonly storage: Storage) {}

  async uploadAvatar(fileName: string, blob: Blob) {
    const filePath = `${this.basePath}/avatars/${fileName}`;
    const fileDetails = ref(this.storage, filePath);
    await uploadBytes(fileDetails, blob);
    return await getDownloadURL(fileDetails);
  }
}

export function dataURLtoBlob(dataUrl: string) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
