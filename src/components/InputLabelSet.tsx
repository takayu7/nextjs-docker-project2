import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface InputProps {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}

const InputLabelSet: React.FC<InputProps> = ({
  name,
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <Label htmlFor={name} className="text-sm font-medium text-maincolor">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || ""}
        value={value || ""}
        className="flex-1 border-0 border-b-2 border-b-gray-300 focus-visible:ring-0 focus-visible:border-b-[#F85F6A] rounded-none shadow-none"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputLabelSet;
