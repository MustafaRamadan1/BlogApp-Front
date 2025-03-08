const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-red-500 font-semibold  text-[0.7rem]">{message}</p>;
};

export default ErrorMessage;
