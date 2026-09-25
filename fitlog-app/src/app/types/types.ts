export type WorkoutApiItem = {
  id: number | string;
  name?: string;
  image?: string;
  muscleGroups?: string[];
  equipment?: string;
  difficulty?: string;
  duration?: number;
  caloriesBurned?: number;
  sets?: number;
  reps?: string;
  rating?: number;
  description?: string;
  instructions?: string[];
};

export type WorkoutCardData = {
  id: number | string;
  title: string;
  focus: string;
  categories: string[];
  duration: string;
  calories: string;
  rating: string;
  image: string;
  description: string;
  equipment: string;
  difficulty: string;
  sets: string;
  reps: string;
  instructions: string[];
};
