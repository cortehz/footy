import { ChevronDown } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { api } from '@/utils/api';
import { Competition, CompetitionsResponse } from '@/utils/competition';
import { isObjectKey } from '@/utils/utils';
import Link from 'next/link';

export async function AppSidebar() {
  const { data: competitions, error } =
    await api.get<CompetitionsResponse>('competitions');

  if (error) {
    throw new Error(error.message);
  }

  if (!competitions) {
    return null;
  }

  const groupByLeagues = competitions?.competitions.reduce(
    (acc, competition) => {
      const competitionType = competition.type;
      if (!acc[competitionType]) {
        acc[competitionType] = [];
      }
      acc[competitionType].push(competition);
      return acc;
    },
    {} as Record<string, Array<Competition>>
  );

  return (
    <Sidebar className='p-4 pr-0'>
      {Object.keys(groupByLeagues).map((competitionType) => {
        if (!isObjectKey(groupByLeagues, competitionType)) return null;
        const competitions = groupByLeagues[competitionType];
        return (
          <Collapsible
            defaultOpen
            className='group/collapsible mb-4'
            key={competitionType}
          >
            <SidebarGroup className='rounded-lg bg-white' key={competitionType}>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {competitionType}
                  <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {competitions.map((competition) => (
                      <SidebarMenuItem key={competition.id}>
                        <SidebarMenuButton asChild>
                          <Link href={`/competitions/${competition.id}`}>
                            {competition.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      })}

      <SidebarFooter className='mt-auto'>
        <p className='text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} Football Data. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
