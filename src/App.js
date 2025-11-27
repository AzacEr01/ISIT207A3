import React, { useState } from 'react';
import { Home, Heart, PawPrint, UserPlus, FileText, Mail } from 'lucide-react';
import './App.css';

// Main App Component
export default function PetHeavenApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pets] = useState([
    { id: 1, name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: 3, image: '🐕', description: 'Friendly and energetic' },
    { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Persian', age: 2, image: '🐱', description: 'Calm and affectionate' },
    { id: 3, name: 'Max', type: 'Dog', breed: 'Labrador', age: 5, image: '🐕', description: 'Great with kids' },
    { id: 4, name: 'Luna', type: 'Cat', breed: 'Siamese', age: 1, image: '🐱', description: 'Playful and curious' },
    { id: 5, name: 'Charlie', type: 'Dog', breed: 'Beagle', age: 4, image: '🐕', description: 'Loves to play fetch' },
    { id: 6, name: 'Mittens', type: 'Cat', breed: 'Tabby', age: 3, image: '🐱', description: 'Independent and sweet' }
  ]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'pets':
        return <PetsPage pets={pets} setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage />;
      case 'release':
        return <ReleasePetPage />;
      case 'adopt':
        return <AdoptPetPage pets={pets} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}

// Navigation Component
function Navigation({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pets', label: 'Available Pets', icon: PawPrint },
    { id: 'register', label: 'Register', icon: UserPlus },
    { id: 'release', label: 'Release a Pet', icon: FileText },
    { id: 'adopt', label: 'Adopt a Pet', icon: Heart },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button 
          onClick={() => setCurrentPage('home')}
          className="logo-button"
        >
          <Heart color="#ec4899" size={32} />
          <h1 className="logo-text">Pet Heaven</h1>
        </button>
        <div className="nav-menu">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-button ${currentPage === item.id ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span className="nav-button-text">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// Home Page Component
function HomePage({ setCurrentPage }) {
  const [heroImages] = useState([
    'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=400&fit=crop'
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div>
      <div className="hero-section">
        <div 
          className="hero-background"
          style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h2 className="hero-title">Welcome to Pet Heaven</h2>
          <p className="hero-description">
            A charitable society dedicated to caring for abandoned pets and finding them loving forever homes
          </p>
        </div>
      </div>

      <div className="info-cards">
        <InfoCard
          icon={<Heart color="#ec4899" size={48} />}
          title="Our Mission"
          description="We provide shelter, care, and love to abandoned cats and dogs while working to find them perfect families."
        />
        <InfoCard
          icon={<PawPrint color="#a855f7" size={48} />}
          title="Our Facilities"
          description="Modern, clean facilities with veterinary care, comfortable housing, and play areas for all our pets."
        />
        <InfoCard
          icon={<UserPlus color="#3b82f6" size={48} />}
          title="Get Involved"
          description="Become a member, adopt a pet, or help us care for animals in need. Every contribution matters."
        />
      </div>

      <div className="cta-section">
        <button
          onClick={() => setCurrentPage('pets')}
          className="cta-button"
        >
          View Available Pets
        </button>
      </div>
    </div>
  );
}

// Info Card Component (Reusable)
function InfoCard({ icon, title, description }) {
  return (
    <div className="info-card">
      <div className="info-card-icon">{icon}</div>
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-description">{description}</p>
    </div>
  );
}

// Pets Page Component
function PetsPage({ pets, setCurrentPage }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPets = pets.filter(pet => {
    const matchesFilter = filter === 'all' || pet.type.toLowerCase() === filter;
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <h2 className="page-title">Available Pets for Adoption</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, breed, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <FilterButton label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
        <FilterButton label="Dogs" active={filter === 'dog'} onClick={() => setFilter('dog')} />
        <FilterButton label="Cats" active={filter === 'cat'} onClick={() => setFilter('cat')} />
      </div>

      {filteredPets.length === 0 ? (
        <p className="no-results">No pets found matching your search criteria.</p>
      ) : (
        <div className="pets-grid">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} setCurrentPage={setCurrentPage} />
          ))}
        </div>
      )}
    </div>
  );
}

// Filter Button Component (Reusable)
function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`filter-button ${active ? 'active' : ''}`}
    >
      {label}
    </button>
  );
}

// Pet Card Component (Reusable)
function PetCard({ pet, setCurrentPage }) {
  return (
    <div className="pet-card">
      <div className="pet-card-image">
        {pet.image}
      </div>
      <div className="pet-card-content">
        <h3 className="pet-card-name">{pet.name}</h3>
        <p className="pet-card-info"><strong>Type:</strong> {pet.type}</p>
        <p className="pet-card-info"><strong>Breed:</strong> {pet.breed}</p>
        <p className="pet-card-info"><strong>Age:</strong> {pet.age} years</p>
        <p className="pet-card-description">{pet.description}</p>
        <button
          onClick={() => setCurrentPage('adopt')}
          className="adopt-button"
        >
          Adopt Me
        </button>
      </div>
    </div>
  );
}

// Register Page Component
function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{8,}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Phone number must be at least 8 digits';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    alert('Thank you for registering! Our team will contact you soon.');
    setFormData({ name: '', email: '', phone: '', address: '' });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Register as a Member</h2>
      <div className="form-card">
        <div>
          <FormInput
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
          <FormInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
          />
          <FormInput
            label="Address"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            error={errors.address}
          />
          <button onClick={handleSubmit} className="submit-button">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

