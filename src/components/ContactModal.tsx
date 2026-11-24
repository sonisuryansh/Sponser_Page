import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteConfig } from '../config/content.config';
import { X, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    role: 'Principal',
    email: '',
    phone: '',
    message: '',
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-xl bg-[#ffffff] text-[#111111] border border-black/10 rounded-[2px] p-5 sm:p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#5b5b5b] hover:text-[#111111] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 border border-[#111111] flex items-center justify-center rounded-[2px]">
              <Check className="w-6 h-6 text-[#111111]" />
            </div>
            <h3 className="font-serif text-2xl font-medium tracking-tight mb-2">
              Consultation Requested
            </h3>
            <p className="text-sm text-[#5b5b5b] max-w-md mx-auto mb-6 leading-relaxed">
              Thank you for connecting with {siteConfig.brandName}. Our academic partnerships coordinator will review your school&apos;s requirements and reach out within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="relative inline-flex items-center text-xs uppercase tracking-[0.18em] pb-1 border-b border-black text-[#111111] hover:text-[#c8a45d] hover:border-[#c8a45d] transition-colors cursor-pointer"
            >
              Return to Presentation
            </button>
          </div>
        ) : (
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#c8a45d] mb-1 text-center font-medium">
              Academic Partnership
            </div>
            <h2
              id="contact-modal-title"
              className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-[#111111] mb-2 text-center"
            >
              Schedule a School Consultation
            </h2>
            <p className="text-sm text-[#5b5b5b] mb-6 leading-relaxed text-center max-w-lg mx-auto">
              Explore how {siteConfig.brandName} aligns with your institution&apos;s curriculum, infrastructure, and learning goals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5b5b5b] mb-1">
                  Institution / School Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="e.g. Modern Public Academy"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 focus:border-black rounded-[2px] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5b5b5b] mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 focus:border-black rounded-[2px] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5b5b5b] mb-1">
                    Designation
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 focus:border-black rounded-[2px] outline-none transition-colors cursor-pointer"
                  >
                    <option value="Principal">Principal</option>
                    <option value="Trustee">Trustee / Management</option>
                    <option value="Academic Director">Academic Director</option>
                    <option value="STEM Coordinator">STEM / Tech Coordinator</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5b5b5b] mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="principal@school.edu.in"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 focus:border-black rounded-[2px] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5b5b5b] mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 focus:border-black rounded-[2px] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5b5b5b] mb-1">
                  Specific Learning Goals or Questions
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your student strength, existing lab space, or target grades..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 focus:border-black rounded-[2px] outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#5b5b5b]">
                  {siteConfig.confirm.contactEmail}
                </span>

                <button
                  type="submit"
                  className="relative px-5 py-2.5 border border-black text-[#111111] hover:bg-black hover:text-white text-xs uppercase tracking-[0.18em] transition-colors rounded-[2px] cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
