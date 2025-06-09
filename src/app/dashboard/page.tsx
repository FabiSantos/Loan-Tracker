'use client';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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

  if (isLoading) return <div>Cargando préstamos...</div>;
  if (error) return <div>Error al cargar los préstamos</div>;

  return (
    <div className='p-4'>
      <Button
        onClick={() => router.push('/new-tracker')}
        className='mb-4 flex justify-end items-center cursor-pointer'
      >
        Crear nuevo préstamo
      </Button>
      <h1 className='text-2xl font-semibold mb-4'>Lista de Préstamos</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-[1000px] w-full table-auto border border-gray-200 rounded-md shadow-sm'>
          <thead className='bg-gray-100 text-sm text-gray-700'>
            <tr>
              <th className='px-4 py-2 text-left'>Ítem</th>
              <th className='px-4 py-2 text-left'>Descripción</th>
              <th className='px-4 py-2 text-left'>Cantidad</th>
              <th className='px-4 py-2 text-left'>Prestado en</th>
              <th className='px-4 py-2 text-left'>Devolver antes</th>
              <th className='px-4 py-2 text-left'>Estado Inicial</th>
              <th className='px-4 py-2 text-left'>Estado Final</th>
              <th className='px-4 py-2 text-left'>Destinatario</th>
              <th className='px-4 py-2 text-left'>Acciones</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {loans.map((loan) => (
              <tr key={loan.id} className='border-t border-gray-200'>
                <td className='px-4 py-2'>{loan.item_name}</td>
                <td className='px-4 py-2'>{loan.description}</td>
                <td className='px-4 py-2'>{loan.quantity}</td>
                <td className='px-4 py-2'>{loan.borrowed_at}</td>
                <td className='px-4 py-2'>{loan.return_by}</td>
                <td className='px-4 py-2'>{loan.state_start}</td>
                <td className='px-4 py-2'>{loan.state_end}</td>
                <td className='px-4 py-2'>{loan.recipient_name}</td>
                <td className='px-4 py-2'>
                  <div className='flex flex-col sm:flex-row gap-2'>
                    <Button
                      size='sm'
                      onClick={() => router.push(`/dashboard/edit/${loan.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => deleteMutation.mutate(loan.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
