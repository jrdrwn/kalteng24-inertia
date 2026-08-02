import { Config } from '@/types/entities';
import { Link } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronRight,
    X as CloseIcon,
    Menu as MenuIcon,
    SearchIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaTwitterSquare,
    FaYoutubeSquare,
} from 'react-icons/fa';
import { ModeToggle } from '../custom/mode-toggle';
import { Button } from '../ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader } from '../ui/drawer';
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
    InputGroupButton,
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

type NavItem = {
    label: string;
    href?: string;
    sub?: NavItem[];
};

const navigationItems: NavItem[] = [
    { label: 'BERANDA', href: '/' },
    { label: 'HITWAY', href: '/read-news/69_tengadah-sang-tingang' },
    {
        label: 'NASIONAL',
        href: '/search?jenis_rubrik=NASIONAL',
        sub: [
            {
                label: 'NASIONAL',
                href: '/search?jenis_kategori_rubrik=NASIONAL',
            },
            { label: 'IKN', href: '/search?jenis_kategori_rubrik=IKN' },
            { label: 'JAKARTA', href: '/search?jenis_kategori_rubrik=JAKARTA' },
            {
                label: 'KALIMANTAN',
                href: '/search?jenis_kategori_rubrik=KALIMANTAN',
            },
        ],
    },
    {
        label: 'KALTENG',
        href: '/search?jenis_kategori_rubrik=KALTENG',
        sub: [
            {
                label: 'Palangka Raya',
                href: '/search?jenis_kategori_rubrik=Palangka Raya',
            },
            {
                label: 'Kotawaringin Barat',
                href: '/search?jenis_kategori_rubrik=Kotawaringin Barat',
            },
            {
                label: 'Kotawaringin Timur',
                href: '/search?jenis_kategori_rubrik=Kotawaringin Timur',
            },
            {
                label: 'Barito Utara',
                href: '/search?jenis_kategori_rubrik=Barito Utara',
            },
            {
                label: 'Barito Selatan',
                href: '/search?jenis_kategori_rubrik=Barito Selatan',
            },
            { label: 'Kapuas', href: '/search?jenis_kategori_rubrik=Kapuas' },
            {
                label: 'Murung Raya',
                href: '/search?jenis_kategori_rubrik=Murung Raya',
            },
            {
                label: 'Barito Timur',
                href: '/search?jenis_kategori_rubrik=Barito Timur',
            },
            {
                label: 'Pulang Pisau',
                href: '/search?jenis_kategori_rubrik=Pulang Pisau',
            },
            {
                label: 'Gunung Mas',
                href: '/search?jenis_kategori_rubrik=Gunung Mas',
            },
            {
                label: 'Katingaan',
                href: '/search?jenis_kategori_rubrik=Katingan',
            },
            { label: 'Seruyan', href: '/search?jenis_kategori_rubrik=Seruyan' },
            {
                label: 'Lamandau',
                href: '/search?jenis_kategori_rubrik=Lamandau',
            },
            {
                label: 'Sukamara',
                href: '/search?jenis_kategori_rubrik=Sukamara',
            },
        ],
    },
    {
        label: 'METRO',
        href: '/search?jenis_rubrik=METRO',
        sub: [
            {
                label: 'KRIMINALITAS',
                href: '/search?jenis_kategori_rubrik=KRIMINALITAS',
            },
            {
                label: 'HUKUM & HAM',
                href: '/search?jenis_kategori_rubrik=HUKUM & HAM',
            },
        ],
    },
    {
        label: 'MITRA',
        href: '#',
        sub: [
            {
                label: 'Pemprov Kalteng',
                href: '/search?jenis_kategori_rubrik=Pemprov Kalteng',
            },
            {
                label: 'DPRD',
                sub: [
                    {
                        label: 'DPRD Kalteng',
                        href: '/search?jenis_kategori_rubrik=DPRD_Kalteng',
                    },
                    {
                        label: 'DPRD Palangka Raya',
                        href: '/search?jenis_kategori_rubrik=DPRD_Palangka_Raya',
                    },
                    {
                        label: 'DPRD Barito Utara',
                        href: '/search?jenis_kategori_rubrik=DPRD_Barito_Utara',
                    },
                    {
                        label: 'DPRD Murung Raya',
                        href: '/search?jenis_kategori_rubrik=DPRD_Murung_Raya',
                    },
                    {
                        label: 'DPRD Kapuas',
                        href: '/search?jenis_kategori_rubrik=DPRD_Kapuas',
                    },
                    {
                        label: 'DPRD Barito Selatan',
                        href: '/search?jenis_kategori_rubrik=DPRD_Barito_Selatan',
                    },
                    {
                        label: 'DPRD Katingan',
                        href: '/search?jenis_kategori_rubrik=DPRD_Katingan',
                    },
                    {
                        label: 'DPRD Gunung Mas',
                        href: '/search?jenis_kategori_rubrik=DPRD_Gunung_Mas',
                    },
                ],
            },
            {
                label: 'Pemkab/Pemko',
                sub: [
                    {
                        label: 'Pemko Palangka Raya',
                        href: '/search?jenis_kategori_rubrik=Pemko_Palangka_Raya',
                    },
                    {
                        label: 'Pemkab Barito Utara',
                        href: '/search?jenis_kategori_rubrik=Pemkab_Barito_Utara',
                    },
                    {
                        label: 'Pemkab Murung Raya',
                        href: '/search?jenis_kategori_rubrik=Pemkab_Murung_Raya',
                    },
                    {
                        label: 'Pemkab Kapuas',
                        href: '/search?jenis_kategori_rubrik=Pemkab_Kapuas',
                    },
                    {
                        label: 'Pemkab Barito Selatan',
                        href: '/search?jenis_kategori_rubrik=Pemkab_Barito_Selatan',
                    },
                    {
                        label: 'Pemkab Katingan',
                        href: '/search?jenis_kategori_rubrik=Pemkab_Katingan',
                    },
                    {
                        label: 'Pemkab Gunung Mas',
                        href: '/search?jenis_kategori_rubrik=Pemkab_Gunung_Mas',
                    },
                ],
            },
        ],
    },
    { label: 'OLAHRAGA', href: '/search?jenis_kategori_rubrik=Olahraga' },
];

