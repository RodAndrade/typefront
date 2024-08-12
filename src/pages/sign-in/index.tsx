import AuthLayout from '@layouts/auth';
import SignInForm from '@components/auth/SignInForm';

export default function AuthSignInPage() {
  return (
    <AuthLayout page="sign-in">
      <SignInForm />
    </AuthLayout>
  );
}
