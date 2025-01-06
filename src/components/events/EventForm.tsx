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
import { Switch } from '@/components/ui/switch';
import TicketTierForm, { TicketTier } from './TicketTierForm';

interface EventFormProps {
  initialData?: EventData;
  onSubmit?: (eventData: Omit<EventData, "id">) => Promise<void>;
}

const EventForm = ({ initialData, onSubmit }: EventFormProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [useMultipleTiers, setUseMultipleTiers] = useState(false);
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>(initialData?.ticketTiers || []);
  const [singleTicketPrice, setSingleTicketPrice] = useState('0');
  const [availableTickets, setAvailableTickets] = useState('0');
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    date: initialData?.date || '',
    location: initialData?.location || '',
    organizerRemarks: initialData?.organizerRemarks || '',
    additionalInfo: initialData?.additionalInfo || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = images.map(img => URL.createObjectURL(img));
      const videoUrls = videos.map(vid => URL.createObjectURL(vid));

      let finalTicketTiers: TicketTier[];
      
      if (!useMultipleTiers) {
        finalTicketTiers = [{
          name: 'Standard Ticket',
          description: 'Standard entry ticket',
          price: parseFloat(singleTicketPrice),
          availableTickets: parseInt(availableTickets),
          benefits: [],
          isHighlighted: false
        }];
      } else {
        finalTicketTiers = ticketTiers;
      }

      const eventData: Omit<EventData, 'id'> = {
        ...formData,
        ticketTiers: finalTicketTiers,
        images: imageUrls,
        videos: videoUrls,
        organizerId: currentUser?.uid || '',
        createdAt: new Date().toISOString(),
      };

      if (onSubmit) {
        await onSubmit(eventData);
      } else {
        await createEvent(eventData);
        navigate('/events');
      }
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-4">
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
              <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {["Music", "Sports", "Theater", "Comedy", "Arts", "Food & Drink", "Business", "Technology"].map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-neutral-100">
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
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={useMultipleTiers}
              onCheckedChange={setUseMultipleTiers}
            />
            <label className="text-sm font-medium">
              Use multiple ticket tiers
            </label>
          </div>

          {!useMultipleTiers ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={singleTicketPrice}
                  onChange={(e) => setSingleTicketPrice(e.target.value)}
                  placeholder="Enter ticket price (0 for free events)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Available Tickets</label>
                <Input
                  type="number"
                  min="1"
                  value={availableTickets}
                  onChange={(e) => setAvailableTickets(e.target.value)}
                  placeholder="Enter number of available tickets"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Ticket Tiers</h2>
              <TicketTierForm
                ticketTiers={ticketTiers}
                setTicketTiers={setTicketTiers}
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Images (Max 5)</label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setImages(prev => [...prev, ...files].slice(0, 5));
                }}
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
                      onClick={() => {
                        setImages(prev => prev.filter((_, i) => i !== index));
                      }}
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
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setVideos(prev => [...prev, ...files].slice(0, 2));
                }}
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
                      onClick={() => {
                        setVideos(prev => prev.filter((_, i) => i !== index));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <div className="space-y-4">
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
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Event..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;