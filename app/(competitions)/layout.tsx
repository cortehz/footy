import DateToolbar from '@/components/date-toolbar';

type SearchParams = Promise<{
  date: string;
}>;

type CompetitionLayoutProps = {
  children: React.ReactNode;
  searchParams: SearchParams;
};

export default async function CompetitionLayout({
  children,
}: CompetitionLayoutProps) {
  return (
    <div className='flex flex-col gap-4 w-full basis-0 grow'>
      <DateToolbar />
      {children}
    </div>
  );
}
