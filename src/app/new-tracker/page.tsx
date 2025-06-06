import React from 'react';
import { prisma } from '@/lib/prisma';

const NewTracker = async () => {
  const loans = await prisma.loan.findMany();

  console.log(loans);
  return <div>{loans.length}</div>;
};

export default NewTracker;
