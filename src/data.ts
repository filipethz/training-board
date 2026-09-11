import type { Slot } from './types'

export const mockSlots: Slot[] = [
  {
    id: 'slot-07',
    time: '07:00',
    students: [
      {
        id: 'stu-1',
        name: 'Ana Paula',
        exercises: [
          { id: 'ex-1', name: 'Agachamento livre', equipment: 'barra', sets: '4', reps: '12', measureType: 'load', measureValue: '30kg', highlighted: false },
          { id: 'ex-2', name: 'Leg press', equipment: 'máquina', sets: '3', reps: '15', measureType: 'load', measureValue: '80kg', highlighted: false },
          { id: 'ex-3', name: 'Cadeira extensora', equipment: 'máquina', sets: '3', reps: '12', measureType: 'load', measureValue: '25kg', highlighted: true, notes: 'Cuidado com joelho direito' },
        ],
      },
      {
        id: 'stu-2',
        name: 'Walter Kannemann',
        exercises: [
          { id: 'ex-4', name: 'Supino reto', equipment: 'barra', sets: '4', reps: '10', measureType: 'load', measureValue: '40kg', highlighted: false },
          { id: 'ex-5', name: 'Supino inclinado', equipment: 'halteres', sets: '3', reps: '12', measureType: 'load', measureValue: '15kg', highlighted: false },
          { id: 'ex-6', name: 'Crucifixo', equipment: 'halteres', sets: '3', reps: '15', measureType: 'load', measureValue: '12kg', highlighted: false },
        ],
      },
      {
        id: 'stu-3',
        name: 'Carla Mendes',
        exercises: [
          { id: 'ex-7', name: 'Puxada frontal', equipment: 'polia', sets: '4', reps: '12', measureType: 'load', measureValue: '35kg', highlighted: false },
          { id: 'ex-8', name: 'Remada baixa', equipment: 'polia', sets: '3', reps: '12', measureType: 'load', measureValue: '30kg', highlighted: false },
          { id: 'ex-9', name: 'Rosca direta', equipment: 'halteres', sets: '3', reps: '15', measureType: 'load', measureValue: '8kg', highlighted: true },
        ],
      },
    ],
  },
  {
    id: 'slot-08',
    time: '08:00',
    students: [
      {
        id: 'stu-4',
        name: 'Pedro Geromel',
        exercises: [
          { id: 'ex-10', name: 'Levantamento terra', equipment: 'barra', sets: '5', reps: '5', measureType: 'load', measureValue: '60kg', highlighted: true, notes: 'Aquecer bem antes' },
          { id: 'ex-11', name: 'Barra fixa', equipment: 'peso corporal', sets: '4', reps: '8', measureType: 'none', highlighted: false },
          { id: 'ex-12', name: 'Remada curvada', equipment: 'barra', sets: '3', reps: '10', measureType: 'load', measureValue: '35kg', highlighted: false },
        ],
      },
      {
        id: 'stu-5',
        name: 'Eduarda Lima',
        exercises: [
          { id: 'ex-13', name: 'Stiff', equipment: 'barra', sets: '4', reps: '12', measureType: 'load', measureValue: '25kg', highlighted: false },
          { id: 'ex-14', name: 'Elevação pélvica', equipment: 'barra', sets: '4', reps: '15', measureType: 'load', measureValue: '40kg', highlighted: false },
          { id: 'ex-15', name: 'Abdutora', equipment: 'máquina', sets: '3', reps: '20', measureType: 'load', measureValue: '30kg', highlighted: false },
        ],
      },
    ],
  },
  {
    id: 'slot-18',
    time: '18:00',
    students: [
      {
        id: 'stu-6',
        name: 'Filipe Thomaz',
        exercises: [
          { id: 'ex-16', name: 'Desenvolvimento militar', equipment: 'halteres', sets: '4', reps: '10', measureType: 'load', measureValue: '12kg', highlighted: false },
          { id: 'ex-17', name: 'Elevação lateral', equipment: 'halteres', sets: '3', reps: '15', measureType: 'load', measureValue: '8kg', highlighted: false },
          { id: 'ex-18', name: 'Tríceps corda', equipment: 'polia', sets: '3', reps: '15', measureType: 'load', measureValue: '20kg', highlighted: false },
        ],
      },
      {
        id: 'stu-7',
        name: 'Gabriela Souza',
        exercises: [
          { id: 'ex-19', name: 'Corrida intervalada', equipment: 'esteira', sets: '8', reps: '1 min', measureType: 'none', highlighted: true },
          { id: 'ex-20', name: 'Corda naval', equipment: 'corda', sets: '4', reps: '', measureType: 'time', measureValue: '30s', highlighted: false },
          { id: 'ex-21', name: 'Prancha', equipment: 'peso corporal', sets: '3', reps: '45s', measureType: 'none', highlighted: false },
          { id: 'ex-22', name: 'Bike', equipment: 'bike', sets: '1', reps: '', measureType: 'time', measureValue: '20 min', highlighted: false },
        ],
      },
    ],
  },
]