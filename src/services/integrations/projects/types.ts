export type ProjectsResponse = ProjectType[];

export interface ProjectType {
  id: number;
  name: string;
  projectIntegration?: {
    customerId: string | null;
    integration: {
      user: {
        id: number;
        name: string;
      };
    };
  };
  createdAt: string;
}

export interface ProjectCreateType {
  name: string;
  customerId: string;
}

export interface ProjectUpdateType {
  id: number;
  name: string;
  customerId: string;
}
