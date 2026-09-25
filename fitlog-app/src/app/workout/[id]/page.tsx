import CardDetails from '../../components/stack/CardDetails';
import { fetchWorkoutById } from '../../components/stack/api';
import { notFound } from 'next/navigation';

export default async function WorkoutDetailsPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;

  let workout;
  try {
    workout = await fetchWorkoutById(id);
  } catch {
    notFound();
  }

  return <CardDetails initialWorkout={workout} />;
}
