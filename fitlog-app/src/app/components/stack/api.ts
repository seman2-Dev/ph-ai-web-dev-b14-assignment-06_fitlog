import type { WorkoutApiItem, WorkoutCardData } from '../../types/types';

export const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export const getWorkoutByIdUrl = (id: string | number) => `${API_URL}/${id}`;

export const formatWorkout = (item: WorkoutApiItem): WorkoutCardData => ({
  id: item.id,
  title: item.name?.toUpperCase() || 'WORKOUT',
  focus: item.equipment || 'General fitness',
  categories: Array.isArray(item.muscleGroups) ? item.muscleGroups : ['General'],
  duration: `${item.duration ?? 0} min`,
  calories: `${item.caloriesBurned ?? 0} kcal`,
  rating: `${item.rating ?? 0}`,
  image: item.image || '',
  description: item.description || 'A focused movement for building strength and consistency.',
  equipment: item.equipment || 'General fitness',
  difficulty: item.difficulty || 'All levels',
  sets: `${item.sets ?? 0}`,
  reps: item.reps || 'As prescribed',
  instructions: Array.isArray(item.instructions) ? item.instructions : [],
});

export const fetchWorkoutById = async (id: string | number) => {
  const response = await fetch(getWorkoutByIdUrl(id));

  if (!response.ok) {
    throw new Error('Failed to fetch workout details');
  }

  const data = await response.json();
  return formatWorkout(data as WorkoutApiItem);
};
