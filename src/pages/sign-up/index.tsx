import AuthLayout from '@layouts/auth';
import SignUpForm from '@components/auth/SignUpForm';

export default function AuthSignInPage() {
  return (
    <AuthLayout page="sign-up">
      <SignUpForm />
    </AuthLayout>
  );
}
