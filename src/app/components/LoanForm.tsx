'use client';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCapitalize } from '@/hooks/useCapitalize';

const LoanForm = () => {
  const { value: title, setCapitalizedValue: setTitle } = useCapitalize('');
  const { value: description, setCapitalizedValue: setDescription } = useCapitalize('');
  const { value: recipientName, setCapitalizedValue: setRecipientName } = useCapitalize('');
  const { value: stateStart, setCapitalizedValue: setStateStart } = useCapitalize('');
  const { value: stateEnd, setCapitalizedValue: setStateEnd } = useCapitalize('');
  const [quantity, setQuantity] = useState('');
  const [borrowed_at, setBorrowedAt] = useState('');
  const [return_by, setReturnBy] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/loan', {
        method: 'POST',
        body: JSON.stringify({
          item_name: title,
          description,
          quantity: parseInt(quantity, 10),
          borrowed_at: borrowed_at ? `${borrowed_at}T00:00:00.000Z` : null,
          return_by: return_by ? `${return_by}T00:00:00.000Z` : null,
          state_start: stateStart,
          state_end: stateEnd,
          recipient_name: recipientName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al crear el préstamo');
      }

      const data = await response.json();
      console.log(data);
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el préstamo');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 pt-4'>
        <Input
          type='text'
          name='item_name'
          placeholder='Nombre del artículo'
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type='text'
          name='description'
          placeholder='Descripción'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type='number'
          name='quantity'
          placeholder='Cantidad'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <Input
          type='date'
          name='borrowed_at'
          placeholder='Fecha de préstamo'
          value={borrowed_at}
          onChange={(e) => setBorrowedAt(e.target.value)}
          required
        />
        <Input
          type='date'
          name='return_by'
          placeholder='Fecha de devolución'
          value={return_by}
          onChange={(e) => setReturnBy(e.target.value)}
         
        />

        <Input
          type='text'
          name='recipient_name'
          placeholder='Nombre del destinatario'
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
        />
        <Input
          type='text'
          name='state_start'
          placeholder='Estado inicial'
          value={stateStart}
          onChange={(e) => setStateStart(e.target.value)}
          required
        />
        <Input
          type='text'
          name='state_end'
          placeholder='Estado final'
          value={stateEnd}
          onChange={(e) => setStateEnd(e.target.value)}
        />

        <Button type='submit' disabled={isSubmitting} >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </div>
  );
};

export default LoanForm;
