'use client';

import { Button } from '@/components/ui/button';
import { addDays, format, isToday, subDays } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { DatePicker } from './date-picker';

const dayOfWeek: Record<number, string> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export default function DateToolbar() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const parsedDate = z.coerce.date().safeParse(new Date(dateParam!));
  const actualDate = parsedDate.success ? parsedDate.data : new Date();
  const [currentDate, setCurrentDate] = useState<Date>(actualDate);
  const router = useRouter();

  const dates = [
    subDays(currentDate, 2),
    subDays(currentDate, 1),
    currentDate,
    addDays(currentDate, 1),
    addDays(currentDate, 2),
  ];

  return (
    <div className='flex gap-8 justify-between h-12'>
      {dates.map((date) => (
        <Button
          variant='ghost'
          key={date.toISOString()}
          className='flex flex-col items-center gap-[2px] text-gray-400 h-full'
          onClick={() => {
            setCurrentDate(date);
            router.push(`?date=${date.toLocaleDateString('sv')}`);
          }}
        >
          <span>{isToday(date) ? 'Today' : dayOfWeek[date.getDay()]}</span>
          <span>{format(date, 'd MMM')}</span>
        </Button>
      ))}

      <DatePicker />
    </div>
  );
}
