// utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store';

export async function saveKey(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getKey(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key);
}

export async function deleteKey(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function clearStorage() {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("userName");
}