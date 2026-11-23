
export const maskEmail = (email: string): string => {
  const [username, domain] = email.trim().split("@");

  if (!username || !domain) return email;

  const visibleChars = username.length > 2 ? 1 : 0;
  const maskedUsername =
    username.slice(0, visibleChars) +
    "*".repeat(Math.max(username.length - visibleChars, 3));

  return `${maskedUsername}@${domain}`;
};
