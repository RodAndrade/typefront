import { useEffect, useState } from 'react';

import UsersServices from '@services/users';

import AppLayout from '@layouts/app';
import SettingsLayout from '@layouts/app/settings';
import UsersTable from '@components/settings/Users/Table';
import { toast } from '@components/ui/use-toast';

import { UsersResponse } from '@services/users/types';

export default function () {
  const [users, setUsers] = useState<UsersResponse>([]);
  const [loading, setLoading] = useState(false);

  const handleUsers = async () => {
    setLoading(true);
    const _users = await UsersServices.getAll();
    if (_users?.error || !_users.data?.data) {
      return setLoading(false);
    }

    setUsers(_users.data?.data);
    setLoading(false);
  };

  const handleUserStatus = async (id: number, status: boolean) => {
    setLoading(true);

    const statusResponse = await UsersServices.status(id, status);
    if (statusResponse?.error) {
      setLoading(false);

      return toast({
        title: 'Ops!',
        description: 'Tivemos um erro ao atualizar o status do usuário',
      });
    }

    setLoading(false);
    handleUsers();
    return toast({
      title: 'Sucesso',
      description: 'Usuário atualizado com sucesso',
      color: 'success',
    });
  };

  const handleUserDelete = async (id: number) => {
    const response = window?.confirm?.(
      'Você tem certeza que deseja deletar o usuário?',
    );
    if (!response) {
      return;
    }

    setLoading(true);

    const statusResponse = await UsersServices.delete(id);
    if (statusResponse?.error) {
      setLoading(false);

      return toast({
        title: 'Ops!',
        description: 'Tivemos um erro ao deletar o usuário',
      });
    }

    setLoading(false);
    handleUsers();
    return toast({
      title: 'Sucesso',
      description: 'Usuário deletado com sucesso',
      color: 'success',
    });
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <AppLayout title="Configurações">
      <SettingsLayout
        title="Usuários"
        description="Gerencie os usuários e status."
      >
        <UsersTable
          users={users}
          loading={loading}
          changeStatus={handleUserStatus}
          deleteUser={handleUserDelete}
        />
      </SettingsLayout>
    </AppLayout>
  );
}
