import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@components/ui/table';
import { Badge } from '@components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { UserType } from '@services/users/types';
import {
  MdCancel,
  MdCheck,
  MdCheckCircle,
  MdDelete,
  MdMoreVert,
} from 'react-icons/md';
import { useApp } from '@hooks/app';

interface Props {
  users: UserType[];
  loading: boolean;
  changeStatus: (userId: number, status: boolean) => void;
  deleteUser: (userId: number) => void;
}

interface StatusBagdeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBagdeProps) => {
  const statusMap: Record<string, any> = {
    accepted: {
      label: 'Aprovado',
      className: 'bg-green-600 text-white text-sm',
    },
    denied: {
      label: 'Reprovado',
      className: 'bg-red-600 text-white text-sm',
    },
    pending: {
      label: 'Pendente',
      className: 'bg-muted text-black-50 text-sm',
    },
  };

  const _status = statusMap?.[status.toLowerCase()] ?? {
    label: '-',
    variant: 'outline',
    className: 'bg-muted text-black-50 text-sm',
  };

  return (
    <Badge variant="secondary" className={_status.className}>
      {_status.label}
    </Badge>
  );
};

export default function UsersTable({
  users,
  loading,
  changeStatus,
  deleteUser,
}: Props) {
  const { user } = useApp();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Status</TableHead>
          {user?.isSupport && (
            <TableHead className="text-center">Suporte</TableHead>
          )}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={`user:${u.id}`}>
            <TableCell className="font-medium w-[250px]">{u.name}</TableCell>
            <TableCell className="text-center">{u.email}</TableCell>
            <TableCell className="text-center w-[150px]">
              <StatusBadge status={u.status} />
            </TableCell>
            {user?.isSupport && (
              <TableCell className="text-center w-[75px]">
                {u.isSupport && (
                  <MdCheck className="mx-auto text-green-500 text-xl" />
                )}
              </TableCell>
            )}
            <TableCell className="text-right w-[45px]">
              {user?.id !== u.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MdMoreVert className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {(u.status === 'ACCEPTED' || u.status === 'PENDING') && (
                      <DropdownMenuItem
                        disabled={loading}
                        onClick={() => changeStatus(u.id, false)}
                      >
                        <MdCancel className="text-red-600 mr-2" /> Reprovar
                      </DropdownMenuItem>
                    )}

                    {(u.status === 'DENIED' || u.status === 'PENDING') && (
                      <>
                        <DropdownMenuItem
                          disabled={loading}
                          onClick={() => changeStatus(u.id, true)}
                        >
                          <MdCheckCircle className="text-green-600 mr-2" />{' '}
                          Aprovar
                        </DropdownMenuItem>
                      </>
                    )}

                    {(user?.isSupport || !u?.isSupport) && (
                      <>
                        <DropdownMenuItem
                          disabled={loading}
                          onClick={() => deleteUser(u.id)}
                        >
                          <MdDelete className="text-black mr-2" /> Deletar
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
