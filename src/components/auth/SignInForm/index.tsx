import { useState } from 'react';

import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import AuthServices from '@services/auth';
import { RoutesConstants } from '@constants/routes';
import Link from 'next/link';
import { toast } from '@components/ui/use-toast';

export default function SignInForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const accessToken = await AuthServices.signIn(data.email, data.password);
    if (accessToken) {
      return router.push(RoutesConstants.HOME);
    }

    setLoading(false);
    toast({
      title: 'Ops!',
      description: 'Erro ao realizar login, por favor, tente novamente.',
    });
  });

  return (
    <>
      <h2 className="text-3xl font-extrabold text-left">Bem vindo de volta</h2>
      <p className="mb-8 text-gray-800 text-left">Entre com sua conta</p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-2 mb-4">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            placeholder="email@dominio.com"
            required
            type="email"
            {...form.register('email')}
          />
        </div>
        <div className="space-y-2 mt-2 mb-8">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            placeholder="Senha"
            required
            type="password"
            {...form.register('password')}
          />
        </div>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <div className="mt-8 text-left">
        <p>
          Você não tem conta?{' '}
          <Link href="/sign-up" className="text-primary">
            Cadastrar
          </Link>
        </p>
      </div>
    </>
  );
}