// Release Pet Page Component
function ReleasePetPage() {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    petName: '',
    petType: 'dog',
    breed: '',
    age: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{8,}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Phone number must be at least 8 digits';
    }
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!formData.breed.trim()) newErrors.breed = 'Breed is required';
    if (!formData.age || formData.age <= 0) newErrors.age = 'Valid age is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    alert('Thank you for your submission. Our team will contact you to arrange the pet handover.');
    setFormData({ ownerName: '', email: '', phone: '', petName: '', petType: 'dog', breed: '', age: '', reason: '' });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Release a Pet</h2>
      <div className="form-card">
        <div>
          <FormInput
            label="Your Name"
            type="text"
            value={formData.ownerName}
            onChange={(e) => handleChange('ownerName', e.target.value)}
            error={errors.ownerName}
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
          <FormInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
          />
          <FormInput
            label="Pet Name"
            type="text"
            value={formData.petName}
            onChange={(e) => handleChange('petName', e.target.value)}
            error={errors.petName}
          />
          <div className="form-group">
            <label className="form-label">Pet Type</label>
            <select
              value={formData.petType}
              onChange={(e) => handleChange('petType', e.target.value)}
              className="form-select"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          <FormInput
            label="Breed"
            type="text"
            value={formData.breed}
            onChange={(e) => handleChange('breed', e.target.value)}
            error={errors.breed}
          />
          <FormInput
            label="Age (years)"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            error={errors.age}
          />
          <div className="form-group">
            <label className="form-label">Reason for Release</label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              className={`form-textarea ${errors.reason ? 'error' : ''}`}
              rows="4"
            />
            {errors.reason && <span className="error-message">{errors.reason}</span>}
          </div>
          <button onClick={handleSubmit} className="submit-button">
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

// Adopt Pet Page Component
function AdoptPetPage({ pets }) {
  const [formData, setFormData] = useState({
    adopterName: '',
    email: '',
    phone: '',
    address: '',
    petId: '',
    experience: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.adopterName.trim()) newErrors.adopterName = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{8,}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Phone number must be at least 8 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.petId) newErrors.petId = 'Please select a pet';
    if (!formData.experience.trim()) newErrors.experience = 'Please describe your experience';
    if (!formData.reason.trim()) newErrors.reason = 'Please tell us why you want to adopt';
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const selectedPet = pets.find(p => p.id === parseInt(formData.petId));
    alert(`Thank you for your adoption request for ${selectedPet?.name || 'a pet'}! Our team will contact you for an interview.`);
    setFormData({ adopterName: '', email: '', phone: '', address: '', petId: '', experience: '', reason: '' });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Adopt a Pet</h2>
      <div className="form-card">
        <div>
          <FormInput
            label="Your Name"
            type="text"
            value={formData.adopterName}
            onChange={(e) => handleChange('adopterName', e.target.value)}
            error={errors.adopterName}
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
          <FormInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
          />
          <FormInput
            label="Address"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            error={errors.address}
          />
          <div className="form-group">
            <label className="form-label">Select Pet</label>
            <select
              value={formData.petId}
              onChange={(e) => handleChange('petId', e.target.value)}
              className={`form-select ${errors.petId ? 'error' : ''}`}
            >
              <option value="">Choose a pet...</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} - {pet.breed} ({pet.type})
                </option>
              ))}
            </select>
            {errors.petId && <span className="error-message">{errors.petId}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Pet Ownership Experience</label>
            <textarea
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className={`form-textarea ${errors.experience ? 'error' : ''}`}
              rows="3"
            />
            {errors.experience && <span className="error-message">{errors.experience}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Why do you want to adopt?</label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              className={`form-textarea ${errors.reason ? 'error' : ''}`}
              rows="3"
            />
            {errors.reason && <span className="error-message">{errors.reason}</span>}
          </div>
          <button onClick={handleSubmit} className="submit-button">
            Submit Adoption Request
          </button>
        </div>
      </div>
    </div>
  );
}

// Form Input Component (Reusable)
function FormInput({ label, type, value, onChange, error }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    alert('Thank you for contacting us! We will respond to your inquiry within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Contact Us</h2>
      <div className="contact-info">
        <p className="contact-description">
          Have questions or need assistance? We're here to help! Fill out the form below or reach us directly.
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <Mail color="#ec4899" size={20} />
            <span>contact@petheaven.org</span>
          </div>
          <div className="contact-item">
            <span>📞 +65 9230 2250</span>
          </div>
          <div className="contact-item">
            <span>📍 851 Hougang Central, Block 851, Singapore 530851</span>
          </div>
        </div>
      </div>
      
      <div className="form-card">
        <div>
          <FormInput
            label="Your Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
          <FormInput
            label="Subject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            error={errors.subject}
          />
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              rows="5"
              placeholder="Tell us how we can help you..."
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          <button onClick={handleSubmit} className="submit-button">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Heart color="#ec4899" size={24} />
          <h3 className="footer-title">Pet Heaven</h3>
        </div>
        <p className="footer-description">Caring for abandoned pets, finding forever homes</p>
        <div className="footer-contact">
          <Mail size={16} />
          <span>contact@petheaven.org</span>
        </div>
        <p className="footer-copyright">© 2025 Pet Heaven. All rights reserved.</p>
      </div>
    </footer>
  );
}