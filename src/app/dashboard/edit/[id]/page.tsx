'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EditLoan = () => {
  const router = useRouter();
  const { id } = useParams(); // ID desde la URL

  const [loan, setLoan] = useState({
    item_name: '',
    description: '',
    quantity: '',
    borrowed_at: '',
    return_by: '',
    state_start: '',
    state_end: '',
    recipient_name: '',
  });

  useEffect(() => {
    const fetchLoan = async () => {
      const res = await fetch(`/api/loan/${id}`);
      const data = await res.json();
      setLoan({
        ...data,
        quantity: data.quantity.toString(), // asegurar que sea string para el input
        borrowed_at: data.borrowed_at.slice(0, 10),
        return_by: data.return_by.slice(0, 10),
      });
    };
    fetchLoan();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/loan/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...loan,
        quantity: parseInt(loan.quantity, 10),
        borrowed_at: new Date(loan.borrowed_at).toISOString(),
        return_by: new Date(loan.return_by).toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update loan');
    }
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Editar Préstamo</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <Input
          name='item_name'
          value={loan.item_name}
          onChange={handleChange}
        />
        <Input
          name='description'
          value={loan.description}
          onChange={handleChange}
        />
        <Input name='quantity' value={loan.quantity} onChange={handleChange} />
        <Input
          type='date'
          name='borrowed_at'
          value={loan.borrowed_at}
          onChange={handleChange}
        />
        <Input
          type='date'
          name='return_by'
          value={loan.return_by}
          onChange={handleChange}
        />
        <Input
          name='state_start'
          value={loan.state_start}
          onChange={handleChange}
        />
        <Input
          name='state_end'
          value={loan.state_end}
          onChange={handleChange}
        />
        <Input
          name='recipient_name'
          value={loan.recipient_name}
          onChange={handleChange}
        />
        <Button type='submit'>Actualizar</Button>
      </form>
    </div>
  );
};

export default EditLoan;
