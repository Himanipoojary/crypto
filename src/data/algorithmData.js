// Hash algorithm specifications and information
export const algorithmData = [
  {
    id: 1,
    name: 'MD5',
    fullName: 'Message Digest Algorithm 5',
    year: 1991,
    creator: 'Ronald Rivest',
    outputSize: 128,
    outputLength: 32,
    status: 'deprecated',
    icon: '❌',
    description: 'MD5 is a widely used cryptographic hash function that produces a 128-bit hash value. Originally designed for security applications, it has been found to suffer from extensive vulnerabilities and is no longer recommended for cryptographic purposes.',
    vulnerabilities: [
      'Collision attacks demonstrated in 2004',
      'Pre-image attacks possible with reduced rounds',
      'Birthday attack complexity only 2^64 operations',
      'Not suitable for SSL certificates or digital signatures',
      'Can be exploited for malicious file substitution'
    ],
    useCases: [
      'File integrity verification (checksums)',
      'Non-cryptographic applications only',
      'Legacy system compatibility',
      'Database partitioning'
    ],
    securityLevel: 1,
    speed: 'Very Fast',
    blockSize: 512,
    rounds: 64
  },
  {
    id: 2,
    name: 'SHA-1',
    fullName: 'Secure Hash Algorithm 1',
    year: 1995,
    creator: 'NSA (National Security Agency)',
    outputSize: 160,
    outputLength: 40,
    status: 'vulnerable',
    icon: '⚠️',
    description: 'SHA-1 is a cryptographic hash function designed by the NSA and published by NIST. It produces a 160-bit hash value and was widely used in security applications and protocols. However, significant vulnerabilities have been discovered, leading to its deprecation.',
    vulnerabilities: [
      'Theoretical collision attack discovered in 2005',
      'Practical collision demonstrated by Google in 2017 (SHAttered)',
      'Collision attack complexity reduced to 2^63 operations',
      'Deprecated by major browsers and certificate authorities',
      'No longer accepted for SSL/TLS certificates since 2017'
    ],
    useCases: [
      'Git version control (being phased out)',
      'Legacy systems (transition recommended)',
      'Some digital signature applications',
      'File integrity in non-critical systems'
    ],
    securityLevel: 3,
    speed: 'Fast',
    blockSize: 512,
    rounds: 80
  },
  {
    id: 3,
    name: 'SHA-256',
    fullName: 'Secure Hash Algorithm 256-bit',
    year: 2001,
    creator: 'NSA (National Security Agency)',
    outputSize: 256,
    outputLength: 64,
    status: 'secure',
    icon: '✓',
    description: 'SHA-256 is part of the SHA-2 family and produces a 256-bit hash value. It is currently one of the most widely used hash algorithms and is considered secure for cryptographic applications. It is used in blockchain technology, SSL certificates, and various security protocols.',
    vulnerabilities: [
      'No known practical attacks',
      'Theoretical weaknesses in reduced-round versions only',
      'Considered secure for current cryptographic use'
    ],
    useCases: [
      'Bitcoin and cryptocurrency mining',
      'SSL/TLS certificates',
      'Digital signatures and authentication',
      'Password verification systems',
      'Blockchain technology',
      'File integrity verification',
      'Code signing'
    ],
    securityLevel: 8,
    speed: 'Fast',
    blockSize: 512,
    rounds: 64
  },
  {
    id: 4,
    name: 'bcrypt',
    fullName: 'Blowfish Crypt',
    year: 1999,
    creator: 'Niels Provos and David Mazières',
    outputSize: 184,
    outputLength: 60,
    status: 'recommended',
    icon: '✓✓',
    description: 'bcrypt is a password-hashing function based on the Blowfish cipher. It incorporates a salt to protect against rainbow table attacks and is adaptive, meaning the iteration count can be increased to make it slower as computers get faster, providing protection against brute-force attacks.',
    vulnerabilities: [
      'No known significant vulnerabilities',
      'Maximum password length of 72 bytes',
      'Requires proper cost factor configuration'
    ],
    useCases: [
      'Password storage and verification',
      'User authentication systems',
      'Web application security',
      'API authentication'
    ],
    securityLevel: 9,
    speed: 'Slow (Adaptive)',
    blockSize: 64,
    rounds: 'Configurable (2^4 to 2^31)',
    costFactor: 'Default: 10-12'
  },
  {
    id: 5,
    name: 'Argon2',
    fullName: 'Argon2',
    year: 2015,
    creator: 'Alex Biryukov, Daniel Dinu, Dmitry Khovratovich',
    outputSize: 'Variable',
    outputLength: 'Configurable',
    status: 'recommended',
    icon: '✓✓✓',
    description: 'Argon2 is the winner of the Password Hashing Competition (2015) and is considered the most secure password hashing algorithm available. It has three variants: Argon2d, Argon2i, and Argon2id. It is designed to resist GPU cracking attacks and provides both time and memory cost parameters.',
    vulnerabilities: [
      'No known vulnerabilities',
      'Requires proper parameter configuration',
      'Relatively new (less battle-tested than bcrypt)'
    ],
    useCases: [
      'Password hashing (highest security)',
      'Cryptocurrency wallets',
      'High-security authentication systems',
      'Key derivation functions'
    ],
    securityLevel: 10,
    speed: 'Slow (Adaptive)',
    blockSize: 'Variable',
    rounds: 'Configurable',
    variants: ['Argon2d', 'Argon2i', 'Argon2id'],
    memoryHard: true
  },
  {
    id: 6,
    name: 'SHA-512',
    fullName: 'Secure Hash Algorithm 512-bit',
    year: 2001,
    creator: 'NSA (National Security Agency)',
    outputSize: 512,
    outputLength: 128,
    status: 'secure',
    icon: '✓',
    description: 'SHA-512 is part of the SHA-2 family and produces a 512-bit hash value. It offers higher security than SHA-256 due to its larger output size and is used in applications requiring the highest level of data integrity.',
    vulnerabilities: [
      'No known practical attacks',
      'Considered highly secure'
    ],
    useCases: [
      'High-security digital signatures',
      'Cryptographic applications requiring larger hash',
      'Certificate authorities',
      'Secure communications'
    ],
    securityLevel: 9,
    speed: 'Fast',
    blockSize: 1024,
    rounds: 80
  }
];

// Comparison metrics
export const comparisonMetrics = {
  speed: ['Very Fast', 'Fast', 'Medium', 'Slow', 'Very Slow'],
  security: ['Broken', 'Weak', 'Deprecated', 'Secure', 'Very Secure', 'Strongest'],
  difficulty: {
    md5: 'Trivial to crack',
    sha1: 'Easy to crack',
    sha256: 'Very difficult to crack',
    bcrypt: 'Extremely difficult to crack',
    argon2: 'Nearly impossible to crack'
  }
};

// Hash function characteristics
export const hashCharacteristics = {
  weak: ['MD5', 'SHA-1'],
  strong: ['SHA-256', 'SHA-512', 'SHA-3'],
  passwordSpecific: ['bcrypt', 'scrypt', 'Argon2', 'PBKDF2']
};

export default algorithmData;
