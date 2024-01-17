export const validInput = (
  input: string,
): { username: string; valid: RegExpMatchArray } => {
  const username = input.substring(5, input.length).trim();

  const valid = username.match(
    /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g,
  );

  return { username, valid };
};
