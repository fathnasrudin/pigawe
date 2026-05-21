import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { SignoutButton } from "@/app/auth/protected/signout-button";
import { authClient } from "@/lib/auth-client";

export function ProfileDropdown() {
  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;
  if (error) return <div>error</div>;
  if (isPending) return <div>loading...</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="outline-none flex gap-2 items-center cursor-pointer"
        asChild
      >
        <div className="flex gap-4 items-center">
          <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center">
            {user && user.name[0]}
          </div>
          <p className="mr-auto">{user && user.name}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>

          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-500">
          <SignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
