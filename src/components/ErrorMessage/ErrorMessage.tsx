type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={{ color: "red", textAlign: "center", margin: "20px 0" }}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

//React.FC<ErrorMessageProps> — указывает, что компонент является функциональным компонентом (React.FC) и принимает ErrorMessageProps в качестве пропсов.
