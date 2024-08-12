import AppLayout from '@layouts/app';
import SettingsLayout from '@layouts/app/settings';

import { ProfileForm } from '@components/settings/ProfileForm';

export default function () {
  return (
    <AppLayout title="Configurações">
      <SettingsLayout
        title="Perfil"
        description="Gerencie suas informações pessoais e preferências de conta."
      >
        <ProfileForm />
      </SettingsLayout>
    </AppLayout>
  );
}