interface ComponentProps {
    metadata: Config;
}

export default function Header({ metadata }: ComponentProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search') as string;
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('q', query);
        window.location.href = `/search?${currentParams.toString()}`;
    }

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
                    <p className="hidden text-xs md:block">
                        {metadata?.title} - {metadata?.motho}
                    </p>
                    <div className="flex gap-1">
                        <Link href={metadata?.fb || '#'}>
                            <FaFacebookSquare className="size-4 text-blue-600" />
                        </Link>
                        <Link href={metadata?.ig || '#'}>
                            <FaInstagramSquare className="size-4 text-pink-600" />
                        </Link>
                        <Link href={metadata?.tw || '#'}>
                            <FaTwitterSquare className="size-4 text-blue-400" />
                        </Link>
                        <Link href={metadata?.yt || '#'}>
                            <FaYoutubeSquare className="size-4 text-red-600" />
                        </Link>
                    </div>
                </div>
                <Separator className="rounded-full border-1" />
                <div className="flex flex-row items-center justify-between pt-1.5">
                    <Link href="/">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-8 dark:hidden"
                        />
                        <img
                            src="/logo-dark.png"
                            alt="Logo"
                            className="hidden h-8 dark:block"
                        />
                    </Link>
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <NavigationMenu>
                            <NavigationMenuList className="flex-wrap">
                                {navigationItems.map((item, idx) =>
                                    !item.sub ? (
                                        <NavigationMenuButton
                                            key={idx}
                                            label={item.label}
                                            href={item.href}
                                        />
                                    ) : (
                                        <NavigationMenuDropdownButton
                                            key={idx}
                                            label={item.label}
                                            items={item.sub}
                                        />
                                    ),
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                    <div className="flex items-center justify-end gap-2 lg:hidden">
                        <Link href="/search" className="block lg:hidden">
                            <Button variant={'ghost'}>
                                <SearchIcon />
                            </Button>
                        </Link>
                        <ModeToggle />

                        {/* Mobile Hamburger */}
                        <Button
                            size={'icon'}
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                            variant={'outline'}
                        >
                            <MenuIcon />
                        </Button>
                    </div>
                    <form
                        onSubmit={handleSearch}
                        className="hidden lg:flex lg:flex-row lg:items-center lg:justify-end lg:gap-2"
                    >
                        <ModeToggle />
                        <InputGroup className="bg-primary py-5 pl-1">
                            <InputGroupInput
                                className="mr-1 h-8 w-23 rounded-sm bg-primary-foreground xl:w-3xs 2xl:w-xs"
                                placeholder="Cari Berita"
                                name="search"
                            />
                            <InputGroupAddon
                                align={'inline-end'}
                                className="text-primary-foreground"
                            >
                                <InputGroupButton
                                    type="submit"
                                    size={'icon-sm'}
                                >
                                    <SearchIcon />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                </div>
            </div>
            {/* Mobile Navigation Drawer using Drawer component */}
            <Drawer
                open={mobileOpen}
                onOpenChange={setMobileOpen}
                direction="left"
            >
                <DrawerContent className="w-4/5 max-w-xs p-0">
                    <DrawerHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
                        <img src="/logo.png" alt="Logo" className="h-8" />
                        <DrawerClose asChild>
                            <Button
                                variant={'destructive'}
                                aria-label="Close menu"
                            >
                                <CloseIcon />
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <nav className="flex-1 overflow-y-auto py-2">
                        <MobileMenu
                            navigationItems={navigationItems}
                            onClose={() => setMobileOpen(false)}
                        />
                    </nav>
                </DrawerContent>
            </Drawer>
        </header>
    );
}

