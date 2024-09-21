// TODO use unique salts, or better: move logic to backend
// hashes password using basic sha-256 hashing algortihm
export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Hash the password
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert byte array to hex string
  return hashHex
}