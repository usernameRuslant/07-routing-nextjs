import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import Section from '@/components/Section/Section';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  console.log(slug);

  const raw = slug[0] ? decodeURIComponent(slug[0]) : '';
  const tag = raw === 'All notes' ? undefined : raw;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <Section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag ?? ''} />
      </HydrationBoundary>
    </Section>
  );
};

export default Notes;
