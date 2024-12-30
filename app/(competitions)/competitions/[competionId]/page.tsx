type CompetionProps = {
  params: Promise<{ competionId: string }>;
};

export default async function Competition(args: CompetionProps) {
  const competionId = (await args.params).competionId;
  return (
    <>
      <main className='flex-1 flex flex-col gap-6 px-4'>{competionId}</main>
    </>
  );
}
