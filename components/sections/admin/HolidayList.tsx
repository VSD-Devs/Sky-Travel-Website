'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { holidaysData } from '@/data/holidays';

export default function HolidayList() {
  const [holidays, setHolidays] = useState(Object.values(holidaysData));

  const handleDelete = (id: string) => {
    // In real app, this would make an API call
    setHolidays(holidays.filter(holiday => holiday.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Holidays</h1>
          <p className="text-gray-600 mt-1">Create and manage your holiday packages</p>
        </div>
        <Link href="/admin/holidays/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Holiday
          </Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={holiday.mainImage}
                        alt={holiday.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold">{holiday.name}</p>
                        <p className="text-sm text-gray-500">{holiday.tagline}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{holiday.location}</TableCell>
                  <TableCell>{holiday.duration}</TableCell>
                  <TableCell>£{holiday.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{holiday.rating}</span>
                      <span className="text-gray-400">({holiday.reviewCount})</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/holidays/${holiday.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/holidays/${holiday.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(holiday.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 