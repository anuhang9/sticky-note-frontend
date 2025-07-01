import { Check, X } from "lucide-react";
interface PasswordStrengthMeterProps{
    password: string,
}

const PasswordCritearia = ({password}: PasswordStrengthMeterProps) => {
  const passwordRquirement = [
    { label: "At least 6 characters", requirement: password.length >= 6 },
    { label: "Contain uppercase letter", requirement: /[A-Z]/.test(password) },
    { label: "Contain lowercase letter", requirement: /[a-z]/.test(password) },
    { label: "At least 1 number ", requirement: /[\d]/.test(password) },
    {label: "At least 1 special character", requirement: /[^A-Za-z0-9]/.test(password)},
  ];
  return (
    <div className="mt-2 space-y-1">
      {passwordRquirement.map((item) => {
        return (
          <div key={item.label} className="flex items-center text-xs">
            {item.requirement ? (
              <Check className="size-4 text-blue-500 mr-2" />
            ) : (
              <X className="size-4 text-gray-500 mr-2" />
            )}
            <span
              className={item.requirement ? "text-blue-500" : "text-gray-400"}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[\d]/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strengthPassword = getStrength(password);
  const getColor = (strengthPassword:number) => {
    if (strengthPassword === 0) return "bg-red-500";
    if (strengthPassword === 1) return "bg-red-400";
    if (strengthPassword === 2) return "bg-yellow-500";
    if (strengthPassword === 3) return "bg-yellow-400";
    return "bg-blue-500";
  };
  const getStrengthText = (strengthPassword: number) => {
    if (strengthPassword === 0) return "Very Weak";
    if (strengthPassword === 1) return "Weak";
    if (strengthPassword === 2) return "Fair";
    if (strengthPassword === 3) return "Good";
    return "strong";
  };
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">Password Strength</span>
        <span className="text-xs text-gray-400">{getStrengthText(strengthPassword)}</span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                        ${
                          index < strengthPassword
                            ? getColor(strengthPassword)
                            : "bg-gray-600"
                        }`}
          />
        ))}
      </div>
      <PasswordCritearia password={password} />
    </div>
  );
};
