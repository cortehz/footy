'use client';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarRangeIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export function DatePicker() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateParam = searchParams.get('date');
  const date = dateParam ? new Date(dateParam!) : new Date();

  {
    /* <CalendarRangeIcon className='w-8 h-8 stroke-2 stroke-gray-600' /> */
  }

  return (
    <Popover>
      <PopoverTrigger className='p-2 hover:bg-gray-100 rounded-md'>
        <CalendarRangeIcon className='w-8 h-8 stroke-2 stroke-gray-600' />{' '}
      </PopoverTrigger>
      <PopoverContent className='p-0' align='end'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(date) => {
            if (!date) return;
            const params = new URLSearchParams(searchParams);
            params.set('date', date.toISOString());
            router.push(`?${params.toString()}`);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
