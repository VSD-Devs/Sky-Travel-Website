import { Metadata } from 'next';
import HolidayForm from '@/components/sections/admin/HolidayForm';
import { holidaysData } from '@/data/holidays';

export const metadata: Metadata = {
  title: 'Admin | Edit Holiday',
  description: 'Edit holiday package details',
};

export default function EditHolidayPage({ params }: { params: { id: string } }) {
  const holiday = holidaysData[params.id];

  if (!holiday) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Holiday Not Found</h1>
          <p className="text-gray-600 mt-2">The holiday you're trying to edit doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HolidayForm initialData={holiday} />
    </div>
  );
} 