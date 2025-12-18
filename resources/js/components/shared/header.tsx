import { Link } from '@inertiajs/react';
import { ChevronDown, Instagram, SearchIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '../ui/input-group';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { Separator } from '../ui/separator';

export default function Header() {
    return (
        <header className="px-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between py-1.5">
                    <p className="text-xs">
                        {new Date().toLocaleDateString('id-ID', {
                            dateStyle: 'full',
                        })}{' '}
                        :{' '}
                        {new Date().toLocaleTimeString('id-ID', {
                            timeStyle: 'medium',
                        })}
                    </p>
                    <div className="flex gap-1">
                        <Instagram className="mr-2 inline-block size-4" />
                        <Instagram className="mr-2 inline-block size-4" />
                        <Instagram className="mr-2 inline-block size-4" />
                        <Instagram className="mr-2 inline-block size-4" />
                    </div>
                </div>
                <Separator className="rounded-full border-1" />
                <div className="flex flex-row items-center justify-between pt-1.5">
                    <img src="/logo.png" alt="Logo" className="h-8" />
                    <nav>
                        <NavigationMenu>
                            <NavigationMenuList className="flex-wrap">
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href="/home">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href="/berita?id=1">Hit Way</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuButton
                                    title="Nasional"
                                    items={[
                                        'Nasional',
                                        'IKN',
                                        'Jakarta',
                                        ['Nasional', 'IKN', 'Jakarta'],
                                    ]}
                                />
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                    <div>
                        <InputGroup className="bg-primary py-5 pl-1">
                            <InputGroupInput
                                className="mr-2 h-8 rounded-sm bg-primary-foreground"
                                placeholder="Cari Berita"
                            />
                            <InputGroupAddon
                                align={'inline-end'}
                                className="text-primary-foreground"
                            >
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </header>
    );
}

export function Header2() {
    return (
        <header className="px-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between py-1.5">
                    <p className="text-xs">
                        {new Date().toLocaleDateString('id-ID', {
                            dateStyle: 'full',
                        })}{' '}
                        :{' '}
                        {new Date().toLocaleTimeString('id-ID', {
                            timeStyle: 'medium',
                        })}
                    </p>
                    <div className="flex gap-1">
                        <Instagram className="mr-2 inline-block size-4" />
                        <Instagram className="mr-2 inline-block size-4" />
                        <Instagram className="mr-2 inline-block size-4" />
                        <Instagram className="mr-2 inline-block size-4" />
                    </div>
                </div>
                <Separator className="rounded-full border-1" />
                <div className="flex flex-row items-center justify-between pt-1.5">
                    <img src="/logo.png" alt="Logo" className="h-8" />
                    <nav>
                        <NavigationMenu>
                            <NavigationMenuList className="flex-wrap">
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href="/home">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href="/berita?id=1">Hit Way</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuButton
                                    title="Nasional"
                                    items={[
                                        'Nasional',
                                        'IKN',
                                        'Jakarta',
                                        ['Nasional', 'IKN', 'Jakarta'],
                                    ]}
                                />
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                </div>
            </div>
        </header>
    );
}

function NavigationMenuButton({
    title,
    items,
}: {
    title: React.ReactNode;
    items: (string | string[])[];
}) {
    const [open, setOpen] = useState(false);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuTrigger
                asChild
                onMouseEnter={() => setOpen(true)}
                className={navigationMenuTriggerStyle()}
            >
                <Button
                    variant="ghost"
                    className="relative text-primary before:absolute before:inset-x-3 before:-top-3 before:h-1 before:rounded-md before:bg-primary"
                >
                    {title}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onMouseLeave={() => setOpen(false)}
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                }}
                className="w-max"
            >
                {items.map((item, index) => (
                    <Fragment key={index}>
                        {Array.isArray(item) ? (
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {item[0]}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className="w-max">
                                    {item.slice(1).map((subItem, subIndex) => (
                                        <DropdownMenuItem
                                            key={subIndex}
                                            asChild
                                        >
                                            <Link href="#" className="w-full">
                                                {subItem}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        ) : (
                            <>
                                <DropdownMenuItem>
                                    <Link href="#" className="w-full">
                                        {item}
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
