import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useApp } from '@hooks/app';
import {
  LockClosedIcon,
  MixerVerticalIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import AuthServices from '@services/auth';
import { cn } from '@utils/classname';
import { getInitials } from '@utils/user';
import { usePathname, useRouter } from 'next/navigation';

export function UserDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useApp();

  const isActive = (path: string) => {
    return pathname === path;
  };

  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-auto flex items-center justify-between w-full space-x-4 !px-0 hover:no-underline"
        >
          <div className="flex flex-col flex-1 space-y-1 text-right text-black dark:text-white">
            {user.name && (
              <p className=" font-medium leading-none">{user.name}</p>
            )}
          </div>

          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-white">
              {getInitials(user.name || user.email)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-2 pt-1">
          <div className="flex flex-col space-y-1">
            <p className="font-medium leading-none truncate">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn(isActive('/app/settings') && 'btn-active')}
            onClick={() => router.push('/app/settings')}
          >
            <MixerVerticalIcon className="w-3 h-3 mr-3" />
            Configuraçoes
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            className={cn(isActive('/app/billing') && 'btn-active')}
            onClick={() => router.push('/app/billing')}
          >
            <RocketIcon className="w-3 h-3 mr-3" />
            Financeiro
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            AuthServices.signOut();
          }}
        >
          <LockClosedIcon className="w-3 h-3 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
