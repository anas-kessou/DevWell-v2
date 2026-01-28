import forge from 'node-forge';

const APP_SECRET = "DEVWELL_NEURAL_LINK_V2_SECURE_KEY_2026";
const SALT = "devwell-salt";

let cachedKey: string | null = null;

// PBKDF2 key derivation using node-forge (Memoized)
function getDerivedKey() {
    if (cachedKey) return cachedKey;
    cachedKey = forge.pkcs5.pbkdf2(APP_SECRET, SALT, 100000, 32); // 32 bytes for AES-256
    return cachedKey;
}

export const encryptData = async (data: any): Promise<string> => {
    try {
        const key = getDerivedKey();
        const iv = forge.random.getBytesSync(12);
        const cipher = forge.cipher.createCipher('AES-GCM', key);
        
        const payload = JSON.stringify(data);
        cipher.start({
            iv: iv,
            tagLength: 128 // 16 bytes
        });
        cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(payload)));
        cipher.finish();
        
        const encrypted = cipher.output.getBytes();
        const tag = cipher.mode.tag.getBytes();
        
        // Combine IV + Encrypted Data + Tag
        const combined = iv + encrypted + tag;
        
        // Convert to Base64
        return forge.util.encode64(combined);
    } catch (e) {
        console.error("Encryption failed", e);
        return "";
    }
};

export const decryptData = async (encryptedBase64: string): Promise<any> => {
    try {
        if (!encryptedBase64) return null;
        
        const combined = forge.util.decode64(encryptedBase64);
        
        // Extract components
        const iv = combined.slice(0, 12);
        const tag = combined.slice(combined.length - 16);
        const encrypted = combined.slice(12, combined.length - 16);
        
        const key = getDerivedKey();
        const decipher = forge.cipher.createDecipher('AES-GCM', key);
        
        decipher.start({
            iv: iv,
            tag: forge.util.createBuffer(tag)
        });
        decipher.update(forge.util.createBuffer(encrypted));
        
        const pass = decipher.finish();
        if (pass) {
            return JSON.parse(forge.util.decodeUtf8(decipher.output.getBytes()));
        }
        throw new Error("Decryption failed at authentication check");
    } catch (e) {
        // Fallback for non-encrypted legacy data
        return encryptedBase64;
    }
};
