import LoanForm from '../components/LoanForm';

const NewTracker = async () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Nuevo Préstamo</h1>
      <LoanForm />
    </div>
  );
};

export default NewTracker;
