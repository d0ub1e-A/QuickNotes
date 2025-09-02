export const isValidMail = (mail: string): boolean => mail !== '' ? true : false;

export const isValidPassword = (pass: string): boolean => pass.length >= 8 ? true : false;

export const isValidName = (name: string): boolean => name !== '' ? true : false;
