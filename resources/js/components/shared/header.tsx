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
    FaLinkedin,
    FaTwitterSquare,
    FaYoutubeSquare,
} from 'react-icons/fa';
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
    { label: 'Home', href: '/home' },
    { label: 'HITWAY', href: '/../rubrik/hit-way.html' },
    {
        label: 'NASIONAL',
        href: '/../rubrik/nasional.html',
        sub: [
            { label: 'NASIONAL', href: '/../rubrik/nasional.html' },
            { label: 'IKN', href: '/../rubrik/ikn.html' },
            { label: 'JAKARTA', href: '/../rubrik/jakarta.html' },
            { label: 'KALIMANTAN', href: '/../rubrik/kalimantan.html' },
        ],
    },
    {
        label: 'KALTENG',
        href: '/../rubrik/daerah.html',
        sub: [
            { label: 'Palangka Raya', href: '/../daerah/palangka_raya.html' },
            {
                label: 'Kotawaringin Barat',
                href: '/../daerah/kotawaringin_barat.html',
            },
            {
                label: 'Kotawaringin Timur',
                href: '/../daerah/kotawaringin_timur.html',
            },
            { label: 'Barito Utara', href: '/../daerah/barito_utara.html' },
            { label: 'Barito Selatan', href: '/../daerah/barito_selatan.html' },
            { label: 'Kapuas', href: '/../daerah/kapuas.html' },
            { label: 'Murung Raya', href: '/../daerah/murung_raya.html' },
            { label: 'Barito Timur', href: '/../daerah/barito_timur.html' },
            { label: 'Pulang Pisau', href: '/../daerah/pulang_pisau.html' },
            { label: 'Gunung Mas', href: '/../daerah/gunung_mas.html' },
            { label: 'Katingaan', href: '/../daerah/katingan.html' },
            { label: 'Seruyan', href: '/../daerah/seruyan.html' },
            { label: 'Lamandau', href: '/../daerah/lamandau.html' },
            { label: 'Sukamara', href: '/../daerah/sukamara.html' },
        ],
    },
    {
        label: 'METRO',
        href: '/../rubrik/hukum.html',
        sub: [
            { label: 'KRIMINALITAS', href: '/../rubrik/kriminalitas.html' },
            { label: 'HUKUM & HAM', href: '/../rubrik/ham.html' },
        ],
    },
    {
        label: 'MITRA',
        href: '#',
        sub: [
            {
                label: 'Pemprov Kalteng',
                href: '/../mitra/pemprov_kalteng.html',
            },
            {
                label: 'DPRD',
                sub: [
                    {
                        label: 'DPRD Kalteng',
                        href: '/../mitra/DPRD_Kalteng.html',
                    },
                    {
                        label: 'DPRD Palangka Raya',
                        href: '/../mitra/DPRD_Palangka_Raya.html',
                    },
                    {
                        label: 'DPRD Barito Utara',
                        href: '/../mitra/dprd_barito_utara.html',
                    },
                    {
                        label: 'DPRD Murung Raya',
                        href: '/../mitra/dprd_murung_raya.html',
                    },
                    {
                        label: 'DPRD Kapuas',
                        href: '/../mitra/dprd_kapuas.html',
                    },
                    {
                        label: 'DPRD Barito Selatan',
                        href: '/../mitra/dprd_barito_selatan.html',
                    },
                    {
                        label: 'DPRD Katingan',
                        href: '/../mitra/dprd_katingan.html',
                    },
                    {
                        label: 'DPRD Gunung Mas',
                        href: '/../mitra/dprd_gunung_mas.html',
                    },
                ],
            },
            {
                label: 'Pemkab/Pemko',
                sub: [
                    {
                        label: 'Pemko Palangka Raya',
                        href: '/../mitra/Pemko_Palangka_Raya.html',
                    },
                    {
                        label: 'Pemkab Barito Utara',
                        href: '/../mitra/pemkab_barito_utara.html',
                    },
                    {
                        label: 'Pemkab Murung Raya',
                        href: '/../mitra/Pemkab_Murung_Raya.html',
                    },
                    {
                        label: 'Pemkab Kapuas',
                        href: '/../mitra/pemkab_kapuas.html',
                    },
                    {
                        label: 'Pemkab Barito Selatan',
                        href: '/../mitra/pemkab_barito_selatan.html',
                    },
                    {
                        label: 'Pemkab Katingan',
                        href: '/../mitra/pemkab_katingan.html',
                    },
                    {
                        label: 'Pemkab Gunung Mas',
                        href: '/../mitra/pemkab_gunung_mas.html',
                    },
                ],
            },
        ],
    },
    { label: 'Olahraga', href: '/../rubrik/olahraga.html' },
];

export default function Header() {
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
                    <div className="flex gap-1">
                        <FaFacebookSquare className="size-4 text-blue-600" />
                        <FaInstagramSquare className="size-4 text-pink-600" />
                        <FaTwitterSquare className="size-4 text-blue-400" />
                        <FaYoutubeSquare className="size-4 text-red-600" />
                        <FaLinkedin className="size-4 text-blue-700" />
                    </div>
                </div>
                <Separator className="rounded-full border-1" />
                <div className="flex flex-row items-center justify-between pt-1.5">
                    <img src="/logo.png" alt="Logo" className="h-8" />
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
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
                    {/* Mobile Hamburger */}
                    <button
                        className="block p-2 md:hidden"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <MenuIcon />
                    </button>
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
                            <button aria-label="Close menu">
                                <CloseIcon />
                            </button>
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

export function Header2() {
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
                    <div className="flex gap-1">
                        <FaFacebookSquare className="size-4 text-blue-600" />
                        <FaInstagramSquare className="size-4 text-pink-600" />
                        <FaTwitterSquare className="size-4 text-blue-400" />
                        <FaYoutubeSquare className="size-4 text-red-600" />
                        <FaLinkedin className="size-4 text-blue-700" />
                    </div>
                </div>
                <Separator className="rounded-full border-1" />
                <div className="flex flex-row items-center justify-between pt-1.5">
                    <img src="/logo.png" alt="Logo" className="h-8" />
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
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
                    {/* Mobile Hamburger */}
                    <button
                        className="block p-2 md:hidden"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <MenuIcon />
                    </button>
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
                            <button aria-label="Close menu">
                                <CloseIcon />
                            </button>
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
