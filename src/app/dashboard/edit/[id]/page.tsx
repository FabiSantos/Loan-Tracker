'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/app/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useCapitalize } from '@/hooks/useCapitalize';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const EditLoan = () => {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { value: itemName, setCapitalizedValue: setItemName } = useCapitalize('');
  const { value: recipientName, setCapitalizedValue: setRecipientName } = useCapitalize('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        quantity: data.quantity.toString(),
        borrowed_at: data.borrowed_at.slice(0, 10),
        return_by: data.return_by.slice(0, 10),
      });
      setItemName(data.item_name);
      setRecipientName(data.recipient_name);
    };
    fetchLoan();
  }, [id, setItemName, setRecipientName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'item_name') {
      setItemName(value);
    } else if (name === 'recipient_name') {
      setRecipientName(value);
    }
    setLoan({ ...loan, [name]: value });
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedLoan: any) => {
      const response = await fetch(`http://localhost:3000/api/loan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLoan),
      });
      if (!response.ok) {
        throw new Error('Failed to update loan');
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidar y refetch los préstamos
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      router.push('/dashboard');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateMutation.mutateAsync({
        ...loan,
        item_name: itemName,
        recipient_name: recipientName,
        quantity: parseInt(loan.quantity, 10),
        borrowed_at: loan.borrowed_at ? `${loan.borrowed_at}T00:00:00.000Z` : null,
        return_by: loan.return_by ? `${loan.return_by}T00:00:00.000Z` : null,
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el préstamo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Editar Préstamo</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <Label htmlFor='item_name'>Nombre del artículo</Label>
        <Input
          id='item_name'
          name='item_name'
          value={itemName}
          onChange={handleChange}
        />
        <Label htmlFor='description'>Descripción</Label>
        <Input
          name='description'
          value={loan.description}
          onChange={handleChange}
        />
        <Label htmlFor='quantity'>Cantidad</Label>
        <Input name='quantity' value={loan.quantity} onChange={handleChange} />
        <Label htmlFor='borrowed_at'>Prestado en</Label>
        <Input
          type='date'
          name='borrowed_at'
          value={loan.borrowed_at}
          onChange={handleChange}
        />
        <Label htmlFor='return_by'>Devolver antes</Label>
        <Input
          type='date'
          name='return_by'
          value={loan.return_by}
          onChange={handleChange}
        />
        <Label htmlFor='state_start'>Estado Inicial</Label>
        <Input
          name='state_start'
          value={loan.state_start}
          onChange={handleChange}
        />
        <Label htmlFor='state_end'>Estado Final</Label>
        <Select onValueChange={(value) => setLoan({ ...loan, state_end: value })}>
          <SelectTrigger>
            <SelectValue placeholder='Selecciona un estado' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="devuelto">Devuelto</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
            <SelectItem value="dañado">Dañado</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor='recipient_name'>Nombre del receptor</Label>
        <Input
          name='recipient_name'
          value={recipientName}
          onChange={handleChange}
        />
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </form>
    </div>
  );
};

export default EditLoan;
