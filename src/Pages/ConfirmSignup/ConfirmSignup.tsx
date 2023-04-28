import { CognitoUser } from 'amazon-cognito-identity-js';
import cn from 'classnames';
import userPool from '../../user-pool';
import './ConfirmSignup.scss';

type ConfirmSignupProps = {
  className?: string;
};

const ConfirmSignup: React.FC<ConfirmSignupProps> = ({ className }) => {
  const handleConfirmSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const confirmationCode = (e.currentTarget[1] as HTMLInputElement).value;

    console.log(username, confirmationCode);

    const user = new CognitoUser({
      Pool: userPool,
      Username: username
    });

    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(result);
    });
  };

  return (
    <div className={cn(className)}>
      <h1>Confirm Signup</h1>
      <form onSubmit={handleConfirmSignup}>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Confirmation Code" />
        <button type="submit">Confirm Signup</button>
      </form>
    </div>
  );
};

export default ConfirmSignup;
