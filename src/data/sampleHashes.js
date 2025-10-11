// Pre-generated sample hashes for demo purposes
// Password: "password"
export const sampleHashes = {
  md5: [
    {
      hash: '5f4dcc3b5aa765d61d8327deb882cf99',
      password: 'password',
      algorithm: 'md5',
      difficulty: 'easy'
    },
    {
      hash: '098f6bcd4621d373cade4e832627b4f6',
      password: 'test',
      algorithm: 'md5',
      difficulty: 'easy'
    },
    {
      hash: 'e10adc3949ba59abbe56e057f20f883e',
      password: '123456',
      algorithm: 'md5',
      difficulty: 'easy'
    },
    {
      hash: '25d55ad283aa400af464c76d713c07ad',
      password: '12345678',
      algorithm: 'md5',
      difficulty: 'easy'
    },
    {
      hash: 'd8578edf8458ce06fbc5bb76a58c5ca4',
      password: 'qwerty',
      algorithm: 'md5',
      difficulty: 'easy'
    },
    {
      hash: '5d2e19393cc5ef67d456b29f233eb1bc',
      password: 'admin',
      algorithm: 'md5',
      difficulty: 'easy'
    },
    {
      hash: '1a1dc91c907325c69271ddf0c944bc72',
      password: 'pass',
      algorithm: 'md5',
      difficulty: 'easy'
    },
    {
      hash: '827ccb0eea8a706c4c34a16891f84e7b',
      password: '12345',
      algorithm: 'md5',
      difficulty: 'easy'
    }
  ],
  sha1: [
    {
      hash: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
      password: 'password',
      algorithm: 'sha1',
      difficulty: 'easy'
    },
    {
      hash: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      password: 'test',
      algorithm: 'sha1',
      difficulty: 'easy'
    },
    {
      hash: '7c4a8d09ca3762af61e59520943dc26494f8941b',
      password: '123456',
      algorithm: 'sha1',
      difficulty: 'easy'
    },
    {
      hash: '7c222fb2927d828af22f592134e8932480637c0d',
      password: '12345678',
      algorithm: 'sha1',
      difficulty: 'easy'
    },
    {
      hash: 'b1b3773a05c0ed0176787a4f1574ff0075f7521e',
      password: 'qwerty',
      algorithm: 'sha1',
      difficulty: 'easy'
    },
    {
      hash: 'd033e22ae348aeb5660fc2140aec35850c4da997',
      password: 'admin',
      algorithm: 'sha1',
      difficulty: 'easy'
    },
    {
      hash: '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684',
      password: 'pass',
      algorithm: 'sha1',
      difficulty: 'easy'
    },
    {
      hash: '8cb2237d0679ca88db6464eac60da96345513964',
      password: '12345',
      algorithm: 'sha1',
      difficulty: 'easy'
    }
  ],
  sha256: [
    {
      hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      password: 'password',
      algorithm: 'sha256',
      difficulty: 'medium'
    },
    {
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      password: 'test',
      algorithm: 'sha256',
      difficulty: 'medium'
    },
    {
      hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      password: '123456',
      algorithm: 'sha256',
      difficulty: 'medium'
    },
    {
      hash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
      password: '12345678',
      algorithm: 'sha256',
      difficulty: 'medium'
    },
    {
      hash: '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5',
      password: 'qwerty',
      algorithm: 'sha256',
      difficulty: 'medium'
    },
    {
      hash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
      password: 'admin',
      algorithm: 'sha256',
      difficulty: 'medium'
    }
  ]
};

// Common passwords for dictionary (subset of rockyou.txt)
export const commonPasswords = [
  'password', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
  'baseball', '111111', 'iloveyou', 'master', 'sunshine',
  'ashley', 'bailey', 'passw0rd', 'shadow', '123123',
  'password1', 'test', 'pass', 'admin', 'welcome',
  '12345', '123456789', 'football', 'princess', 'login',
  'hello', 'charlie', 'jordan', 'thomas', 'buster',
  'killer', 'computer', 'michael', 'soccer', 'freedom',
  'whatever', 'internet', 'starwars', 'golfer', 'cookie',
  'summer', 'access', 'andrew', 'cheese', 'soccer',
  'pepper', 'rangers', 'hunter', 'jennifer', '123qwe',
  'target', 'secret', 'rainbow', 'george', 'coffee',
  'junior', 'midnight', 'batman', 'jessica', 'daniel',
  'lovely', 'samsung', 'hockey', 'knight', 'flower',
  'nicholas', 'junior', 'windows', 'silver', 'tiger',
  'forever', 'purple', 'online', 'banana', 'joshua',
  'orange', 'password123', 'test123', 'admin123', 'welcome123'
];

// Get sample hash by algorithm
export const getSampleHashByAlgorithm = (algorithm) => {
  return sampleHashes[algorithm] ? sampleHashes[algorithm][0] : null;
};

// Get random sample hash
export const getRandomSampleHash = (algorithm) => {
  const hashes = sampleHashes[algorithm];
  if (!hashes || hashes.length === 0) return null;
  return hashes[Math.floor(Math.random() * hashes.length)];
};

// Get all hashes for an algorithm
export const getAllHashesByAlgorithm = (algorithm) => {
  return sampleHashes[algorithm] || [];
};

export default sampleHashes;
