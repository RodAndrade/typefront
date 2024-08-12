export interface IntegrationAuthURLResponse {
  url: string;
}

export type IntegrationsResponse = IntegrationType[];

export type IntegrationType = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  credential: string | null;
  customerId: string;
  enabled: boolean;
  createdAt: string;
};

export interface IntegrationLogType {
  id: number;
  provider: string;
  syncFrom: string;
  syncTo: string;
  project: IntegrationLogProjectType;
  status: string;
  start: string;
  end?: string;
  updatedAt: string;
  createdAt: string;
}

export interface IntegrationLogProjectType {
  id: number;
  name: string;
  active: boolean;
}

export type IntegrationsLogResponse = IntegrationLogType[];
