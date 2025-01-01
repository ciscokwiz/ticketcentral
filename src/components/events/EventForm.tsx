import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createEvent, EventData } from '@/services/eventService';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventFormProps {
  initialData?: EventData;
}

const EventForm = ({ initialData }: EventFormProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    date: initialData?.date || '',
    location: initialData?.location || '',
    price: initialData?.price?.toString() || '',
    availableTickets: initialData?.availableTickets?.toString() || '',
    organizerRemarks: initialData?.organizerRemarks || '',
    additionalInfo: initialData?.additionalInfo || ''
  });

  const categories = [
    "Music", "Sports", "Theater", "Comedy", "Arts", 
    "Food & Drink", "Business", "Technology"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5)); // Limit to 5 images
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setVideos(prev => [...prev, ...files].slice(0, 2)); // Limit to 2 videos
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = images.map(img => URL.createObjectURL(img));
      const videoUrls = videos.map(vid => URL.createObjectURL(vid));

      const eventData: Omit<EventData, 'id'> = {
        ...formData,
        price: parseFloat(formData.price),
        availableTickets: parseInt(formData.availableTickets),
        images: imageUrls,
        videos: videoUrls,
        organizerId: currentUser?.uid || '',
        createdAt: new Date().toISOString(),
      };

      await createEvent(eventData);
      navigate('/events');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create event. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">Event Title</label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="organizerRemarks" className="block text-sm font-medium mb-2">Organizer's Remarks</label>
        <Textarea
          id="organizerRemarks"
          name="organizerRemarks"
          value={formData.organizerRemarks}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">Additional Information</label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Images (Max 5)</label>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={images.length >= 5}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Images
        </Button>
        <div className="mt-2 flex flex-wrap gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt={`Upload ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Videos (Max 2)</label>
        <input
          type="file"
          ref={videoInputRef}
          accept="video/*"
          multiple
          className="hidden"
          onChange={handleVideoUpload}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => videoInputRef.current?.click()}
          disabled={videos.length >= 2}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Videos
        </Button>
        <div className="mt-2 flex flex-wrap gap-2">
          {videos.map((video, index) => (
            <div key={index} className="relative">
              <video
                src={URL.createObjectURL(video)}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
        <Input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-2">Price ($)</label>
        <Input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="availableTickets" className="block text-sm font-medium mb-2">Available Tickets</label>
        <Input
          type="number"
          id="availableTickets"
          name="availableTickets"
          min="1"
          value={formData.availableTickets}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Event..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;