import { useState } from 'react';

import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AuthServices from '@services/auth';
import { RoutesConstants } from '@constants/routes';
import Link from 'next/link';
import { z } from 'zod';
import { signUpSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { toast } from '@components/ui/use-toast';

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    reValidateMode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const signUpResponse = await AuthServices.signUp(data);
    if (signUpResponse) {
      toast({
        title: 'Sucesso!',
        description:
          'Seu cadastro foi realizado com sucesso, aguarde um usuário aprovar o seu acesso.',
      });
      return router.push(RoutesConstants.SIGN_IN);
    }

    setLoading(false);
    toast({
      title: 'Ops!',
      description: 'Erro ao realizar cadastro, por favor, tente novamente.',
    });
  });

  return (
    <>
      <h2 className="text-3xl font-extrabold text-left">Bem vindo</h2>
      <p className="mb-8 text-gray-800 text-left">Cadastre uma nova conta</p>
      <Form {...form}>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="space-y-2 mb-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome completo"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@dominio.com"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 mt-2 mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      type="password"
                      {...field}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 mt-2 mb-8">
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmação de senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      type="password"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Cadastrar'}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-left">
        <p>
          Você já tem uma conta?{' '}
          <Link href="/sign-in" className="text-primary">
            Entrar
          </Link>
        </p>
      </div>
    </>
  );
}
