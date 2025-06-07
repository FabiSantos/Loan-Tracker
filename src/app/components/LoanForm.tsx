'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const LoanForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [borrowed_at, setBorrowedAt] = useState('');
  const [return_by, setReturnBy] = useState('');
  const [state_start, setStateStart] = useState('');
  const [state_end, setStateEnd] = useState('');
  const [recipient_name, setRecipientName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /*    if (
      !title ||
      !description ||
      !quantity ||
      !borrowed_at ||
      !return_by ||
      !state_start ||
      !state_end ||
      !recipient_name
    ) {
      alert('Por favor completa todos los campos.');
      return;
    }
 */
    const response = await fetch('/api/loan', {
      method: 'POST',
      body: JSON.stringify({
        item_name: title,
        description,
        quantity: parseInt(quantity, 10),
        borrowed_at: new Date(borrowed_at).toISOString(),
        return_by: new Date(return_by).toISOString(),
        state_start,
        state_end,
        recipient_name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    console.log(
      title,
      description,
      Number(quantity),
      borrowed_at,
      return_by,
      state_start,
      state_end,
      recipient_name
    );
    router.refresh();
    setTitle('');
    setDescription('');
    setQuantity('');
    setBorrowedAt('');
    setReturnBy('');
    setRecipientName('');
    setStateStart('');
  };
  return (
    <div>
      <h1>Formulario de Préstamo</h1>
      <form onSubmit={handleSubmit}>
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
          required
        />

        <Input
          type='text'
          name='recipient_name'
          placeholder='Nombre del destinatario'
          value={recipient_name}
          onChange={(e) => setRecipientName(e.target.value)}
          required
        />
        <Input
          type='text'
          name='state_start'
          placeholder='Estado inicial'
          value={state_start}
          onChange={(e) => setStateStart(e.target.value)}
          required
        />
        <Input
          type='text'
          name='state_end'
          placeholder='Estado final'
          value={state_end}
          onChange={(e) => setStateEnd(e.target.value)}
          required
        />

        <Button type='submit'>Enviar</Button>
      </form>
    </div>
  );
};

export default LoanForm;
