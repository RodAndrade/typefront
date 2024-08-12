import { RequestProvider } from '@providers/request';
import { ProjectCreateType, ProjectsResponse, ProjectType } from './types';

export default class IntegrationProjectsServices {
  static async get(id: ProjectType['id']) {
    return RequestProvider.withAuth<ProjectsResponse>(`/api/v1/projects/${id}`);
  }

  static async getAll() {
    return RequestProvider.withAuth<ProjectsResponse>('/api/v1/projects');
  }

  static async create(data: ProjectCreateType) {
    return RequestProvider.withAuth<ProjectsResponse>(`/api/v1/projects`, {
      method: 'POST',
      data,
    });
  }

  static async update(id: ProjectType['id'], data: ProjectCreateType) {
    return RequestProvider.withAuth<ProjectsResponse>(
      `/api/v1/projects/${id}`,
      {
        method: 'PUT',
        data,
      },
    );
  }

  static async delete(id: ProjectType['id']) {
    return RequestProvider.withAuth<ProjectsResponse>(
      `/api/v1/projects/${id}`,
      {
        method: 'DELETE',
      },
    );
  }
}
