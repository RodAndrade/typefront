import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { updateProfileSchema } from './schemas';
import { toast } from '@components/ui/use-toast';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { SheetFooter } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { useApp } from '@hooks/app';

export function ProfileForm() {
  const { user } = useApp();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    // await updateProfile(data)
    // router.refresh()
    console.log(data);

    toast({
      title: 'Sucesso',
      description: 'Seu perfil foi atualizado com sucesso.',
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu email" disabled {...field} />
                </FormControl>
                <FormMessage className="text-black/60 dark:text-white text-sm">
                  Para atualizar seu endereço de e-mail, por favor, entre em
                  contato com nosso suporte em support@rocketnova.com.br.
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <SheetFooter className="mt-auto">
          <Button disabled={form.formState.isLoading} type="submit">
            {form.formState.isSubmitting && 'Salvando...'}
            {!form.formState.isSubmitting && 'Salvar alterações'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
