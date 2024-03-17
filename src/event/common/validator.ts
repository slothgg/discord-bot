export const validInput = (
  input: string,
): { username: string; valid: RegExpMatchArray } => {
  const content = input.split(' ');
  const username = content[1];

  const valid = username.match(
    /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g,
  );

  return { username, valid };
};
