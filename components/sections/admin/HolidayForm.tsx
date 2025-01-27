'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, X, ArrowLeft, ImagePlus } from 'lucide-react';
import { Holiday } from '@/data/holidays';

interface HolidayFormProps {
  initialData?: Holiday;
}

export default function HolidayForm({ initialData }: HolidayFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Holiday>>(
    initialData || {
      name: '',
      tagline: '',
      price: 0,
      duration: '',
      groupSize: '',
      location: '',
      description: '',
      highlights: [''],
      itinerary: [
        {
          day: 1,
          title: '',
          activities: ['']
        }
      ]
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would make an API call
    console.log('Form submitted:', formData);
    router.push('/admin/holidays');
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), '']
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== index)
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights?.map((h, i) => i === index ? value : h)
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...(prev.itinerary || []),
        {
          day: (prev.itinerary?.length || 0) + 1,
          title: '',
          activities: ['']
        }
      ]
    }));
  };

  const addActivity = (dayIndex: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary?.map((day, i) => 
        i === dayIndex 
          ? { ...day, activities: [...day.activities, ''] }
          : day
      )
    }));
  };

  const updateActivity = (dayIndex: number, activityIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary?.map((day, i) => 
        i === dayIndex 
          ? {
              ...day,
              activities: day.activities.map((act, j) => 
                j === activityIndex ? value : act
              )
            }
          : day
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {initialData ? 'Edit Holiday' : 'Create New Holiday'}
            </h1>
            <p className="text-gray-600 mt-1">
              {initialData ? 'Update the holiday package details' : 'Add a new holiday package'}
            </p>
          </div>
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? 'Save Changes' : 'Create Holiday'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Holiday Name
              </label>
              <Input
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Santorini Paradise Escape"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <Input
                required
                value={formData.tagline}
                onChange={e => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                placeholder="e.g. Experience the Magic of the Mediterranean"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <Input
                required
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Santorini, Greece"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <Input
                required
                type="number"
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                placeholder="e.g. 1299"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <Input
                required
                value={formData.duration}
                onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g. 7 Days"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Size
              </label>
              <Input
                required
                value={formData.groupSize}
                onChange={e => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                placeholder="e.g. 8-12"
              />
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <Textarea
            required
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the holiday experience..."
            className="min-h-[150px]"
          />
        </Card>

        {/* Images */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Button type="button" variant="outline" className="w-full">
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Upload Main Image
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Button type="button" variant="outline" className="w-full">
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Upload Gallery Images
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Highlights */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Highlights</h2>
            <Button type="button" onClick={addHighlight} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>
          <div className="space-y-3">
            {formData.highlights?.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  required
                  value={highlight}
                  onChange={e => updateHighlight(index, e.target.value)}
                  placeholder="e.g. Sunset viewing at Oia"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeHighlight(index)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Itinerary */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Itinerary</h2>
            <Button type="button" onClick={addItineraryDay} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Day
            </Button>
          </div>
          <div className="space-y-6">
            {formData.itinerary?.map((day, dayIndex) => (
              <div key={dayIndex} className="border rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day {day.day}
                    </label>
                    <Input
                      required
                      value={day.title}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        itinerary: prev.itinerary?.map((d, i) => 
                          i === dayIndex ? { ...d, title: e.target.value } : d
                        )
                      }))}
                      placeholder="e.g. Arrival & Welcome"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex gap-2">
                      <Input
                        required
                        value={activity}
                        onChange={e => updateActivity(dayIndex, actIndex, e.target.value)}
                        placeholder="e.g. Airport transfer"
                      />
                      {actIndex === day.activities.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addActivity(dayIndex)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </form>
  );
} 