'use client';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Loan {
  id: string;
  item_name: string;
  description: string;
  quantity: number;
  borrowed_at: string;
  return_by: string;
  state_start: string;
  state_end: string;
  recipient_name: string;
}

const fetchLoans = async (): Promise<Loan[]> => {
  const response = await fetch('http://localhost:3000/api/loan');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const deleteLoan = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/api/loan/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete loan');
  }
};

const Dashboard = () => {
  const queryClient = useQueryClient();

  const {
    data: loans = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['loans'],
    queryFn: fetchLoans,
    staleTime: 30000, // 30 seconds
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading loans</div>;

  return (
    <div className='flex flex-col gap-4'>
      {loans.map((loan) => (
        <div key={loan.id}>
          <div>
            <h2>{loan.item_name}</h2>
            <p>{loan.description}</p>
            <p>{loan.quantity}</p>
            <p>{loan.borrowed_at}</p>
            <p>{loan.return_by}</p>
            <p>{loan.state_start}</p>
            <p>{loan.state_end}</p>
            <p>{loan.recipient_name}</p>
          </div>
          <div className='flex gap-x-2'>
            <Button>Editar</Button>
            <Button
              onClick={() => deleteMutation.mutate(loan.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
