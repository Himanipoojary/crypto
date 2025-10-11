# Password Dictionary Files

## common-passwords.txt

This file contains a curated list of the most commonly used passwords based on real-world data breaches and security research.

### Purpose

This dictionary is intended **strictly for educational purposes** to demonstrate:
- How dictionary attacks work
- Why weak passwords are vulnerable
- The importance of strong password policies

### Sources

Password lists are based on research from:
- NordPass Most Common Passwords Report
- National Cyber Security Centre (NCSC) database
- HaveIBeenPwned breach analysis
- RockYou data breach (2009)

### Statistics

- **Total Passwords**: ~150 common passwords
- **Categories**: Numeric patterns, keyboard patterns, dictionary words, dates, names
- **Coverage**: Represents passwords used by millions of users worldwide

### Usage

The dictionary is loaded by the application's `useDictionary` hook and `dictionaryLoader` service.

To add more passwords:
1. Each password should be on a new line
2. Comments start with `#`
3. Blank lines are ignored
4. Keep passwords in order of likelihood for better performance

### Security Notice

⚠️ **Warning**: Never use any password from this list for real accounts!

These passwords are:
- Extremely weak and easily cracked
- Known to attackers worldwide
- Frequently used in automated attacks
- The first passwords tested in any breach attempt

### Recommended Password Practices

Instead of using common passwords:
1. Use 15+ character passwords
2. Include uppercase, lowercase, numbers, and symbols
3. Use unique passwords for each account
4. Use a password manager
5. Enable two-factor authentication
6. Never reuse passwords

### Expanding the Dictionary

To add more passwords for testing:
1. Research additional common passwords
2. Add them to this file (one per line)
3. Reload the application
4. Test the attack speed with larger dictionary

### Legal Disclaimer

This dictionary is provided for **educational and security testing purposes only** on systems where you have explicit permission. Unauthorized access to computer systems is illegal.

## File Format

- Plain text file (UTF-8 encoding)
- One password per line
- Lines starting with `#` are comments
- Blank lines are ignored
- Case-sensitive

## Additional Resources

For larger dictionaries:
- RockYou.txt (14+ million passwords)
- SecLists password lists
- CrackStation wordlist
- Weakpass.com collections

**Note**: This application uses a small subset for demonstration purposes to maintain browser performance.
