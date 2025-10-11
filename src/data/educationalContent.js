// Educational content for theory pages
export const educationalContent = {
  introduction: {
    title: 'Understanding Dictionary Attacks',
    content: `A dictionary attack is a method of breaking into a password-protected system by systematically entering every word in a dictionary as a password. This technique exploits the human tendency to use common, easily remembered passwords that can be found in word lists.

Unlike brute-force attacks that try every possible combination of characters, dictionary attacks are more targeted and efficient. They use pre-compiled lists of common passwords, words, and their variations, making them significantly faster when targeting weak passwords.`,
    keyPoints: [
      'Dictionary attacks use wordlists instead of random combinations',
      'They exploit human password selection patterns',
      'Much faster than pure brute-force for common passwords',
      'Effectiveness depends on password complexity',
      'Can be enhanced with rules and mutations'
    ]
  },

  howItWorks: {
    title: 'How Dictionary Attacks Work',
    steps: [
      {
        step: 1,
        title: 'Obtain Target Hash',
        description: 'The attacker first obtains the hashed password from a database breach, intercepted communication, or other sources.',
        icon: '🎯'
      },
      {
        step: 2,
        title: 'Load Dictionary',
        description: 'A password dictionary (wordlist) is loaded. Common sources include rockyou.txt, leaked password databases, and custom wordlists.',
        icon: '📚'
      },
      {
        step: 3,
        title: 'Hash Each Word',
        description: 'Each word from the dictionary is hashed using the same algorithm as the target hash (MD5, SHA-1, etc.).',
        icon: '🔐'
      },
      {
        step: 4,
        title: 'Compare Hashes',
        description: 'The generated hash is compared with the target hash. If they match, the password is found.',
        icon: '⚖️'
      },
      {
        step: 5,
        title: 'Apply Mutations',
        description: 'Advanced attacks apply rules and mutations (uppercase, numbers, special characters) to increase success rate.',
        icon: '🔄'
      }
    ]
  },

  weakHashes: {
    title: 'Why Weak Hashes Are Vulnerable',
    explanation: `Weak hashing algorithms like MD5 and SHA-1 are vulnerable to dictionary attacks for several reasons:

1. **Speed**: These algorithms were designed to be fast, allowing attackers to test millions of passwords per second.

2. **No Built-in Salt**: Without salting, identical passwords produce identical hashes, making rainbow table attacks possible.

3. **Known Vulnerabilities**: Collision attacks have been demonstrated, undermining their cryptographic integrity.

4. **Lack of Key Stretching**: Modern password hashing functions apply the hash function multiple times, making attacks exponentially slower.`,
    vulnerabilityFactors: [
      {
        factor: 'Computational Speed',
        description: 'MD5 can process billions of hashes per second on modern GPUs',
        severity: 'critical'
      },
      {
        factor: 'No Memory Hardness',
        description: 'Weak hashes don\'t require significant memory, enabling parallel GPU attacks',
        severity: 'high'
      },
      {
        factor: 'Deterministic Output',
        description: 'Same input always produces same output without salt',
        severity: 'high'
      },
      {
        factor: 'Rainbow Tables',
        description: 'Pre-computed hash tables make attacks nearly instantaneous',
        severity: 'critical'
      }
    ]
  },

  defenseStrategies: {
    title: 'Defense Strategies',
    strategies: [
      {
        name: 'Use Strong Hash Algorithms',
        description: 'Implement bcrypt, Argon2, or scrypt for password storage',
        effectiveness: 'High',
        implementation: 'Use libraries like bcrypt.js or argon2 in your application',
        icon: '🛡️'
      },
      {
        name: 'Add Salt',
        description: 'Use unique, random salts for each password to prevent rainbow table attacks',
        effectiveness: 'High',
        implementation: 'Generate cryptographically secure random salt for each user',
        icon: '🧂'
      },
      {
        name: 'Implement Rate Limiting',
        description: 'Limit login attempts to slow down automated attacks',
        effectiveness: 'Medium',
        implementation: 'Add exponential backoff after failed login attempts',
        icon: '⏱️'
      },
      {
        name: 'Enforce Password Complexity',
        description: 'Require minimum length, mixed case, numbers, and special characters',
        effectiveness: 'Medium',
        implementation: 'Implement password strength meter and validation',
        icon: '🔒'
      },
      {
        name: 'Multi-Factor Authentication',
        description: 'Add additional authentication layer beyond passwords',
        effectiveness: 'Very High',
        implementation: 'Implement TOTP, SMS, or hardware token verification',
        icon: '📱'
      },
      {
        name: 'Account Lockout',
        description: 'Temporarily lock accounts after multiple failed attempts',
        effectiveness: 'Medium',
        implementation: 'Lock account for increasing duration after failed attempts',
        icon: '🔐'
      }
    ]
  },

  realWorldExamples: {
    title: 'Real-World Examples',
    cases: [
      {
        year: 2009,
        incident: 'RockYou Breach',
        description: '32 million passwords stored in plain text were exposed. Analysis showed 0.22% used "password" as their password.',
        impact: 'Led to creation of rockyou.txt, the most famous password dictionary',
        lesson: 'Never store passwords in plain text'
      },
      {
        year: 2012,
        incident: 'LinkedIn Breach',
        description: '6.5 million SHA-1 hashed passwords were stolen and quickly cracked using dictionary attacks.',
        impact: '90% of passwords were cracked within days due to lack of salting',
        lesson: 'Always use salts with hash functions'
      },
      {
        year: 2013,
        incident: 'Adobe Breach',
        description: '153 million user accounts compromised with weakly encrypted passwords.',
        impact: 'Common passwords like "123456" were used by millions of users',
        lesson: 'Enforce strong password policies'
      },
      {
        year: 2016,
        incident: 'Yahoo Breach',
        description: '500 million accounts compromised, many passwords cracked via dictionary attacks.',
        impact: 'Demonstrated need for modern password hashing',
        lesson: 'Migrate from weak to strong hashing algorithms'
      }
    ]
  },

  statistics: {
    title: 'Attack Statistics',
    data: {
      crackingSpeed: {
        md5: '200 billion hashes/second (GPU)',
        sha1: '63 billion hashes/second (GPU)',
        sha256: '2 billion hashes/second (GPU)',
        bcrypt: '71,000 hashes/second (GPU)',
        argon2: '1,000-10,000 hashes/second (configured)'
      },
      timeToCheck: {
        '8-char lowercase (md5)': '< 1 second',
        '8-char mixed (md5)': '< 1 hour',
        '8-char lowercase (bcrypt)': '~1 day',
        '8-char mixed (bcrypt)': '~5 years',
        '12-char mixed (bcrypt)': '~34,000 years'
      },
      commonPasswordUsage: {
        '123456': '0.62% of all passwords',
        'password': '0.19% of all passwords',
        'Top 10 passwords': '6.3% of all users',
        'Top 100 passwords': '14.2% of all users',
        'Top 10,000 passwords': '53.7% of all users'
      }
    }
  },

  bestPractices: {
    forDevelopers: [
      'Never store passwords in plain text',
      'Use bcrypt, Argon2, or scrypt for password hashing',
      'Generate unique, random salt for each password',
      'Implement proper cost factors (bcrypt: 12-14 rounds)',
      'Add rate limiting and account lockout mechanisms',
      'Use secure session management',
      'Implement proper error handling without revealing info',
      'Keep hashing libraries updated',
      'Use HTTPS for all authentication endpoints',
      'Consider implementing passwordless authentication'
    ],
    forUsers: [
      'Use unique passwords for each account',
      'Create passwords with 15+ characters',
      'Include mix of uppercase, lowercase, numbers, and symbols',
      'Avoid dictionary words and common patterns',
      'Use a password manager',
      'Enable two-factor authentication wherever available',
      'Never share passwords',
      'Change passwords if breach is suspected',
      'Avoid password hints that are easy to guess',
      'Use passphrases instead of single words'
    ]
  }
};

// Get content by section
export const getContentBySection = (section) => {
  return educationalContent[section] || null;
};

// Get all section titles
export const getAllSectionTitles = () => {
  return Object.keys(educationalContent).map(key => ({
    key,
    title: educationalContent[key].title
  }));
};

export default educationalContent;
