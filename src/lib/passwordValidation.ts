export const PASSWORD_MAX_LENGTH = 128;

export function validateStrongPassword(password: string) {
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return `La contraseña debe tener máximo ${PASSWORD_MAX_LENGTH} caracteres.`;
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return "La contraseña debe incluir mayúscula, minúscula y número.";
  }

  return null;
}
