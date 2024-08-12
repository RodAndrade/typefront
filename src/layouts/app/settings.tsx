import { PropsWithChildren } from 'react';
import { SettingsSidebar } from '@components/settings/Sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

interface Props extends PropsWithChildren {
  title: string;
  description?: string;
}

export default function SettingsLayout({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="grid grid-cols-[15rem_1fr] gap-8">
      <SettingsSidebar />

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {!!description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </div>
  );
}
