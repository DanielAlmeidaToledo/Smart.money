import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import cn from 'classnames';
import userPool from '../../user-pool';
import './Signin.scss';

type SigninProps = {
  className?: string;
};

const Signin: React.FC<SigninProps> = ({ className }) => {
  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    userPool.getCurrentUser()?.setAuthenticationFlowType('AUTHORIZATION_CODE');

    const user = new CognitoUser({
      Pool: userPool,
      Username: username
    });

    user.setAuthenticationFlowType('AUTHORIZATION_CODE');

    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('onSuccess:', result);
      },
      onFailure: (err) => {
        console.error('onFailure:', err);
      }
    });
  };

  return (
    <div className={cn(className)}>
      <h1>Signin</h1>
      <form onSubmit={onSignin}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
};

export default Signin;
