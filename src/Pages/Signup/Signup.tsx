import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import cn from 'classnames';
import userPool from '../../user-pool';
import './Signup.scss';

type SignupProps = {
  className?: string;
};

const Signup: React.FC<SignupProps> = ({ className }) => {
  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;

    userPool.signUp(
      username,
      password,
      [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email
        })
      ],
      [],
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(data);
      }
    );
  };

  return (
    <div className={cn(className)}>
      <h1>Signup</h1>
      <form onSubmit={onSignup}>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
