// at least 2 characters followed by a space and at least another 2 characters
export const nameRegex = /^\p{L}{2,}\s\p{L}{2,}$/u;

// phone numbers can be tricky, this regex only checks for phone numbers valid in US and EU (but not worldwide, and also EU phone numbers also widely vary from coutry to country.
// it matches:
// optional country code (+[0-9][0-9][0-9])
// optional area code (xxx)
// phone number
// optional separators (-, space)
export const phoneRegex =
  /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{1,3}[-\s]?\d{1,4}[-\s]?\d{1,4}$/;