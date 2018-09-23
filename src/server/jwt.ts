import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

/**
 * 
 * (Synchronous) Returns the decoded payload without verifying if the signature is valid.
 * Warning: This will not verify whether the signature is valid. You should not use this for 
 * untrusted messages. You most likely want to use jwt.verify instead.
 * 
 * jwt.decode(token [, options])
 * 
 * options:
 *      json: force JSON.parse on the payload even if the header doesn't contain "typ":"JWT"
 *      complete: return an object with the decoded payload and header.
 */
export { decode } from 'jsonwebtoken';

const SECRET = `shhhhh don't tell anyone`;

/** 
 * 
 * @param payload object literal | buffer | string
 * Signs the payload with a secret using jwt
 * 
 * The payload could be an object literal, buffer, or string representing valid JSON.
 * The secret is a string, buffer, or object containing either the secret for
 * HMAC algorithms or the PEM encoded private key for RSA and ECDSA.
 * 
 * jwt.sign(payload, secretOrPrivateKey, [options, calback])
 * 
 * (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
 * (Synchronous) Returns the JsonWebToken as string
 */
export const sign = (payload: any) => jwtSign(payload, SECRET);

/**
 * 
 * @param token The JsonWebToken string
 * Verify the JsonWebToken string with the secret
 * 
 * The token is the JsonWebToken string
 * The secret is a string or buffer containing either the secret for HMAC algorithms,
 * or the PEM encoded public key for RSA and ECDSA.
 * 
 * (Asynchronous) If jwt.verify is called asynchronous, secretOrPublicKey can be a function
 * that should fetch the secret or public ke.
 * 
 * (Synchronous) If a callback is not supplied, function acts synchronously.
 * Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid.
 * If not, it will throw an error.
 */
export const verify = <T>(token: string): T | object | null => {
  try {
    return jwtVerify(token, SECRET) as T | object | null;
  } catch (error) {
    console.log('ERROR VERIFYING TOKEN');
    return null;
  }
}