export function Header2({ metadata }: ComponentProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

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
                    <p className="hidden text-xs md:block">
                        {metadata?.title} - {metadata?.motho}
                    </p>
                    <div className="flex gap-1">
                        <Link href={metadata?.fb || '#'}>
                            <FaFacebookSquare className="size-4 text-blue-600" />
                        </Link>
                        <Link href={metadata?.ig || '#'}>
                            <FaInstagramSquare className="size-4 text-pink-600" />
                        </Link>
                        <Link href={metadata?.tw || '#'}>
                            <FaTwitterSquare className="size-4 text-blue-400" />
                        </Link>
                        <Link href={metadata?.yt || '#'}>
                            <FaYoutubeSquare className="size-4 text-red-600" />
                        </Link>
                    </div>
                </div>
                <Separator className="rounded-full border-1" />
                <div className="flex flex-row items-center justify-between pt-1.5">
                    <Link href="/">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-8 dark:hidden"
                        />
                        <img
                            src="/logo-dark.png"
                            alt="Logo"
                            className="hidden h-8 dark:block"
                        />
                    </Link>
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-4">
                        <NavigationMenu>
                            <NavigationMenuList className="flex-wrap">
                                {navigationItems.map((item, idx) =>
                                    !item.sub ? (
                                        <NavigationMenuButton
                                            key={idx}
                                            label={item.label}
                                            href={item.href}
                                        />
                                    ) : (
                                        <NavigationMenuDropdownButton
                                            key={idx}
                                            label={item.label}
                                            items={item.sub}
                                        />
                                    ),
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <ModeToggle />
                    </nav>
                    <div className="flex items-center justify-end gap-2 lg:hidden">
                        <ModeToggle />
                        {/* Mobile Hamburger */}

                        <Button
                            variant={'outline'}
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <MenuIcon />
                        </Button>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation Drawer using Drawer component */}
            <Drawer
                open={mobileOpen}
                onOpenChange={setMobileOpen}
                direction="left"
            >
                <DrawerContent className="w-4/5 max-w-xs p-0">
                    <DrawerHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
                        <img src="/logo.png" alt="Logo" className="h-8" />
                        <DrawerClose asChild>
                            <Button
                                variant={'destructive'}
                                aria-label="Close menu"
                            >
                                <CloseIcon />
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <nav className="flex-1 overflow-y-auto py-2">
                        <MobileMenu
                            navigationItems={navigationItems}
                            onClose={() => setMobileOpen(false)}
                        />
                    </nav>
                </DrawerContent>
            </Drawer>
        </header>
    );
}

