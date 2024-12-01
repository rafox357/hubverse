import { SecureLS } from 'secure-ls';
import QuickLRU from 'quick-lru';
import CryptoJS from 'crypto-js';
import { openDB } from 'idb';

// Memory cache for quick access
const memoryCache = new QuickLRU({
  maxSize: 1000
});

// Secure localStorage wrapper
const secureStorage = new SecureLS({
  encodingType: 'aes',
  isCompression: false,
  encryptionSecret: process.env.VITE_ENCRYPTION_KEY || 'your-fallback-key'
});

// IndexedDB setup
const initDB = async () => {
  return openDB('fundex-cache', 1, {
    upgrade(db) {
      db.createObjectStore('cache');
    },
  });
};

export class CacheService {
  static async set(key: string, value: any, options?: { 
    expires?: number;
    persistent?: boolean;
  }) {
    // Memory cache
    memoryCache.set(key, value);

    if (options?.persistent) {
      // Encrypt data
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        process.env.VITE_ENCRYPTION_KEY || 'your-fallback-key'
      ).toString();

      // Store in IndexedDB
      const db = await initDB();
      await db.put('cache', {
        value: encrypted,
        expires: options.expires || Date.now() + 86400000 // 24 hours default
      }, key);

      // Backup in secure localStorage
      secureStorage.set(key, value);
    }
  }

  static async get(key: string) {
    // Check memory first
    if (memoryCache.has(key)) {
      return memoryCache.get(key);
    }

    // Check IndexedDB
    try {
      const db = await initDB();
      const data = await db.get('cache', key);
      
      if (data) {
        if (data.expires && data.expires < Date.now()) {
          await this.delete(key);
          return null;
        }

        const decrypted = CryptoJS.AES.decrypt(
          data.value,
          process.env.VITE_ENCRYPTION_KEY || 'your-fallback-key'
        ).toString(CryptoJS.enc.Utf8);

        const value = JSON.parse(decrypted);
        memoryCache.set(key, value); // Cache in memory
        return value;
      }
    } catch (error) {
      console.error('Cache retrieval error:', error);
    }

    // Fallback to secure localStorage
    return secureStorage.get(key);
  }

  static async delete(key: string) {
    memoryCache.delete(key);
    secureStorage.remove(key);
    const db = await initDB();
    await db.delete('cache', key);
  }

  static async clear() {
    memoryCache.clear();
    secureStorage.clear();
    const db = await initDB();
    await db.clear('cache');
  }
}