import Footer from '@/components/shared/footer';
import { Header2 } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowRight, Eye, SearchIcon, UserCircle } from 'lucide-react';

export default function SearchResult() {
    return (
        <>
            <Header2 />
            <section className="px-4 pt-2 pb-4">
                <div className="container mx-auto grid grid-cols-4 gap-10">
                    <div className="col-span-1 mt-12">
                        <div className="sticky top-10">
                            <h1 className="font-bold">Filter</h1>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Urut berdasarkan
                                </p>
                                <Button className="mt-2 w-full justify-between rounded-full">
                                    Terbaru
                                    <ArrowRight className="ml-2 inline-block size-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="mt-2 w-full justify-between rounded-full"
                                >
                                    Terpopuler
                                    <ArrowRight className="ml-2 hidden size-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Urut berdasarkan
                                </p>
                                <Button className="mt-2 w-full justify-between rounded-full">
                                    Semua
                                    <ArrowRight className="ml-2 inline-block size-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="mt-2 w-full justify-between rounded-full"
                                >
                                    Berita
                                    <ArrowRight className="ml-2 hidden size-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="mt-2 w-full justify-between rounded-full"
                                >
                                    Artikel
                                    <ArrowRight className="ml-2 hidden size-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="mt-2 w-full justify-between rounded-full"
                                >
                                    Opini
                                    <ArrowRight className="ml-2 hidden size-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Kategori
                                </p>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nasional">
                                            Nasional
                                        </SelectItem>
                                        <SelectItem value="internasional">
                                            Internasional
                                        </SelectItem>
                                        <SelectItem value="ekonomi">
                                            Ekonomi
                                        </SelectItem>
                                        <SelectItem value="olahraga">
                                            Olahraga
                                        </SelectItem>
                                        <SelectItem value="hiburan">
                                            Hiburan
                                        </SelectItem>
                                        <SelectItem value="teknologi">
                                            Teknologi
                                        </SelectItem>
                                        <SelectItem value="sains">
                                            Sains
                                        </SelectItem>
                                        <SelectItem value="gaya-hidup">
                                            Gaya Hidup
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 gap-4">
                        <InputGroup className="col-span-3 row-span-1 mb-2 bg-primary py-5 pl-1">
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
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 row-span-1">
                                <Card className="p-4">
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="relative mb-2 flex h-74 gap-2 rounded-xl"
                                            >
                                                <div className="relative mr-2 w-60 rounded-xl bg-primary/40">
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                                        <Eye className="inline-block size-4 text-white" />
                                                        <span className="text-xs text-white">
                                                            1.2K
                                                        </span>
                                                    </div>
                                                </div>
                                                <Badge className="absolute top-2 left-2">
                                                    Nasional
                                                </Badge>
                                                <div className="flex-1 overflow-hidden rounded-xl py-4 pr-4">
                                                    <h1 className="text-xl leading-relaxed font-semibold tracking-wide">
                                                        Traveling Makes You More
                                                        Inteligent and More
                                                        Energietic
                                                    </h1>
                                                    <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                                        <UserCircle className="inline-block size-4" />
                                                        <span>Admin</span>
                                                        <span className="size-1.5 rounded-full bg-primary"></span>
                                                        <span>
                                                            12 Juni 2024
                                                        </span>
                                                    </div>
                                                    <p className="line-clamp-5 leading-relaxed tracking-wide text-muted-foreground">
                                                        You can customize the
                                                        view Blog post with
                                                        author simple mouse
                                                        click and immediately
                                                        see the result of your
                                                        changes. You can
                                                        customize the view Blog
                                                        post with author simple
                                                        mouse click and
                                                        immediately see the
                                                        result of your changes.
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </Card>
                            </div>
                            <div className="col-span-1 row-span-1">
                                <Card className="sticky top-4 p-4">
                                    <h1 className="mb-4 text-lg font-semibold">
                                        Popular Posts
                                    </h1>
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="mb-4 flex flex-row gap-2"
                                            >
                                                <div className="w-16 rounded-md bg-primary/40"></div>
                                                <div className="flex-1">
                                                    <h2 className="text-sm leading-relaxed font-semibold">
                                                        Traveling Makes You More
                                                        Inteligent and More
                                                        Energietic
                                                    </h2>
                                                    <div className="mt-1 flex flex-row items-center gap-1.5 text-xs text-primary">
                                                        <UserCircle className="inline-block size-3" />
                                                        <span>Admin</span>
                                                        <span className="size-1.5 rounded-full bg-primary"></span>
                                                        <span>
                                                            12 Juni 2024
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