function NavigationMenuButton({
    label,
    href,
}: {
    label: string;
    href?: string;
}) {
    // Cek apakah menu ini aktif
    const isActive =
        typeof window !== 'undefined' && window.location.pathname === href;
    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                asChild
                className={
                    navigationMenuTriggerStyle() +
                    (isActive
                        ? ' relative text-primary before:absolute before:inset-x-3 before:-top-3 before:h-1 before:rounded-md before:bg-primary'
                        : ' text-muted-foreground')
                }
            >
                <Link href={href}>{label}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function NavigationMenuDropdownButton({
    label,
    items,
}: {
    label: string;
    items: NavItem[];
}) {
    const [open, setOpen] = useState(false);

    // Cek apakah salah satu submenu aktif
    const isAnyChildActive = (menuItems: NavItem[]): boolean =>
        menuItems.some((item) =>
            item.sub
                ? isAnyChildActive(item.sub)
                : typeof window !== 'undefined' &&
                  window.location.pathname === item.href,
        );

    const isActive = isAnyChildActive(items);

    // Helper to render submenus recursively
    const renderMenuItems = (menuItems: NavItem[]) =>
        menuItems.map((item, idx) => {
            if (item.sub) {
                return (
                    <DropdownMenuSub key={idx}>
                        <DropdownMenuSubTrigger>
                            {item.label}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-max">
                            {renderMenuItems(item.sub)}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            }
            return (
                <DropdownMenuItem key={idx} asChild>
                    <Link href={item.href || '#'} className="w-full">
                        {item.label}
                    </Link>
                </DropdownMenuItem>
            );
        });

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuTrigger
                asChild
                onMouseEnter={() => setOpen(true)}
                className={
                    navigationMenuTriggerStyle() +
                    (isActive
                        ? ' relative text-primary before:absolute before:inset-x-3 before:-top-3 before:h-1 before:rounded-md before:bg-primary'
                        : ' text-muted-foreground')
                }
            >
                <Button
                    variant="ghost"
                    className={
                        isActive ? 'text-primary' : 'text-muted-foreground'
                    }
                >
                    {label}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onMouseLeave={() => setOpen(false)}
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="w-max"
            >
                {renderMenuItems(items)}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function MobileMenu({
    navigationItems,
    onClose,
}: {
    navigationItems: NavItem[];
    onClose: () => void;
}) {
    // Simpan semua key dropdown yang terbuka (support nested)
    const [openIndexes, setOpenIndexes] = useState<string[]>([]);

    // Toggle: buka hanya key ini dan parent-nya, tutup semua dropdown lain di level yang sama
    const toggleIndex = (key: string) => {
        setOpenIndexes((prev) => {
            // Jika sudah terbuka, tutup key ini dan semua child-nya
            if (prev.includes(key)) {
                return prev.filter((k) => k !== key && !k.startsWith(key));
            } else {
                // Tutup semua key yang satu level dengan key ini (kecuali parent chain)
                const keep = prev.filter(
                    (k) => key.startsWith(k) || k.startsWith(key),
                );
                return [...keep, key];
            }
        });
    };

    const renderMobileMenu = (items: NavItem[], parentIdx = '') =>
        items.map((item, idx) => {
            const key = `${parentIdx}${idx}`;
            const isOpen = openIndexes.includes(key);
            const isActive = !item.sub
                ? typeof window !== 'undefined' &&
                  window.location.pathname === item.href
                : item.sub &&
                  item.sub.some(
                      (sub: NavItem) =>
                          typeof window !== 'undefined' &&
                          window.location.pathname === sub.href,
                  );
            return (
                <div key={key}>
                    <div
                        className={
                            'flex items-center justify-between px-4 py-2' +
                            (isActive
                                ? ' font-semibold text-primary'
                                : ' text-muted-foreground')
                        }
                    >
                        {item.sub ? (
                            <>
                                <button
                                    className="flex-1 text-left"
                                    onClick={() => toggleIndex(key)}
                                >
                                    {item.label}
                                </button>
                                <button
                                    onClick={() => toggleIndex(key)}
                                    aria-label="Toggle submenu"
                                >
                                    <ChevronRight
                                        className={
                                            'transition-transform ' +
                                            (isOpen ? 'rotate-90' : '')
                                        }
                                    />
                                </button>
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className="flex-1"
                                onClick={onClose}
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                    {item.sub && isOpen && (
                        <div className="ml-2 border-l pl-4">
                            {renderMobileMenu(item.sub, key)}
                        </div>
                    )}
                </div>
            );
        });

    return <>{renderMobileMenu(navigationItems)}</>;
}
