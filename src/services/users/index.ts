import { RequestProvider } from '@providers/request';
import { UsersResponse } from './types';

class UsersServices {
  static getAll() {
    return RequestProvider.withAuth<UsersResponse>('/api/users');
  }

  static status(id: number, state: boolean) {
    return RequestProvider.withAuth<UsersResponse>(
      `/api/users/${id}/status`,
      {
        method: 'PUT',
        data: {
          status: state ? 'ACCEPTED' : 'DENIED',
        },
      },
    );
  }

  static delete(id: number) {
    return RequestProvider.withAuth<UsersResponse>(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export default UsersServices;
