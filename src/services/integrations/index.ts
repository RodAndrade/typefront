import { RequestProvider } from '@providers/request';
import {
  IntegrationAuthURLResponse,
  IntegrationsLogResponse,
  IntegrationsResponse,
} from './types';

class IntegrationServices {
  static get() {
    return RequestProvider.withAuth<IntegrationsResponse>(
      '/api/v1/integrations',
    );
  }

  static googleAuthURL(customerId: string) {
    return RequestProvider.withAuth<IntegrationAuthURLResponse>(
      '/api/v1/integrations/google/auth',
      {
        params: {
          customerId,
        },
      },
    );
  }

  static googleCallback(code: string, state: string) {
    return RequestProvider.withAuth(
      '/api/v1/integrations/google/auth/callback',
      {
        params: {
          code,
          state,
        },
      },
    );
  }

  static enable(id: number, enable: boolean) {
    return RequestProvider.withAuth(`/api/v1/integrations/${id}/enable`, {
      method: 'POST',
      data: {
        enable,
      },
    });
  }

  static logs() {
    return RequestProvider.withAuth<IntegrationsLogResponse>(
      `/api/v1/integrations/logs`,
    );
  }
}

export default IntegrationServices;
