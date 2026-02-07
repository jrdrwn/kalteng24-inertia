import Footer from '@/components/shared/footer';
import { Header2 } from '@/components/shared/header';
import SponsorFooter from '@/components/sponsor/footer';
import SponsorInsidental from '@/components/sponsor/insidental';
import SponsorInsidentalStack from '@/components/sponsor/insidental-stack';
import SponsorUtama from '@/components/sponsor/utama';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useStickyScroll } from '@/hooks/use-sticky-scroll';
import { createSlug, getRubrikOrKategori } from '@/lib/utils';
import { SharedData } from '@/types';
import { BeritaRed, Config, IklOnline } from '@/types/entities';
import { TPagination } from '@/types/pagination';
import { Link, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import {
    ArrowLeft,
    ArrowRight,
    CalendarIcon,
    Eye,
    Filter,
    RefreshCcw,
    SearchIcon,
    UserCircle,
} from 'lucide-react';

interface PageProps {
    popular_news: BeritaRed[];
    search_results: TPagination<BeritaRed>;
    search_query: string;
    kategori_list: { kategori: string }[];
    rubrik_list: { rubrik: string }[];
    sponsors: {
        utama: IklOnline[];
        insidental: IklOnline[];
        footer: IklOnline[];
    };
    metadata: Config;
}

export default function SearchResult({
    popular_news,
    search_results,
    search_query,
    kategori_list,
    rubrik_list,
    sponsors,
    metadata,
}: PageProps) {
    const { imageUrl } = usePage<SharedData>().props;
    const urlParams = new URLSearchParams(window.location.search);
    const sort = urlParams.get('sort') || 'latest';

    const stickyRef = useStickyScroll();

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search') as string;
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('q', query);
        window.location.href = `/search?${currentParams.toString()}`;
    }

    function handleKategoriChange(value: string) {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('kategori', value);
        window.location.href = `/search?${currentParams.toString()}`;
    }

    function handleJenisRubrikChange(value: string) {
        const currentParams = new URLSearchParams(window.location.search);

        currentParams.set('jenis_rubrik', value);
        window.location.href = `/search?${currentParams.toString()}`;
    }

    function handleSortChange(value: string) {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('sort', value);
        window.location.href = `/search?${currentParams.toString()}`;
    }

    // untuk input range tanggal
    function handleDateRangeChange(from: string, to: string) {
        const currentParams = new URLSearchParams(window.location.search);
        // set date_from dan date_to dan jangan ada yang null jika ada
        if (from) {
            currentParams.set('date_from', from);
        } else {
            currentParams.delete('date_from');
        }
        if (to) {
            currentParams.set('date_to', to);
        } else {
            currentParams.delete('date_to');
        }
        window.location.href = `/search?${currentParams.toString()}`;
    }

    function resetFilters() {
        window.location.href = `/search?`;
    }

    return (
        <>
            <SponsorUtama data={sponsors.utama} />
            <Header2 metadata={metadata} />
            <section className="px-2 pt-4 pb-4 md:px-4">
                <div className="container mx-auto grid grid-cols-4 gap-4">
                    <div className="hidden md:col-span-1 md:block">
                        <div className="no-scrollbar no-scrollbar sticky top-10 max-h-screen overflow-y-auto">
                            <div className="flex h-[41.6px] items-center justify-between">
                                <h1 className="font-bold">Filter</h1>
                                <Button
                                    variant={'outline'}
                                    onClick={resetFilters}
                                >
                                    <RefreshCcw className="inline-block size-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Urut berdasarkan
                                </p>
                                <Button
                                    variant={
                                        sort === 'latest'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="mt-2 w-full justify-between rounded-full"
                                    onClick={() => handleSortChange('latest')}
                                >
                                    Terbaru
                                    {sort === 'latest' && (
                                        <ArrowRight className="ml-2 inline-block size-4" />
                                    )}
                                </Button>
                                <Button
                                    variant={
                                        sort === 'oldest'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="mt-2 w-full justify-between rounded-full"
                                    onClick={() => handleSortChange('oldest')}
                                >
                                    Terlama
                                    {sort === 'oldest' && (
                                        <ArrowRight className="ml-2 inline-block size-4" />
                                    )}
                                </Button>
                                <Button
                                    variant={
                                        sort === 'popular'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="mt-2 w-full justify-between rounded-full"
                                    onClick={() => handleSortChange('popular')}
                                >
                                    Terpopuler
                                    {sort === 'popular' && (
                                        <ArrowRight className="ml-2 inline-block size-4" />
                                    )}
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Rentang Tanggal
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={
                                                    !urlParams.get('date_from')
                                                }
                                                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                            >
                                                <CalendarIcon />
                                                {urlParams.get('date_from') ||
                                                    'Dari Tanggal'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    urlParams.get('date_from')
                                                        ? new Date(
                                                              urlParams.get(
                                                                  'date_from',
                                                              )!,
                                                          )
                                                        : undefined
                                                }
                                                onSelect={(date) => {
                                                    if (date) {
                                                        const formattedDate =
                                                            date.toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    calendar:
                                                                        'iso8601',
                                                                },
                                                            );
                                                        handleDateRangeChange(
                                                            formattedDate,
                                                            urlParams.get(
                                                                'date_to',
                                                            ) || '',
                                                        );
                                                    }
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={
                                                    !urlParams.get('date_to')
                                                }
                                                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                            >
                                                <CalendarIcon />
                                                {urlParams.get('date_to') ||
                                                    'Sampai Tanggal'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    urlParams.get('date_to')
                                                        ? new Date(
                                                              urlParams.get(
                                                                  'date_to',
                                                              )!,
                                                          )
                                                        : undefined
                                                }
                                                onSelect={(date) => {
                                                    if (date) {
                                                        const formattedDate =
                                                            date.toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    calendar:
                                                                        'iso8601',
                                                                },
                                                            );
                                                        handleDateRangeChange(
                                                            urlParams.get(
                                                                'date_from',
                                                            ) || '',
                                                            formattedDate,
                                                        );
                                                    }
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Kategori
                                </p>
                                <Select
                                    onValueChange={handleKategoriChange}
                                    defaultValue={
                                        urlParams.get('kategori') || ''
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kategori_list.map((item, index) => (
                                            <SelectItem
                                                key={index}
                                                value={
                                                    item.kategori || 'unknown'
                                                }
                                            >
                                                {item.kategori.replaceAll(
                                                    '_',
                                                    ' ',
                                                ) || 'Unknown'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Jenis Rubrik
                                </p>
                                <Select
                                    onValueChange={handleJenisRubrikChange}
                                    defaultValue={
                                        urlParams.get('jenis_rubrik') || ''
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jenis Rubrik" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {rubrik_list.map((item, index) => (
                                            <SelectItem
                                                key={index}
                                                value={item.rubrik || 'unknown'}
                                            >
                                                {item.rubrik.replaceAll(
                                                    '_',
                                                    ' ',
                                                ) || 'Unknown'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <SponsorInsidentalStack
                                data={sponsors.insidental || []}
                            />
                        </div>
                    </div>
                    <div className="col-span-4 gap-4 md:col-span-3">
                        <form onSubmit={handleSearch}>
                            <InputGroup className="col-span-3 row-span-1 mb-2 bg-primary py-5">
                                <Drawer direction="left">
                                    <DrawerTrigger asChild>
                                        <InputGroupAddon
                                            align={'inline-start'}
                                            className="text-primary-foreground md:hidden"
                                        >
                                            <InputGroupButton
                                                type="button"
                                                size={'icon-sm'}
                                            >
                                                <Filter />
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <div className="overflow-y-auto p-4">
                                            <div className="flex h-[41.6px] items-center justify-between">
                                                <h1 className="font-bold">
                                                    Filter
                                                </h1>
                                                <Button
                                                    variant={'outline'}
                                                    onClick={resetFilters}
                                                >
                                                    <RefreshCcw className="inline-block size-4" />
                                                </Button>
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Urut berdasarkan
                                                </p>
                                                <Button
                                                    variant={
                                                        sort === 'latest'
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    className="mt-2 w-full justify-between rounded-full"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            'latest',
                                                        )
                                                    }
                                                >
                                                    Terbaru
                                                    {sort === 'latest' && (
                                                        <ArrowRight className="ml-2 inline-block size-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant={
                                                        sort === 'oldest'
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    className="mt-2 w-full justify-between rounded-full"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            'oldest',
                                                        )
                                                    }
                                                >
                                                    Terlama
                                                    {sort === 'oldest' && (
                                                        <ArrowRight className="ml-2 inline-block size-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant={
                                                        sort === 'popular'
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    className="mt-2 w-full justify-between rounded-full"
                                                    onClick={() =>
                                                        handleSortChange(
                                                            'popular',
                                                        )
                                                    }
                                                >
                                                    Terpopuler
                                                    {sort === 'popular' && (
                                                        <ArrowRight className="ml-2 inline-block size-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                                    Rentang Tanggal
                                                </p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                data-empty={
                                                                    !urlParams.get(
                                                                        'date_from',
                                                                    )
                                                                }
                                                                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                                            >
                                                                <CalendarIcon />
                                                                {urlParams.get(
                                                                    'date_from',
                                                                ) || 'Dari'}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    urlParams.get(
                                                                        'date_from',
                                                                    )
                                                                        ? new Date(
                                                                              urlParams.get(
                                                                                  'date_from',
                                                                              )!,
                                                                          )
                                                                        : undefined
                                                                }
                                                                onSelect={(
                                                                    date,
                                                                ) => {
                                                                    if (date) {
                                                                        const formattedDate =
                                                                            date.toLocaleDateString(
                                                                                'en-US',
                                                                                {
                                                                                    calendar:
                                                                                        'iso8601',
                                                                                },
                                                                            );
                                                                        handleDateRangeChange(
                                                                            formattedDate,
                                                                            urlParams.get(
                                                                                'date_to',
                                                                            ) ||
                                                                                '',
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                data-empty={
                                                                    !urlParams.get(
                                                                        'date_to',
                                                                    )
                                                                }
                                                                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                                            >
                                                                <CalendarIcon />
                                                                {urlParams.get(
                                                                    'date_to',
                                                                ) || 'Sampai'}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    urlParams.get(
                                                                        'date_to',
                                                                    )
                                                                        ? new Date(
                                                                              urlParams.get(
                                                                                  'date_to',
                                                                              )!,
                                                                          )
                                                                        : undefined
                                                                }
                                                                onSelect={(
                                                                    date,
                                                                ) => {
                                                                    if (date) {
                                                                        const formattedDate =
                                                                            date.toLocaleDateString(
                                                                                'en-US',
                                                                                {
                                                                                    calendar:
                                                                                        'iso8601',
                                                                                },
                                                                            );
                                                                        handleDateRangeChange(
                                                                            urlParams.get(
                                                                                'date_from',
                                                                            ) ||
                                                                                '',
                                                                            formattedDate,
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                                    Kategori
                                                </p>
                                                <Select
                                                    onValueChange={
                                                        handleKategoriChange
                                                    }
                                                    defaultValue={
                                                        urlParams.get(
                                                            'kategori',
                                                        ) || ''
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Kategori" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {kategori_list.map(
                                                            (item, index) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={
                                                                        item.kategori ||
                                                                        'unknown'
                                                                    }
                                                                >
                                                                    {item.kategori.replaceAll(
                                                                        '_',
                                                                        ' ',
                                                                    ) ||
                                                                        'Unknown'}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                                    Jenis Rubrik
                                                </p>
                                                <Select
                                                    onValueChange={
                                                        handleJenisRubrikChange
                                                    }
                                                    defaultValue={
                                                        urlParams.get(
                                                            'jenis_rubrik',
                                                        ) || ''
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Jenis Rubrik" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {rubrik_list.map(
                                                            (item, index) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={
                                                                        item.rubrik ||
                                                                        'unknown'
                                                                    }
                                                                >
                                                                    {item.rubrik.replaceAll(
                                                                        '_',
                                                                        ' ',
                                                                    ) ||
                                                                        'Unknown'}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <SponsorInsidentalStack
                                                data={sponsors.insidental || []}
                                            />
                                        </div>
                                        <DrawerFooter className="pt-2">
                                            <DrawerClose asChild>
                                                <Button variant="outline">
                                                    Close
                                                </Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                                <InputGroupInput
                                    className="mx-1 h-8 rounded-sm bg-primary-foreground"
                                    placeholder="Cari Berita"
                                    defaultValue={search_query}
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
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-3 lg:col-span-2">
                                <Card className="p-4">
                                    {/* jika tidak ada berita */}
                                    {search_results.data.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-10">
                                            <h2 className="mb-4 text-xl font-semibold">
                                                Tidak ada hasil ditemukan
                                            </h2>
                                            <p className="mb-6 text-center text-sm text-muted-foreground">
                                                Coba periksa ejaan kata
                                                pencarian atau gunakan kata
                                                kunci yang berbeda.
                                            </p>
                                            <Button
                                                variant={'outline'}
                                                onClick={() =>
                                                    window.history.back()
                                                }
                                                size={'sm'}
                                            >
                                                <ArrowLeft />
                                                Kembali
                                            </Button>
                                        </div>
                                    ) : null}
                                    {search_results.data.map((item, index) => (
                                        <Link
                                            as={'div'}
                                            href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                            key={index}
                                            className="group relative mb-2 flex cursor-pointer flex-col gap-2 rounded-xl sm:h-54 sm:flex-row xl:h-74"
                                        >
                                            <div className="relative mr-2 h-54 w-full rounded-xl bg-primary/40 sm:h-auto sm:w-50 xl:w-60">
                                                <img
                                                    src={`${imageUrl}/${item.foto_berita}`}
                                                    alt={item.judul}
                                                    className="h-full w-full rounded-xl object-cover object-center"
                                                    onError={(e) => {
                                                        (
                                                            e.currentTarget as HTMLImageElement
                                                        ).src = '/no-image.png';
                                                    }}
                                                />
                                                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                                    <Eye className="inline-block size-4 text-white" />
                                                    <span className="text-xs text-white">
                                                        {item.hits}
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge className="absolute top-2 left-2 uppercase">
                                                {getRubrikOrKategori(
                                                    item,
                                                    true,
                                                )}
                                            </Badge>
                                            <div className="flex-1 overflow-hidden rounded-xl py-4 pr-4">
                                                <h1 className="line-clamp-2 text-lg leading-relaxed font-semibold tracking-wide group-hover:underline group-active:underline md:text-xl">
                                                    {item.judul}
                                                </h1>
                                                <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                                    <UserCircle className="inline-block size-4" />
                                                    <span>{item.user}</span>
                                                    <span className="size-1.5 rounded-full bg-primary"></span>
                                                    <span className="hidden gap-2 xl:flex">
                                                        {new Date(
                                                            item.tgl,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                dateStyle:
                                                                    'full',
                                                            },
                                                        )}
                                                        <span className="hidden 2xl:block">
                                                            <span> jam </span>
                                                            {new Date(
                                                                item.jam,
                                                            ).toLocaleTimeString(
                                                                'id-ID',
                                                                {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    timeZoneName:
                                                                        'short',
                                                                },
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span className="block gap-2 xl:hidden">
                                                        {new Date(
                                                            item.tgl,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                dateStyle:
                                                                    'medium',
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="line-clamp-3 leading-relaxed tracking-wide text-muted-foreground xl:line-clamp-5">
                                                    {parse(item.isi_berita)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    <Pagination>
                                        <PaginationContent className="flex-wrap items-center justify-center">
                                            {search_results.links.map(
                                                (link, idx) => {
                                                    if (
                                                        link.label ===
                                                        '&laquo; Previous'
                                                    ) {
                                                        return (
                                                            <PaginationItem
                                                                key={idx}
                                                            >
                                                                <PaginationPrevious
                                                                    href={
                                                                        link.url ||
                                                                        undefined
                                                                    }
                                                                    isActive={
                                                                        !!link.url
                                                                    }
                                                                />
                                                            </PaginationItem>
                                                        );
                                                    }
                                                    if (
                                                        link.label ===
                                                        'Next &raquo;'
                                                    ) {
                                                        return (
                                                            <PaginationItem
                                                                key={idx}
                                                            >
                                                                <PaginationNext
                                                                    href={
                                                                        link.url ||
                                                                        undefined
                                                                    }
                                                                    isActive={
                                                                        !!link.url
                                                                    }
                                                                />
                                                            </PaginationItem>
                                                        );
                                                    }
                                                    if (link.label === '...') {
                                                        return (
                                                            <PaginationItem
                                                                key={idx}
                                                            >
                                                                <PaginationEllipsis />
                                                            </PaginationItem>
                                                        );
                                                    }
                                                    // Numbered page
                                                    return (
                                                        <PaginationItem
                                                            key={idx}
                                                        >
                                                            <PaginationLink
                                                                href={
                                                                    link.url ||
                                                                    undefined
                                                                }
                                                                isActive={
                                                                    link.active
                                                                }
                                                            >
                                                                {link.label}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    );
                                                },
                                            )}
                                        </PaginationContent>
                                    </Pagination>
                                </Card>
                            </div>
                            <div className="col-span-3 lg:col-span-1">
                                <div
                                    ref={stickyRef}
                                    className="no-scrollbar top-4 gap-0 lg:sticky lg:max-h-screen lg:overflow-y-auto"
                                >
                                    <Card className="mb-8 p-4">
                                        <h1 className="mb-4 text-lg font-semibold">
                                            Popular Posts
                                        </h1>
                                        {popular_news.map((item, index) => (
                                            <Link
                                                as={'div'}
                                                href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                                key={index}
                                                className="group mb-4 flex cursor-pointer flex-row gap-2"
                                            >
                                                <div className="hidden w-16 rounded-md bg-primary/40 xl:block">
                                                    <img
                                                        src={`${imageUrl}/${item.foto_berita}`}
                                                        alt={item.judul}
                                                        className="h-full w-full rounded-md object-cover object-center"
                                                        onError={(e) => {
                                                            (
                                                                e.currentTarget as HTMLImageElement
                                                            ).src =
                                                                '/no-image.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className="line-clamp-2 text-sm leading-relaxed font-semibold group-hover:underline group-active:underline">
                                                        {item.judul}
                                                    </h2>
                                                    <div className="mt-1 flex flex-row items-center gap-1.5 text-xs text-primary">
                                                        <UserCircle className="inline-block size-3" />
                                                        <span>{item.user}</span>
                                                        <span className="size-1.5 rounded-full bg-primary"></span>
                                                        <span className="hidden 2xl:block">
                                                            {new Date(
                                                                item.tgl,
                                                            ).toLocaleDateString(
                                                                'id-ID',
                                                                {
                                                                    dateStyle:
                                                                        'full',
                                                                },
                                                            )}
                                                        </span>
                                                        <span className="block 2xl:hidden">
                                                            {new Date(
                                                                item.tgl,
                                                            ).toLocaleDateString(
                                                                'id-ID',
                                                                {
                                                                    dateStyle:
                                                                        'medium',
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </Card>
                                    <SponsorInsidental
                                        data={sponsors.insidental}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SponsorFooter data={sponsors?.footer || []} />
            <Footer popular_news={popular_news} metadata={metadata} />
        </>
    );
}
