import { UserCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function Hero() {
    return (
        <section className="px-4 py-2">
            <div className="container mx-auto grid h-[400px] grid-cols-4 grid-rows-2 items-center justify-items-center gap-6 [&>div]:flex [&>div]:flex-col [&>div]:items-start [&>div]:justify-end [&>div]:gap-y-2 [&>div]:rounded-2xl [&>div]:p-4 [&>div]:text-white">
                <div className="col-span-2 row-span-2 h-full w-full bg-primary/80">
                    <Badge variant={'secondary'} className="text-primary">
                        Nasional
                    </Badge>
                    <h1 className="line-clamp-2 text-2xl font-semibold">
                        PT. Asmin Bara Bronang Serahkan 2.407 Ha Lahan
                        Rehabilitasi DAS
                    </h1>
                    <p className="line-clamp-2 text-sm">
                        KUALA KAPUAS - You can customize the view Blog post with
                        author simple mouse click and immediately see the result
                        of your changes. You can customize the view Blog post
                        with author simple mouse click and immediately see the
                        result of your changes.
                    </p>
                    <div className="flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>Admin</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>12 Juni 2024</span>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 h-full w-full bg-primary/70">
                    <Badge variant={'secondary'} className="text-primary">
                        Nasional
                    </Badge>
                    <h1 className="line-clamp-2 text-2xl font-semibold">
                        PT. Asmin Bara Bronang Serahkan 2.407 Ha Lahan
                        Rehabilitasi DAS
                    </h1>
                    <div className="flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>Admin</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>12 Juni 2024</span>
                    </div>
                </div>
                <div className="col-span-1 row-span-1 h-full w-full bg-primary/50">
                    <Badge variant={'secondary'} className="text-primary">
                        Nasional
                    </Badge>
                    <h1 className="line-clamp-2 text-2xl font-semibold">
                        PT. Asmin Bara Bronang Serahkan 2.407 Ha Lahan
                        Rehabilitasi DAS
                    </h1>
                    <div className="flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>Admin</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>12 Juni 2024</span>
                    </div>
                </div>
                <div className="col-span-1 row-span-1 h-full w-full bg-primary/30">
                    <Badge variant={'secondary'} className="text-primary">
                        Nasional
                    </Badge>
                    <h1 className="line-clamp-2 text-2xl font-semibold">
                        PT. Asmin Bara Bronang Serahkan 2.407 Ha Lahan
                        Rehabilitasi DAS
                    </h1>
                    <div className="flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>Admin</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>12 Juni 2024</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
