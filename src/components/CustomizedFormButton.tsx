function buttonStyles(size: string) {
  switch (size) {
    case "large":
      return {
        width: "100%",
        borderRadius: "0.6rem",
        padding: "1.2rem"
      };
    case "small":
      return {
        borderRadius: "0.6rem",
        paddingInline: "1rem",
        paddingBlock: "0.5rem"
      };
    default:
      return {
        padding: "1.2rem"
      };
  }
}

const CustomizedFormButton = ({
  onClick,
  size,
  children,
  type,
  disabled,
  className
}: {
  size: string;
  children: React.ReactNode;
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={buttonStyles(size)}
      className={` ${
        disabled
          ? "bg-slate-200 cursor-not-allowed"
          : " bg-yellow-400 cursor-pointer"
      }  text-white font-medium ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomizedFormButton;
