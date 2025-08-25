interface Field {
  name: string;
  email: string;
  password: string;
  value: string;
  phone: string;
}

interface ValidationResult {
  validate: boolean;
  error: string;
}

const useValidation = () => {
  const validateUserName = (name: Field["name"]): ValidationResult => {
    const result = /^[a-zA-Z0-9]+$/.test(name);
    return {
      validate: result,
      error: result ? "" : "UserName must contain only a-z/A-Z/0-9",
    };
    return validateExist(name);
  };

  const validateEmail = (email: Field["email"]): ValidationResult => {
    const result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return {
      validate: result,
      error: result ? "" : "Please provide valid email",
    };
    return validateExist(email);
  };

  const validatePassword = (password: Field["password"]): ValidationResult => {
    const result = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
    return {
      validate: result,
      error: result ? "" : "Please provide a strong password",
    };
    return validateExist(password);
  };

  const validatePhone = (phone: Field["phone"]): ValidationResult => {
    const result = /^\d{10}$/.test(phone);
    return {
      validate: result,
      error: result ? "" : "Please provide a valid phone number",
    };
    return validateExist(phone);
  };

  const validateExist = (value: Field["value"]): ValidationResult => {
    const result = value.trim() !== "";
    return {
      validate: result,
      error: result ? "" : "This field is required",
    };
  };

  return {
    validateUserName,
    validateEmail,
    validatePassword,
    validateExist,
    validatePhone,
  };
};

export default useValidation;
