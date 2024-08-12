import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { cn } from '@utils/classname';

interface Props extends React.PropsWithChildren {
  title?: string;
  description?: string;
  open?: boolean;
  onChange?: (state: boolean) => void;
  className?: string;
}

export default function Modal({
  title,
  description,
  children,
  open,
  onChange,
  className,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        {!!title && (
          <DialogHeader>
            {!!title && <DialogTitle className="text-2xl">{title}</DialogTitle>}

            {!!description && (
              <DialogDescription className="!mt-0 text-sm">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
