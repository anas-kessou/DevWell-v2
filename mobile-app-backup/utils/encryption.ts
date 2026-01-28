
// Simple AES-GCM encryption using Web Crypto API
// In a real production app, keys should be managed via KMS or standard key rotation policies.
// For this app, we derive a key from a static secret mixed with the user ID for separation, 
// or a global key for admin accessibility.

const APP_SECRET = "DEVWELL_NEURAL_LINK_V2_SECURE_KEY_2026";

async function getKey(): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(APP_SECRET),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode("devwell-salt"),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

export const encryptData = async (data: any): Promise<string> => {
    try {
        const key = await getKey();
        const encoder = new TextEncoder();
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encodedData = encoder.encode(JSON.stringify(data));

        const encrypted = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            encodedData
        );

        // Combine IV and encrypted data into a single string
        const ivArray = Array.from(iv);
        const encryptedArray = Array.from(new Uint8Array(encrypted));
        const combined = new Uint8Array(ivArray.length + encryptedArray.length);
        combined.set(ivArray);
        combined.set(encryptedArray, ivArray.length);

        // Convert to Base64
        return btoa(String.fromCharCode(...combined));
    } catch (e) {
        console.error("Encryption failed", e);
        return "";
    }
};

export const decryptData = async (encryptedString: string): Promise<any> => {
    try {
        if (!encryptedString) return null;
        
        const key = await getKey();
        const binaryString = atob(encryptedString);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const iv = bytes.slice(0, 12);
        const data = bytes.slice(12);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            key,
            data
        );

        const decoder = new TextDecoder();
        return JSON.parse(decoder.decode(decrypted));
    } catch (e) {
        // Fallback for non-encrypted legacy data
        // console.warn("Decryption failed or data legacy", e);
        return encryptedString; // Return original if fallback needed, though JSON parse might fail if it's not JSON
    }
};
