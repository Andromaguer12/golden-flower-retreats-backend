export interface Excercises {
  description: string;
}

export interface Injury {
  name: string;
  description: string;
  treatment: string;
  body_part_id: string;
  image: string;
  exercises: Excercises[];
}
