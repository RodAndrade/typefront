import AppLayout from '@layouts/app';
import SettingsLayout from '@layouts/app/settings';
import { ThemeForm } from '@components/settings/Theme';

export default function () {
  return (
    <AppLayout title="Configurações">
      <SettingsLayout
        title="Tema"
        description="Selecione o tema para o painel."
      >
        <ThemeForm />
      </SettingsLayout>
    </AppLayout>
  );
}
