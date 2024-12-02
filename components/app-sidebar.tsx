import { ChevronDown } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { fetchFixtures2 } from '@/utils/api';
import { Competition, CompetitionsResponse } from '@/utils/competition';
import { isObjectKey } from '@/utils/utils';

export async function AppSidebar() {
  const competitions: CompetitionsResponse = await fetchFixtures2();
  const groupByLeagues = competitions.competitions.reduce(
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
          <Collapsible defaultOpen className='group/collapsible'>
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
                          <span>{competition.name}</span>
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
    </Sidebar>
  );
}
